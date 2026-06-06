"use client";

import { useState, useEffect } from "react";
import { searchRelationData } from "@/core/registry/actions";
import { adminActiveLanguage, defaultLanguage } from "@/core/registry/i18n";

interface AsyncMultiCheckboxProps {
  name: string;
  targetTable: string;
  targetKey: string;
  displayKey: string;
  initialOptions: any[];
  defaultValues?: string[]; 
}

export default function AsyncMultiCheckbox({
  name,
  targetTable,
  targetKey,
  displayKey,
  initialOptions,
  defaultValues = [],
}: AsyncMultiCheckboxProps) {
  const [options, setOptions] = useState(initialOptions);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultValues);

  const [selectedCache, setSelectedCache] = useState<any[]>(
    initialOptions.filter(opt => defaultValues.includes(opt[targetKey]))
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
          const results = await searchRelationData(targetTable, targetKey, displayKey, search);
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
  }, [search, targetTable, targetKey, displayKey, initialOptions]);

  const toggleSelection = (opt: any) => {
    const id = opt[targetKey];
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
      setSelectedCache(prev => prev.filter(item => item[targetKey] !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
      setSelectedCache(prev => {
        if (!prev.find(item => item[targetKey] === id)) return [...prev, opt];
        return prev;
      });
    }
  };

  const displayOptions = [...selectedCache];
  options.forEach(opt => {
    if (!displayOptions.find(item => item[targetKey] === opt[targetKey])) {
      displayOptions.push(opt);
    }
  });

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "6px", background: "white", padding: "10px", marginTop: "5px" }}>
      
      {selectedIds.map(id => (
        <input key={id} type="hidden" name={name} value={id} />
      ))}

      <input
        type="text"
        placeholder="Arayın..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px", marginBottom: "10px" }}
      />

      <div style={{ maxHeight: "200px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "5px" }}>
        {loading && <div style={{ fontSize: "12px", color: "gray" }}>Aranıyor...</div>}
        
        {!loading && displayOptions.map((opt) => {
          const isChecked = selectedIds.includes(opt[targetKey]);
          return (
            <label 
              key={opt[targetKey]} 
              style={{ 
                display: "flex", alignItems: "center", gap: "8px", padding: "5px", 
                background: isChecked ? "#f0f8ff" : "transparent", 
                borderRadius: "4px", cursor: "pointer" 
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleSelection(opt)}
                style={{ cursor: "pointer" }}
              />
              <span style={{ fontSize: "14px", fontWeight: isChecked ? "bold" : "normal" }}>
                {parseDisplayValue(opt[displayKey])}
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