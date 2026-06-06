"use client";
import { useState } from "react";
import type { FieldConfig, SelectField as SelectFieldType } from "@/core/registry/types";

export default function MultiselectField({ col, name, value, required, isView }: { col: FieldConfig, name: string, value: any, required: boolean, isView: boolean }) {
    const options = (col as SelectFieldType).options || [];

    const initialValues = Array.isArray(value) ? value.map(String) : [];
    const [selected, setSelected] = useState<string[]>(initialValues);

    if (isView) {
        if (selected.length === 0) return <span>-</span>;
        return (
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {selected.map(val => {
                    const matched = options.find(opt => String(opt.value) === val);
                    return (
                        <span key={val} style={{ background: "#eef2ff", color: "#3730a3", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                            {matched ? matched.label : val}
                        </span>
                    );
                })}
            </div>
        );
    }

    const toggleSelection = (val: string) => {
        if (col.readonly) return;
        if (selected.includes(val)) {
            setSelected(selected.filter(item => item !== val));
        } else {
            setSelected([...selected, val]);
        }
    };

    return (
        <div style={{ padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", background: col.readonly ? "#f3f4f6" : "#fff" }}>
            {selected.map(val => (
                <input key={val} type="hidden" name={name} value={val} />
            ))}

            {required && selected.length === 0 && <input type="hidden" name={name} value="" required />}

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {options.map((opt) => {
                    const valStr = String(opt.value);
                    const isChecked = selected.includes(valStr);
                    return (
                        <label key={valStr} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: col.readonly ? "not-allowed" : "pointer" }}>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleSelection(valStr)}
                                disabled={col.readonly}
                                style={{ width: "16px", height: "16px" }}
                            />
                            <span style={{ fontSize: "14px", color: isChecked ? "#111827" : "#4b5563", fontWeight: isChecked ? "bold" : "normal" }}>{opt.label}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}