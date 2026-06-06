"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { saveColumnPreferences } from "@/core/registry/actions";
import AsyncSelect from "./_components/AsyncSelect";
import type { FieldConfig } from "@/core/registry/types";

interface FilterToolbarProps {
  moduleId: string;
  languages: any[];
  schema: FieldConfig[];
  initialCols: string[];
  filterLookups: Record<string, any[]>;
}

export default function FilterToolbar({
  moduleId,
  languages,
  schema,
  initialCols,
  filterLookups,
}: FilterToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const updateURL = useCallback((paramsToUpdate: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.delete("page");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }, [searchParams, pathname, router]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== (searchParams.get("q") || "")) {
        updateURL({ q: searchTerm });
      }
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchParams, updateURL]);

  const handleDateRange = (fieldName: string, value: string, type: 'start' | 'end') => {
    const currentVal = searchParams.get(`f_${fieldName}`) || "btw:,";
    const [, dates] = currentVal.split(":");
    let [start, end] = (dates || ",").split(",");

    if (type === 'start') start = value;
    if (type === 'end') end = value;

    updateURL({ [`f_${fieldName}`]: `btw:${start},${end}` });
  };

  return (
    <div style={{
      background: "#f9f9f9",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "20px",
      border: "1px solid #eee",
      position: "relative",
      opacity: isPending ? 0.7 : 1,
      transition: "opacity 0.2s"
    }}>

      {isPending && (
        <div style={{ position: "absolute", top: "10px", right: "20px", fontSize: "12px", color: "#007bff", fontWeight: "bold" }}>
          Loading...
        </div>
      )}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-end" }}>

        <div style={{ flex: "2", minWidth: "250px" }}>
          <label style={{ fontSize: "12px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "5px" }}>
            🔍 METİN ARAMA (Açık Kolonlarda)
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ara..."
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
          />
        </div>

        {schema.filter(c => c.filterConfig?.enabled).map(col => {
          const config = col.filterConfig!;
          const paramKey = `f_${col.name}`;
          const currentParam = searchParams.get(paramKey) || "";


          if (config.operator === "eq" && config.source && col.relationConfig) {
            const options = filterLookups[col.name] || [];
            const currentValue = currentParam.split(":")[1] || "";
            return (
              <div key={col.name} style={{ flex: "1", minWidth: "200px" }}>
                <label style={{ fontSize: "12px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "5px" }}>
                  👤 {col.label}
                </label>

                <AsyncSelect
                  targetTable={col.relationConfig.targetTable}
                  targetKey={col.relationConfig.targetKey}
                  displayKey={col.relationConfig.displayKey}
                  initialOptions={options}
                  defaultValue={currentValue}
                  placeholder="Tümü"
                  onChange={(val) => updateURL({ [paramKey]: val ? `eq:${val}` : null })}
                />

              </div>
            );
          }

          if (config.operator === "eq" && col.type === "select" && col.options) {
            const currentValue = currentParam.split(":")[1] || "";
            return (
              <div key={col.name} style={{ flex: "1", minWidth: "150px" }}>
                <label style={{ fontSize: "12px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "5px" }}>
                  📋 {col.label}
                </label>
                <select
                  value={currentValue}
                  onChange={(e) => updateURL({ [paramKey]: e.target.value ? `eq:${e.target.value}` : null })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
                >
                  <option value="">Tümü</option>
                  {col.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (config.operator === "btw") {
            const dates = currentParam.split(":")[1] || ",";
            const [start, end] = dates.split(",");
            return (
              <div key={col.name} style={{ flex: "1.5", minWidth: "200px" }}>
                <label style={{ fontSize: "12px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "5px" }}>
                  📅 {col.label} Aralığı
                </label>
                <div style={{ display: "flex", gap: "5px" }}>
                  <input type="date" value={start} onChange={(e) => handleDateRange(col.name, e.target.value, 'start')} style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }} />
                  <input type="date" value={end} onChange={(e) => handleDateRange(col.name, e.target.value, 'end')} style={{ width: "50%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }} />
                </div>
              </div>
            );
          }


          if (config.operator === "like") {
            return (
              <div key={col.name} style={{ flex: "1", minWidth: "150px" }}>
                <label style={{ fontSize: "12px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "5px" }}>
                  🔤 {col.label}
                </label>
                <input
                  type="text"
                  defaultValue={currentParam.split(":")[1] || ""}
                  placeholder={`${col.label} içinde ara...`}
                  onBlur={(e) => updateURL({ [paramKey]: e.target.value ? `like:${e.target.value}` : null })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      updateURL({ [paramKey]: e.currentTarget.value ? `like:${e.currentTarget.value}` : null });
                    }
                  }}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </div>
            );
          }

          return null;
        })}

        <div style={{ flex: "0.5", minWidth: "120px" }}>
          <label style={{ fontSize: "12px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "5px" }}>
            🌐 DİL
          </label>
          <select
            value={searchParams.get("lang") || "tr"}
            onChange={(e) => updateURL({ lang: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
          >
            {languages.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
          </select>
        </div>
      </div>

      <details style={{ marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "15px" }}>
        <summary style={{ cursor: "pointer", fontSize: "13px", fontWeight: "bold", color: "#007bff" }}>
          ⚙️ Tablo Sütunlarını Yönet
        </summary>
        <form
          action={async (formData) => {
            startTransition(async () => {
              await saveColumnPreferences(moduleId, formData);
              router.refresh();
            });
          }}
          style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginTop: "15px", padding: "15px", background: "white", borderRadius: "6px", border: "1px solid #ddd" }}
        >
          {schema.map((col) => (
            <label key={col.name} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" }}>
              <input
                type="checkbox"
                name="cols"
                value={col.name}
                defaultChecked={initialCols.includes(col.name)}
                onChange={(e) => e.target.form?.requestSubmit()}
              />
              {col.label}
            </label>
          ))}
          <div style={{ flexBasis: "100%", fontSize: "11px", color: "gray", fontStyle: "italic" }}>
            * Seçimleriniz bu modül için otomatik olarak kaydedilir.
          </div>
        </form>
      </details>
    </div>
  );
}