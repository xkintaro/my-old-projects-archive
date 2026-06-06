"use client";
import type { FieldConfig } from "@/core/registry/types";

export default function NumberField({ col, name, value, required, isView }: { col: FieldConfig, name: string, value: any, required: boolean, isView: boolean }) {
    if (isView) {
        return <div style={{ fontSize: "14px", padding: "8px", background: "#f9fafb", borderRadius: "4px", border: "1px solid #eee" }}>{value !== undefined && value !== null ? value : "-"}</div>;
    }
    return (
        <input
            type="number"
            name={name}
            defaultValue={value}
            required={required}
            readOnly={col.readonly}
            style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none", background: col.readonly ? "#f3f4f6" : "#fff" }}
        />
    );
}