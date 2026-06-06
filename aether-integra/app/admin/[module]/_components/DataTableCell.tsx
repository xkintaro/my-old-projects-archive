"use client";

import { adminActiveLanguage, defaultLanguage } from "@/core/registry/i18n";
import type { FieldConfig } from "@/core/registry/types";

interface DataTableCellProps {
  col: FieldConfig;
  value: any;
}

export default function DataTableCell({ col, value }: DataTableCellProps) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-gray-400">-</span>;
  }

  const isTranslatable = "translatable" in col && col.translatable;

  if (isTranslatable) {
    if (typeof value === "object") {
      const text = value[adminActiveLanguage] || value[defaultLanguage] || Object.values(value)[0];
      
      if (col.type === "richtext" || col.type === "textarea") {
        const plainText = String(text || "").replace(/<[^>]+>/g, "");
        return <span>{plainText.length > 50 ? plainText.substring(0, 50) + "..." : plainText}</span>;
      }
      
      return <span>{String(text || "-")}</span>;
    }
    return <span className="text-red-500">Geçersiz Format</span>;
  }

  switch (col.type) {
    case "boolean":
      return (
        <span style={{ 
          padding: "4px 8px", 
          borderRadius: "12px", 
          fontSize: "12px", 
          fontWeight: "bold", 
          background: value ? "#dcfce7" : "#fee2e2", 
          color: value ? "#166534" : "#991b1b" 
        }}>
          {value ? "Aktif" : "Pasif"}
        </span>
      );

    case "color":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: value, border: "1px solid #ddd" }} />
          <span style={{ fontSize: "12px", fontFamily: "monospace" }}>{value}</span>
        </div>
      );

    case "date":
    case "datetime":
      try {
        const dateObj = new Date(value);
        return <span>{dateObj.toLocaleString("tr-TR", { 
          year: "numeric", month: "short", day: "numeric", 
          ...(col.type === "datetime" ? { hour: "2-digit", minute: "2-digit" } : {})
        })}</span>;
      } catch {
        return <span>{String(value)}</span>;
      }

    case "multiselect":
    case "relation_n_m":
      if (Array.isArray(value)) {
        return (
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {value.slice(0, 3).map((item, i) => (
              <span key={i} style={{ background: "#f3f4f6", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>
                {String(item)}
              </span>
            ))}
            {value.length > 3 && <span style={{ fontSize: "12px", color: "gray" }}>+{value.length - 3}</span>}
          </div>
        );
      }
      return <span>-</span>;

    case "select":
    case "relation_1_n":
      return <span>{String(value)}</span>;

    default:
      const strVal = String(value);
      return <span>{strVal.length > 50 ? strVal.substring(0, 50) + "..." : strVal}</span>;
  }
}