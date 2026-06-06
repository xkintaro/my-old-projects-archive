"use client";
import type { FieldConfig } from "@/core/registry/types";

export default function BooleanField({ col, name, value, isView }: { col: FieldConfig, name: string, value: any, isView: boolean }) {
    const isChecked = value === true || value === "true" || value === "on";

    if (isView) {
        return (
            <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", background: isChecked ? "#dcfce7" : "#fee2e2", color: isChecked ? "#166534" : "#991b1b" }}>
                {isChecked ? "Evet / Aktif" : "Hayır / Pasif"}
            </div>
        );
    }

    return (
        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: col.readonly ? "not-allowed" : "pointer" }}>
            <input
                type="checkbox"
                name={name}
                defaultChecked={isChecked}
                disabled={col.readonly}
                style={{ width: "20px", height: "20px", cursor: "inherit" }}
            />
            <span style={{ fontSize: "14px", color: "#374151" }}>{col.label} olarak işaretle</span>
        </label>
    );
}