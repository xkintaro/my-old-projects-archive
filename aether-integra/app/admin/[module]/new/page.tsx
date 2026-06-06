import { activeModules } from "@/core/registry";
import { createDynamicRecord } from "@/core/registry/actions";
import { resolveLookups } from "@/core/registry/lookups";
import DynamicFormFields from "../_components/DynamicFormFields";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function DynamicNewRecordPage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const resolvedParams = await params;
  const moduleId = resolvedParams.module;

  const activeModule = activeModules.find((m) => m.id === moduleId);
  if (!activeModule) return notFound();

  const lookups = await resolveLookups(activeModule.schema);

  const submitAction = createDynamicRecord.bind(null, moduleId);

  const safeSchema = JSON.parse(JSON.stringify(activeModule.schema));
  const safeLookups = JSON.parse(JSON.stringify(lookups));

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <Link href={`/admin/${moduleId}`} style={{ textDecoration: "none", fontSize: "20px" }}>⬅️</Link>
        <h1>Yeni {activeModule.name} Ekle</h1>
      </div>
      <hr />

      <form action={submitAction} style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>

        <DynamicFormFields
          schema={safeSchema}
          lookups={safeLookups}
        />

        <button type="submit" style={{ padding: "15px", background: "black", color: "white", fontSize: "16px", cursor: "pointer", marginTop: "10px" }}>
          💾 Kaydet
        </button>
      </form>
    </div>
  );
}