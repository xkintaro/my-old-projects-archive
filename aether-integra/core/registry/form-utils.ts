import { languages, defaultLanguage } from "@/core/registry/i18n";
import type { FieldConfig } from "@/core/registry/types";

export function slugify(text: string) {
    let trMap: Record<string, string> = {
        'çÇ': 'c', 'ğĞ': 'g', 'şŞ': 's', 'üÜ': 'u', 'ıİ': 'i', 'öÖ': 'o'
    };
    for (let key in trMap) {
        text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
    }
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

export function buildDataFromForm(schema: FieldConfig[], formData: FormData) {
    const data: Record<string, any> = {};
    const nmData: Record<string, string[]> = {};

    for (const col of schema) {
        if (col.system) continue;

        const type = col.type;
        const name = col.name;

        if (type === "relation_n_m") {
            nmData[name] = formData.getAll(name) as string[];
            continue;
        }

        const isTranslatable = "translatable" in col && col.translatable;

        if (isTranslatable) {
            const i18nObj: Record<string, any> = {};

            for (const lang of languages) {
                const fieldName = `${name}_${lang.code}`;

                switch (type) {
                    case "date":
                    case "datetime": {
                        const dStr = formData.get(fieldName) as string;
                        if (dStr && dStr.trim() !== "") {
                            const d = new Date(dStr);
                            i18nObj[lang.code] = isNaN(d.getTime()) ? null : d;
                        } else {
                            i18nObj[lang.code] = null;
                        }
                        break;
                    }
                    case "number": {
                        const nStr = formData.get(fieldName) as string;
                        i18nObj[lang.code] = nStr && nStr.trim() !== "" ? Number(nStr) : null;
                        break;
                    }
                    case "key_value": {
                        const val = formData.get(fieldName) as string;
                        try { i18nObj[lang.code] = val ? JSON.parse(val) : {}; }
                        catch { i18nObj[lang.code] = {}; }
                        break;
                    }
                    case "multiselect":
                        i18nObj[lang.code] = formData.getAll(fieldName);
                        break;
                    case "boolean":
                        i18nObj[lang.code] = formData.get(fieldName) === "on";
                        break;
                    case "text":
                    case "textarea":
                    case "richtext":
                    case "color":
                    case "select":
                    case "relation_1_n":
                        i18nObj[lang.code] = formData.get(fieldName);
                        break;
                }
            }
            data[name] = i18nObj;
        }
        else {
            switch (type) {
                case "date":
                case "datetime": {
                    const dStr = formData.get(name) as string;
                    if (dStr && dStr.trim() !== "") {
                        const d = new Date(dStr);
                        data[name] = isNaN(d.getTime()) ? null : d;
                    } else {
                        data[name] = null;
                    }
                    break;
                }
                case "number": {
                    const nStr = formData.get(name) as string;
                    data[name] = nStr && nStr.trim() !== "" ? Number(nStr) : null;
                    break;
                }
                case "boolean":
                    data[name] = formData.get(name) === "on";
                    break;
                case "multiselect":
                    data[name] = formData.getAll(name);
                    break;
                case "key_value": {
                    const val = formData.get(name) as string;
                    try { data[name] = val ? JSON.parse(val) : {}; }
                    catch { data[name] = {}; }
                    break;
                }
                case "text":
                case "textarea":
                case "richtext":
                case "color":
                case "select":
                case "relation_1_n":
                    data[name] = formData.get(name);
                    break;
            }
        }
    }
    for (const col of schema) {
        if (col.autoSlugFrom) {
            const sourceValue = data[col.autoSlugFrom];
            const isTranslatable = "translatable" in col && col.translatable;

            if (isTranslatable) {
                const currentSlugObj = data[col.name] || {};
                const newSlugObj: Record<string, string> = { ...currentSlugObj };

                if (typeof sourceValue === "object" && sourceValue !== null) {
                    for (const lang of languages) {
                        if (!newSlugObj[lang.code] && sourceValue[lang.code]) {
                            newSlugObj[lang.code] = slugify(String(sourceValue[lang.code]));
                        }
                    }
                }
                data[col.name] = newSlugObj;
            }
            else {
                if (!data[col.name]) {
                    let sourceText = "";
                    if (typeof sourceValue === "object" && sourceValue !== null) {
                        sourceText = sourceValue[defaultLanguage] || Object.values(sourceValue)[0] || "";
                    } else {
                        sourceText = String(sourceValue || "");
                    }
                    data[col.name] = slugify(sourceText);
                }
            }
        }
    }

    return { data, nmData };
}

export function validateRequiredI18nFields(schema: FieldConfig[], data: Record<string, any>) {
    for (const col of schema) {
        const isTranslatable = "translatable" in col && col.translatable;
        if (!isTranslatable || !col.required) continue;

        const val = data[col.name]?.[defaultLanguage];
        const errorMessage = `${col.label} alanı varsayılan dil (${defaultLanguage}) için zorunludur.`;

        switch (col.type) {
            case "key_value":
                if (!val || Object.keys(val).length === 0) throw new Error(errorMessage);
                break;
            case "text":
            case "textarea":
            case "richtext":
                if (!val || String(val).trim() === "") throw new Error(errorMessage);
                break;
            default:
                if (!val) throw new Error(errorMessage);
                break;
        }
    }
}