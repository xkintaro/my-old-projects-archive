"use client";
import type { FieldConfig } from "@/core/registry/types";

export default function ColorField({ col, name, value, required, isView }: { col: FieldConfig, name: string, value: any, required: boolean, isView: boolean }) {
    if (isView) {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "4px", background: value || "#fff", border: "1px solid #ddd" }} />
                <span style={{ fontFamily: "monospace" }}>{value || "-"}</span>
            </div>
        );
    }
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
                type="color"
                name={name}
                defaultValue={value || "#000000"}
                required={required}
                style={{ width: "40px", height: "40px", padding: "0", border: "none", borderRadius: "4px", cursor: col.readonly ? "not-allowed" : "pointer", pointerEvents: col.readonly ? "none" : "auto" }}
            />
            <input
                type="text"
                value={value || "#000000"}
                readOnly
                style={{ width: "100px", padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px", background: "#f3f4f6", fontFamily: "monospace", fontSize: "12px" }}
            />
        </div>
    );
}