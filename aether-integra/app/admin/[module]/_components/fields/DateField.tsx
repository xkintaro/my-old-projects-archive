"use client";
import type { FieldConfig } from "@/core/registry/types";

export default function DateField({ col, name, value, required, isView }: { col: FieldConfig, name: string, value: any, required: boolean, isView: boolean }) {

  let formattedValue = "";
  if (value) {
    try {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        const offset = d.getTimezoneOffset() * 60000;
        formattedValue = new Date(d.getTime() - offset).toISOString().split("T")[0];
      }
    } catch (err) {
      console.warn(`[DateField] Geçersiz tarih formatı algılandı:`, value);
      formattedValue = "";
    }
  }

  if (isView) {
    return <div style={{ fontSize: "14px", padding: "8px", background: "#f9fafb", borderRadius: "4px", border: "1px solid #eee" }}>{formattedValue ? new Date(formattedValue).toLocaleDateString("tr-TR") : "-"}</div>;
  }

  return (
    <input
      type="date"
      name={name}
      defaultValue={formattedValue}
      required={required}
      readOnly={col.readonly}
      style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none", background: col.readonly ? "#f3f4f6" : "#fff" }}
    />
  );
}