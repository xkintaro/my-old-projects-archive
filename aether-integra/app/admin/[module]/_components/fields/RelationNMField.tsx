"use client";
import { useState, useEffect } from "react";
import { searchRelationData } from "@/core/registry/actions";
import { adminActiveLanguage, defaultLanguage } from "@/core/registry/i18n";
import type { FieldConfig, RelationNMField as RelationNMType } from "@/core/registry/types";

export default function RelationNMField({ col, name, value, required, isView, lookups }: { col: FieldConfig, name: string, value: any, required: boolean, isView: boolean, lookups: any }) {
    const config = (col as RelationNMType).relationNMConfig;
    const initialOptions = lookups[col.name] || [];
    const defaultValues = Array.isArray(value) ? value : [];

    const [options, setOptions] = useState(initialOptions);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>(defaultValues);

    const [selectedCache, setSelectedCache] = useState<any[]>(
        initialOptions.filter((opt: any) => defaultValues.includes(opt[config.targetKey]))
    );

    const parseDisplayValue = (val: any) => {
        if (typeof val === "object" && val !== null) {
            return val[adminActiveLanguage] || val[defaultLanguage] || Object.values(val)[0] || JSON.stringify(val);
        }
        return String(val || "");
    };

    useEffect(() => {
        const delayFn = setTimeout(async () => {
            if (search !== "") {
                setLoading(true);
                try {
                    const results = await searchRelationData(config.targetTable, config.targetKey, config.displayKey, search);
                    setOptions(results);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            } else {
                setOptions(initialOptions);
            }
        }, 300);
        return () => clearTimeout(delayFn);
    }, [search, config, initialOptions]);

    const toggleSelection = (opt: any) => {
        if (col.readonly) return;
        const id = opt[config.targetKey];
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(item => item !== id));
            setSelectedCache(prev => prev.filter(item => item[config.targetKey] !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
            setSelectedCache(prev => {
                if (!prev.find(item => item[config.targetKey] === id)) return [...prev, opt];
                return prev;
            });
        }
    };

    const displayOptions = [...selectedCache];
    options.forEach((opt: any) => {
        if (!displayOptions.find(item => item[config.targetKey] === opt[config.targetKey])) {
            displayOptions.push(opt);
        }
    });

    if (isView) {
        if (selectedIds.length === 0) return <span>-</span>;
        return (
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {selectedIds.map(id => {
                    const matched = selectedCache.find(opt => opt[config.targetKey] === id);
                    return (
                        <span key={id} style={{ background: "#eef2ff", color: "#3730a3", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                            {matched ? parseDisplayValue(matched[config.displayKey]) : id}
                        </span>
                    );
                })}
            </div>
        );
    }

    return (
        <div style={{ border: "1px solid #d1d5db", borderRadius: "6px", background: col.readonly ? "#f3f4f6" : "white", padding: "10px" }}>
            {selectedIds.map(id => (
                <input key={id} type="hidden" name={name} value={id} />
            ))}

            {required && selectedIds.length === 0 && <input type="hidden" name={name} value="" required />}

            <input
                type="text"
                placeholder="Arayın..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                readOnly={col.readonly}
                style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px", marginBottom: "10px", outline: "none", background: col.readonly ? "#e5e7eb" : "white" }}
            />

            <div style={{ maxHeight: "200px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "5px" }}>
                {loading && <div style={{ fontSize: "12px", color: "gray" }}>Aranıyor...</div>}

                {!loading && displayOptions.map((opt: any) => {
                    const isChecked = selectedIds.includes(opt[config.targetKey]);
                    return (
                        <label key={opt[config.targetKey]} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px", background: isChecked ? "#f0f8ff" : "transparent", borderRadius: "4px", cursor: col.readonly ? "not-allowed" : "pointer" }}>
                            <input type="checkbox" checked={isChecked} onChange={() => toggleSelection(opt)} disabled={col.readonly} style={{ cursor: "inherit" }} />
                            <span style={{ fontSize: "14px", fontWeight: isChecked ? "bold" : "normal", color: "#374151" }}>
                                {parseDisplayValue(opt[config.displayKey])}
                            </span>
                        </label>
                    );
                })}

                {!loading && displayOptions.length === 0 && (
                    <div style={{ fontSize: "12px", color: "gray" }}>Kayıt bulunamadı.</div>
                )}
            </div>
        </div>
    );
}