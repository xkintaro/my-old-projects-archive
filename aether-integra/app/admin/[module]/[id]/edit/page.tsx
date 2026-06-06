import { db } from "@/core/db";
import { moduleTables } from "@/core/registry/db";
import { activeModules } from "@/core/registry";
import { updateDynamicRecord } from "@/core/registry/actions";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { resolveLookups } from "@/core/registry/lookups";
import DynamicFormFields from "../../_components/DynamicFormFields";

export default async function DynamicEditRecordPage({
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

  const submitAction = updateDynamicRecord.bind(null, moduleId);

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <Link href={`/admin/${moduleId}/${recordId}`} style={{ textDecoration: "none", fontSize: "20px" }}>⬅️</Link>
        <h1>✏️ {activeModule.name} Düzenle</h1>
      </div>
      <hr />

      <form action={submitAction} style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
        <input type="hidden" name="id" value={record.id} />

        <DynamicFormFields
          schema={activeModule.schema}
          lookups={lookups}
          mode="edit"
          record={fullRecord}
        />

        <button type="submit" style={{ padding: "15px", background: "#007bff", color: "white", fontSize: "16px", cursor: "pointer", border: "none", marginTop: "10px" }}>
          💾 Değişiklikleri Kaydet
        </button>
      </form>
    </div>
  );
}