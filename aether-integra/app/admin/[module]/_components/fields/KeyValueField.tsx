"use client";
import { useState } from "react";
import type { FieldConfig } from "@/core/registry/types";

export default function KeyValueField({ col, name, value, isView }: { col: FieldConfig, name: string, value: any, isView: boolean }) {
    const initialPairs = value && typeof value === "object" ? Object.entries(value).map(([k, v]) => ({ key: k, val: String(v) })) : [];
    const [pairs, setPairs] = useState(initialPairs);

    if (isView) {
        if (pairs.length === 0) return <span>-</span>;
        return <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}><tbody>{pairs.map((p, i) => (<tr key={i} style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: "8px", fontWeight: "bold", width: "30%", color: "#4b5563" }}>{p.key}</td><td style={{ padding: "8px" }}>{p.val}</td></tr>))}</tbody></table>;
    }

    const jsonOutput = pairs.reduce((acc, pair) => { if (pair.key.trim() !== "") acc[pair.key.trim()] = pair.val; return acc; }, {} as Record<string, string>);
    const addPair = () => setPairs([...pairs, { key: "", val: "" }]);
    const updatePair = (index: number, field: "key" | "val", newVal: string) => { const newPairs = [...pairs]; newPairs[index][field] = newVal; setPairs(newPairs); };
    const removePair = (index: number) => setPairs(pairs.filter((_, i) => i !== index));

    return (
        <div style={{ background: "#f9fafb", padding: "10px", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
            <input type="hidden" name={name} value={JSON.stringify(jsonOutput)} />
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {pairs.map((pair, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <input type="text" placeholder="Özellik (Örn: RAM)" value={pair.key} onChange={(e) => updatePair(i, "key", e.target.value)} style={{ flex: 1, padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }} />
                        <input type="text" placeholder="Değer (Örn: 16GB)" value={pair.val} onChange={(e) => updatePair(i, "val", e.target.value)} style={{ flex: 1, padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }} />
                        <button type="button" onClick={() => removePair(i)} style={{ padding: "8px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>✕</button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addPair} style={{ marginTop: "10px", padding: "8px 15px", background: "#e0e7ff", color: "#4f46e5", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>+ Yeni Özellik Ekle</button>
        </div>
    );
}