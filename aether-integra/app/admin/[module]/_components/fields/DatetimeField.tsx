"use client";
import type { FieldConfig } from "@/core/registry/types";

export default function DatetimeField({ col, name, value, required, isView }: { col: FieldConfig, name: string, value: any, required: boolean, isView: boolean }) {
  
  let formattedValue = "";
  if (value) {
    try {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        const offset = d.getTimezoneOffset() * 60000;
        formattedValue = new Date(d.getTime() - offset).toISOString().slice(0, 16);
      }
    } catch (err) {
      console.warn(`[DatetimeField] Geçersiz zaman formatı algılandı:`, value);
      formattedValue = "";
    }
  }

  if (isView) {
    const displayDate = formattedValue ? new Date(formattedValue).toLocaleString("tr-TR") : "-";
    return <div style={{ fontSize: "14px", padding: "8px", background: "#f9fafb", borderRadius: "4px", border: "1px solid #eee" }}>{displayDate}</div>;
  }

  return (
    <input
      type="datetime-local"
      name={name}
      defaultValue={formattedValue}
      required={required}
      readOnly={col.readonly}
      style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none", background: col.readonly ? "#f3f4f6" : "#fff" }}
    />
  );
}