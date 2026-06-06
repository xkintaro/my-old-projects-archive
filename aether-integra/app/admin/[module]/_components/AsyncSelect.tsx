"use client";

import { useState, useEffect, useRef } from "react";
import { searchRelationData } from "@/core/registry/actions";
import { adminActiveLanguage, defaultLanguage } from "@/core/registry/i18n";

interface AsyncSelectProps {
  name?: string;
  targetTable: string;
  targetKey: string;
  displayKey: string;
  initialOptions: any[];
  defaultValue?: any;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: any) => void;
}

export default function AsyncSelect({
  name,
  targetTable,
  targetKey,
  displayKey,
  initialOptions,
  defaultValue,
  required,
  placeholder = "Ara ve seç...",
  onChange
}: AsyncSelectProps) {
  const [options, setOptions] = useState(initialOptions);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState<any>(defaultValue || "");

  const wrapperRef = useRef<HTMLDivElement>(null);

  const parseDisplayValue = (val: any) => {
    if (typeof val === "object" && val !== null) {
      return val[adminActiveLanguage] || val[defaultLanguage] || Object.values(val)[0] || JSON.stringify(val);
    }
    return String(val || "");
  };

  const [displayText, setDisplayText] = useState(() => {
    if (!defaultValue) return "";
    const matched = initialOptions.find(opt => opt[targetKey] === defaultValue);
    return matched ? parseDisplayValue(matched[displayKey]) : String(defaultValue);
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        const matched = options.find(opt => opt[targetKey] === selectedValue);
        setDisplayText(matched ? parseDisplayValue(matched[displayKey]) : "");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [options, selectedValue, targetKey, displayKey]);

  useEffect(() => {
    const delayFn = setTimeout(async () => {
      if (isOpen && search !== "") {
        setLoading(true);
        try {
          const results = await searchRelationData(targetTable, targetKey, displayKey, search);
          setOptions(results);
        } catch (error) {
          console.error("Arama hatası:", error);
        } finally {
          setLoading(false);
        }
      } else if (isOpen && search === "") {
        setOptions(initialOptions);
      }
    }, 300);
    return () => clearTimeout(delayFn);
  }, [search, isOpen, targetTable, targetKey, displayKey, initialOptions]);

  const handleSelect = (opt: any) => {
    setSelectedValue(opt[targetKey]);
    setDisplayText(parseDisplayValue(opt[displayKey]));
    setIsOpen(false);
    setSearch("");
    if (onChange) onChange(opt[targetKey]); 
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      {name && <input type="hidden" name={name} value={selectedValue} />}

      <input
        type="text"
        required={required && !selectedValue}
        value={isOpen ? search : displayText}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
          if (!isOpen) setDisplayText("");
        }}
        onClick={() => setIsOpen(true)}
        placeholder={placeholder}
        style={{ width: "100%", padding: "8px", paddingRight: "30px", border: "1px solid #ddd", borderRadius: "4px", background: "#fff" }}
      />

      {selectedValue && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedValue("");
            setDisplayText("");
            setSearch("");
            if (onChange) onChange(null);
          }}
          style={{ position: "absolute", right: "10px", top: "10px", background: "none", border: "none", cursor: "pointer", color: "gray" }}
        >
          ✕
        </button>
      )}

      {isOpen && (
        <ul style={{
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
          background: "white", border: "1px solid #ddd", maxHeight: "200px", overflowY: "auto",
          listStyle: "none", padding: 0, margin: "5px 0 0 0", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "4px"
        }}>
          {loading && <li style={{ padding: "10px", color: "gray", fontSize: "13px", textAlign: "center" }}>Aranıyor...</li>}

          {!loading && options.length === 0 && (
            <li style={{ padding: "10px", color: "gray", fontSize: "13px", textAlign: "center" }}>Kayıt bulunamadı.</li>
          )}

          {!loading && options.map((opt) => (
            <li
              key={opt[targetKey]}
              onClick={() => handleSelect(opt)}
              style={{
                padding: "10px", cursor: "pointer", fontSize: "14px",
                borderBottom: "1px solid #eee",
                background: selectedValue === opt[targetKey] ? "#f0f8ff" : "white"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f9f9f9"}
              onMouseLeave={(e) => e.currentTarget.style.background = selectedValue === opt[targetKey] ? "#f0f8ff" : "white"}
            >
              {parseDisplayValue(opt[displayKey])}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}