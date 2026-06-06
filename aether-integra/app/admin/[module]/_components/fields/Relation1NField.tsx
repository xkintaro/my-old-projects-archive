"use client";
import { useState, useEffect, useRef } from "react";
import { searchRelationData } from "@/core/registry/actions";
import { adminActiveLanguage, defaultLanguage } from "@/core/registry/i18n";
import type { FieldConfig, Relation1NField as Relation1NType } from "@/core/registry/types";

export default function Relation1NField({ col, name, value, required, isView, lookups }: { col: FieldConfig, name: string, value: any, required: boolean, isView: boolean, lookups: any }) {
    const config = (col as Relation1NType).relationConfig;
    const initialOptions = lookups[col.name] || [];

    const [options, setOptions] = useState(initialOptions);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedValue, setSelectedValue] = useState<any>(value || "");
    const wrapperRef = useRef<HTMLDivElement>(null);

    const parseDisplayValue = (val: any) => {
        if (typeof val === "object" && val !== null) {
            return val[adminActiveLanguage] || val[defaultLanguage] || Object.values(val)[0] || JSON.stringify(val);
        }
        return String(val || "");
    };

    const [displayText, setDisplayText] = useState(() => {
        if (!value) return "";
        const matched = initialOptions.find((opt: any) => opt[config.targetKey] === value);
        return matched ? parseDisplayValue(matched[config.displayKey]) : String(value);
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                const matched = options.find((opt: any) => opt[config.targetKey] === selectedValue);
                setDisplayText(matched ? parseDisplayValue(matched[config.displayKey]) : "");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [options, selectedValue, config]);

    useEffect(() => {
        const delayFn = setTimeout(async () => {
            if (isOpen && search !== "") {
                setLoading(true);
                try {
                    const results = await searchRelationData(config.targetTable, config.targetKey, config.displayKey, search);
                    setOptions(results);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            } else if (isOpen && search === "") {
                setOptions(initialOptions);
            }
        }, 300);
        return () => clearTimeout(delayFn);
    }, [search, isOpen, config, initialOptions]);

    if (isView) {
        return <div style={{ fontSize: "14px", padding: "8px", background: "#f9fafb", borderRadius: "4px", border: "1px solid #eee" }}>{displayText || "-"}</div>;
    }

    const handleSelect = (opt: any) => {
        setSelectedValue(opt[config.targetKey]);
        setDisplayText(parseDisplayValue(opt[config.displayKey]));
        setIsOpen(false);
        setSearch("");
    };

    return (
        <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
            <input type="hidden" name={name} value={selectedValue} />

            {required && !selectedValue && <input type="hidden" name={name} value="" required />}

            <input
                type="text"
                readOnly={col.readonly}
                value={isOpen ? search : displayText}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setIsOpen(true);
                    if (!isOpen) setDisplayText("");
                }}
                onClick={() => !col.readonly && setIsOpen(true)}
                placeholder="Ara ve seç..."
                style={{ width: "100%", padding: "10px", paddingRight: "30px", border: "1px solid #d1d5db", borderRadius: "6px", outline: "none", background: col.readonly ? "#f3f4f6" : "#fff", cursor: col.readonly ? "not-allowed" : "text" }}
            />

            {!col.readonly && selectedValue && (
                <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedValue(""); setDisplayText(""); setSearch(""); }} style={{ position: "absolute", right: "10px", top: "12px", background: "none", border: "none", cursor: "pointer", color: "gray" }}>✕</button>
            )}

            {isOpen && !col.readonly && (
                <ul style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50, background: "white", border: "1px solid #d1d5db", maxHeight: "200px", overflowY: "auto", listStyle: "none", padding: 0, margin: "5px 0 0 0", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "6px" }}>
                    {loading && <li style={{ padding: "10px", color: "gray", fontSize: "13px", textAlign: "center" }}>Aranıyor...</li>}
                    {!loading && options.length === 0 && <li style={{ padding: "10px", color: "gray", fontSize: "13px", textAlign: "center" }}>Kayıt bulunamadı.</li>}
                    {!loading && options.map((opt: any) => (
                        <li key={opt[config.targetKey]} onClick={() => handleSelect(opt)} style={{ padding: "10px", cursor: "pointer", fontSize: "14px", borderBottom: "1px solid #eee", background: selectedValue === opt[config.targetKey] ? "#eef2ff" : "white" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = selectedValue === opt[config.targetKey] ? "#eef2ff" : "white"}>
                            {parseDisplayValue(opt[config.displayKey])}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}