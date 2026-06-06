import { db } from "@/core/db";
import { moduleTables } from "@/core/registry/db";
import { activeModules } from "@/core/registry";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { resolveLookups } from "@/core/registry/lookups";
import DynamicFormFields from "../_components/DynamicFormFields";

export default async function DynamicViewRecordPage({
  params,
}: {
  params: Promise<{ module: string; id: string }>;
}) {
  const resolvedParams = await params;
  const { module: moduleId, id: recordId } = resolvedParams;

  const activeModule = activeModules.find((m) => m.id === moduleId);
  const targetTable = moduleTables[moduleId];
  if (!activeModule || !targetTable) return notFound();

  const [record] = await db.select().from(targetTable).where(eq(targetTable.id, recordId));
  if (!record) return notFound();

  const nmRelations: Record<string, string[]> = {};
  for (const col of activeModule.schema) {
    if (col.type === "relation_n_m" && col.relationNMConfig) {
      const junctionTable = moduleTables[col.relationNMConfig.junctionTable];
      if (junctionTable) {
        const links = await db.select()
          .from(junctionTable)
          .where(eq(junctionTable[col.relationNMConfig.sourceColumn], recordId));
        
        nmRelations[col.name] = links.map(link => link[col.relationNMConfig!.targetColumn]);
      }
    }
  }
  
  const fullRecord = { ...record, ...nmRelations };

  const lookups = await resolveLookups(activeModule.schema, fullRecord);

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link href={`/admin/${moduleId}`} style={{ textDecoration: "none", fontSize: "20px" }}>⬅️</Link>
          <h1>👁️ {activeModule.name} Detayı</h1>
        </div>

        <Link href={`/admin/${moduleId}/${recordId}/edit`} style={{ padding: "10px 15px", background: "black", color: "white", textDecoration: "none", borderRadius: "5px" }}>
          ✏️ Düzenle
        </Link>
      </div>
      <hr />

      <div style={{ background: "#fdfdfd", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginTop: "20px" }}>
        <DynamicFormFields
          schema={activeModule.schema}
          lookups={lookups}
          mode="view"
          record={fullRecord}
        />
      </div>
    </div>
  );
}