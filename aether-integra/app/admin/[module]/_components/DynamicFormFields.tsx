"use client";

import { languages, defaultLanguage } from "@/core/registry/i18n";
import type { FieldConfig } from "@/core/registry/types";

import TextField from "./fields/TextField";
import TextareaField from "./fields/TextareaField";
import ColorField from "./fields/ColorField";
import KeyValueField from "./fields/KeyValueField";
import NumberField from "./fields/NumberField";
import BooleanField from "./fields/BooleanField";
import DateField from "./fields/DateField";
import DatetimeField from "./fields/DatetimeField";
import SelectField from "./fields/SelectField";
import MultiselectField from "./fields/MultiselectField";
import RichTextField from "./fields/RichTextField";
import Relation1NField from "./fields/Relation1NField";
import RelationNMField from "./fields/RelationNMField";

export default function DynamicFormFields({ schema, record, lookups, isView = false }: { schema: FieldConfig[], record?: any, lookups: any, isView?: boolean }) {

  const renderField = (col: FieldConfig, name: string, value: any, required: boolean) => {
    switch (col.type) {
      case "text": return <TextField col={col} name={name} value={value} required={required} isView={isView} />;
      case "textarea": return <TextareaField col={col} name={name} value={value} required={required} isView={isView} />;
      case "color": return <ColorField col={col} name={name} value={value} required={required} isView={isView} />;
      case "key_value": return <KeyValueField col={col} name={name} value={value} isView={isView} />;
      case "number": return <NumberField col={col} name={name} value={value} required={required} isView={isView} />;
      case "boolean": return <BooleanField col={col} name={name} value={value} isView={isView} />;
      case "date": return <DateField col={col} name={name} value={value} required={required} isView={isView} />;
      case "datetime": return <DatetimeField col={col} name={name} value={value} required={required} isView={isView} />;
      case "select": return <SelectField col={col} name={name} value={value} required={required} isView={isView} />;
      case "multiselect": return <MultiselectField col={col} name={name} value={value} required={required} isView={isView} />;
      case "richtext": return <RichTextField col={col} name={name} value={value} required={required} isView={isView} />;
      case "relation_1_n": return <Relation1NField col={col} name={name} value={value} required={required} isView={isView} lookups={lookups} />;
      case "relation_n_m": return <RelationNMField col={col} name={name} value={value} required={required} isView={isView} lookups={lookups} />;
      default:
        return <div className="text-red-500 text-sm">Eksik bileşen: {(col as any).type}</div>;
    }
  };

  return (
    <>
      {schema.map((col) => {
        if (col.system) return null;

        const isTranslatable = "translatable" in col && col.translatable;

        if (isTranslatable) {
          return (
            <div key={col.name} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#fdfdfd" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "10px", color: "#374151" }}>
                {col.label} {col.required && <span style={{ color: "red" }}>*</span>}
              </label>
              {col.description && <p style={{ fontSize: "12px", color: "gray", marginTop: "-5px", marginBottom: "10px" }}>{col.description}</p>}

              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                {languages.map((lang: { code: string; name: string; flag: string }) => {
                  const fieldName = `${col.name}_${lang.code}`;
                  const fieldValue = record?.[col.name]?.[lang.code] ?? ("defaultValue" in col ? col.defaultValue : "");
                  const isRequired = !!(col.required && lang.code === defaultLanguage);

                  return (
                    <div key={lang.code} style={{ flex: "1", minWidth: "250px", background: "#fff", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}>
                      <span style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "#6b7280", marginBottom: "8px" }}>
                        {lang.flag} {lang.name} {isRequired && "*"}
                      </span>
                      {renderField(col, fieldName, fieldValue, isRequired)}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        const fieldName = col.name;
        const fieldValue = record?.[col.name] ?? ("defaultValue" in col ? col.defaultValue : "");
        const isRequired = !!col.required;

        return (
          <div key={col.name} style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", color: "#374151" }}>
              {col.label} {isRequired && <span style={{ color: "red" }}>*</span>}
            </label>
            {col.description && <p style={{ fontSize: "12px", color: "gray", marginBottom: "5px" }}>{col.description}</p>}

            {renderField(col, fieldName, fieldValue, isRequired)}
          </div>
        );
      })}
    </>
  );
}