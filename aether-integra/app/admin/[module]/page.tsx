import { db } from "@/core/db";
import { moduleTables } from "@/core/registry/db";
import { activeModules } from "@/core/registry";
import { defaultLanguage, languages, adminActiveLanguage } from "@/core/registry/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { or, ilike, sql, and, eq, gte, lte, inArray } from "drizzle-orm";
import { cookies } from "next/headers";
import FilterToolbar from "./FilterToolbar";
import DeleteButton from "./DeleteButton";
import { resolveLookups } from "@/core/registry/lookups";

import DataTableCell from "./_components/DataTableCell";

const PAGE_SIZE = 25;

function escapeLikePattern(input: string): string {
  return input.replace(/[%_\\]/g, "\\$&");
}

export default async function DynamicModulePage({
  params,
  searchParams,
}: {
  params: Promise<{ module: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const moduleId = resolvedParams.module;

  const activeModule = activeModules.find((m) => m.id === moduleId);
  const targetTable = moduleTables[moduleId];

  if (!activeModule || !targetTable) return notFound();

  const validLangCodes = languages.map((l) => l.code);
  const activeLang = validLangCodes.includes(resolvedSearchParams.lang || "")
    ? resolvedSearchParams.lang!
    : adminActiveLanguage;

  const searchQuery = resolvedSearchParams.q || "";
  const page = Math.max(1, parseInt(resolvedSearchParams.page || "1", 10));

  const cookieStore = await cookies();
  const savedColsCookie = cookieStore.get(`prefs_cols_${moduleId}`);

  let visibleColumnNames: string[];
  if (savedColsCookie) {
    try {
      visibleColumnNames = JSON.parse(savedColsCookie.value);
    } catch {
      visibleColumnNames = activeModule.schema.filter(c => c.showInList).map(c => c.name);
    }
  } else {
    visibleColumnNames = activeModule.schema.filter(c => c.showInList).map(c => c.name);
  }

  const tableColumns = activeModule.schema.filter(c => visibleColumnNames.includes(c.name));
  const filters: any[] = [];

  Object.entries(resolvedSearchParams).forEach(([key, val]) => {
    if (key.startsWith("f_") && val) {
      const fieldName = key.replace("f_", "");
      const schemaCol = activeModule.schema.find((c) => c.name === fieldName && c.filterConfig?.enabled);
      if (!schemaCol) return;

      const column = targetTable[fieldName];
      const valStr = val as string;
      const firstColonIndex = valStr.indexOf(":");

      if (!column || firstColonIndex === -1) return;

      const operator = valStr.substring(0, firstColonIndex);
      const value = valStr.substring(firstColonIndex + 1);

      switch (operator) {
        case "eq": filters.push(eq(column, value)); break;
        case "gt": filters.push(gte(column, value)); break;
        case "lt": filters.push(lte(column, value)); break;
        case "like":
          const safeValue = escapeLikePattern(value);
          filters.push(ilike(sql`CAST(${column} AS TEXT)`, `%${safeValue}%`));
          break;
        case "in":
          const inValues = value.split(",");
          if (inValues.length > 0) filters.push(inArray(column, inValues));
          break;
        case "btw":
          const [start, end] = value.split(",");
          const dateFilters = [];
          if (start && start.trim() !== "") {
            const startDate = new Date(start);
            startDate.setHours(0, 0, 0, 0);
            dateFilters.push(gte(column, startDate));
          }
          if (end && end.trim() !== "") {
            const endDate = new Date(end);
            endDate.setHours(23, 59, 59, 999);
            dateFilters.push(lte(column, endDate));
          }
          if (dateFilters.length > 0) filters.push(and(...dateFilters));
          break;
      }
    }
  });

  if (searchQuery) {
    const safeQuery = escapeLikePattern(searchQuery);
    const searchConditions = [];

    for (const col of activeModule.schema) {
      if (visibleColumnNames.includes(col.name)) {
        const isTranslatable = "translatable" in col && col.translatable;

        if (isTranslatable) {
          searchConditions.push(
            ilike(
              sql`CAST(${targetTable[col.name]} AS JSONB)->>CAST(${activeLang} AS TEXT)`,
              `%${safeQuery}%`
            )
          );
        } else if (col.type === "text" || col.type === "textarea" || col.type === "richtext") {
          searchConditions.push(
            ilike(sql`CAST(${targetTable[col.name]} AS TEXT)`, `%${safeQuery}%`)
          );
        }
      }
    }

    if (searchConditions.length > 0) {
      filters.push(or(...searchConditions));
    }
  }

  const filterRecord: Record<string, string> = {};
  Object.entries(resolvedSearchParams).forEach(([key, val]) => {
    if (key.startsWith("f_") && val) {
      const fieldName = key.replace("f_", "");
      const valStr = val as string;
      const firstColonIndex = valStr.indexOf(":");
      if (firstColonIndex !== -1 && valStr.substring(0, firstColonIndex) === "eq") {
        filterRecord[fieldName] = valStr.substring(firstColonIndex + 1);
      }
    }
  });

  const filterLookups = await resolveLookups(activeModule.schema, filterRecord);
  const finalWhere = filters.length > 0 ? and(...filters) : undefined;

  const [{ count: totalCount }] = await db.select({ count: sql<number>`count(*)` }).from(targetTable).where(finalWhere);
  const totalPages = Math.max(1, Math.ceil(Number(totalCount) / PAGE_SIZE));

  const data = await db.select().from(targetTable).where(finalWhere).limit(PAGE_SIZE).offset((page - 1) * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1>{activeModule.name}</h1>
        <p>{activeModule.description}</p>
        <Link href={`/admin/${moduleId}/new`}>+ Yeni Ekle</Link>
      </div>

      <hr />

      <FilterToolbar
        moduleId={moduleId}
        languages={languages}
        schema={activeModule.schema}
        initialCols={visibleColumnNames}
        filterLookups={filterLookups}
      />

      <p>Toplam {String(totalCount)} kayıt — Sayfa {page} / {totalPages}</p>

      <table className="border border-black w-full text-left">
        <thead>
          <tr>
            {tableColumns.map((col) => (
              <th key={col.name} className="border border-black p-2">{col.label}</th>
            ))}
            <th className="border border-black p-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={tableColumns.length + 1} className="border border-black p-4 text-center">
                Kayıt bulunamadı.
              </td>
            </tr>
          ) : (
            data.map((row: any) => (
              <tr key={row.id}>
                {tableColumns.map((col) => {

                  let resolvedValue = row[col.name];

                  if (col.type === "relation_1_n" && filterLookups[col.name]) {
                    const targetKey = col.relationConfig!.targetKey;
                    const displayKey = col.relationConfig!.displayKey;
                    const matched = filterLookups[col.name].find((opt: any) => opt[targetKey] === resolvedValue);

                    if (matched) {
                      const displayRaw = matched[displayKey];
                      if (typeof displayRaw === "object" && displayRaw !== null) {
                        resolvedValue = displayRaw[activeLang] || displayRaw[adminActiveLanguage] || displayRaw[defaultLanguage] || Object.values(displayRaw)[0];
                      } else {
                        resolvedValue = displayRaw;
                      }
                    }
                  }

                  return (
                    <td key={col.name} className="border border-black p-2">
                      <DataTableCell col={col} value={resolvedValue} />
                    </td>
                  );
                })}
                <td className="border border-black p-2 flex gap-2">
                  <Link href={`/admin/${moduleId}/${row.id}`}>👁️</Link>
                  <Link href={`/admin/${moduleId}/${row.id}/edit`}>✏️</Link>
                  <DeleteButton moduleId={moduleId} id={row.id} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        {page > 1 && <Link href={`/admin/${moduleId}?page=${page - 1}`}>← Önceki</Link>}
        <span>Sayfa {page} / {totalPages}</span>
        {page < totalPages && <Link href={`/admin/${moduleId}?page=${page + 1}`}>Sonraki →</Link>}
      </div>
    </div>
  );
}