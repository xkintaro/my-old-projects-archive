"use client";
import type { FieldConfig, SelectField as SelectFieldType } from "@/core/registry/types";

export default function SelectField({ col, name, value, required, isView }: { col: FieldConfig, name: string, value: any, required: boolean, isView: boolean }) {
    const options = (col as SelectFieldType).options || [];

    if (isView) {
        const matched = options.find(opt => String(opt.value) === String(value));
        return <div style={{ fontSize: "14px", padding: "8px", background: "#f9fafb", borderRadius: "4px", border: "1px solid #eee" }}>{matched ? matched.label : (value || "-")}</div>;
    }

    return (
        <select
            name={name}
            defaultValue={value ?? ""}
            required={required}
            disabled={col.readonly}
            style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none", background: col.readonly ? "#f3f4f6" : "#fff" }}
        >
            <option value="">Seçiniz...</option>
            {options.map((opt) => (
                <option key={String(opt.value)} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}