/**
* ╔══════════════════════════════════════════════════════════════════════════════╗
* ║                            FILTER OPERATORS                                  ║
* ╠══════════════════════════════════════════════════════════════════════════════╣
* ║ Defines the comparison logic for database queries:                           ║
* ║                                                                              ║
* ║ eq   : Equal         → WHERE id = 5                                          ║
* ║ gt   : Greater Than  → WHERE price > 500                                     ║
* ║ lt   : Less Than     → WHERE price < 500                                     ║
* ║ btw  : Between       → WHERE date BETWEEN '2024-01-01' AND '2024-12-31'      ║
* ║ in   : Inclusion     → WHERE status IN ('draft', 'published')                ║
* ║ like : Similarity    → WHERE title LIKE '%keyword%'                          ║
* ╚══════════════════════════════════════════════════════════════════════════════╝
*/
export type FilterOperator = "eq" | "gt" | "lt" | "btw" | "in" | "like";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                            BASE FIELD CONFIG                                 ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║ Tüm tiplerin ortak olarak sahip olduğu evrensel özellikler.                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */
interface BaseFieldConfig {
  name: string;
  label: string;
  required?: boolean;
  showInList?: boolean;
  sortable?: boolean;
  description?: string;
  readonly?: boolean;
  autoSlugFrom?: string;
  system?: boolean;
  filterConfig?: {
    enabled: boolean;
    operator: FilterOperator;
    source?: string;
  };
}

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         1. ÇEVRİLEBİLİR ALANLAR                              ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║ Sadece bu tipler 'translatable' özelliğini alabilir.                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */
export interface TranslatableField extends BaseFieldConfig {
  type: "text" | "textarea" | "richtext" | "key_value";
  translatable?: boolean;
  defaultValue?: string | Record<string, any>;
}

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         2. EVRENSEL (STANDART) ALANLAR                       ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║ Sayı, tarih ve mantıksal değerler evrenseldir, ÇEVRİLEMEZLER.                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */
export interface StandardField extends BaseFieldConfig {
  type: "number" | "boolean" | "date" | "datetime" | "color";
  defaultValue?: string | number | boolean;
}

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         3. STATİK SEÇİMLER                                   ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║ İçerisinde 'options' barındırmak ZORUNDADIR.                                 ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */
export interface SelectField extends BaseFieldConfig {
  type: "select" | "multiselect";
  options: { label: string; value: string | number }[];
  defaultValue?: string | number | string[];
}

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         4. İLİŞKİLER (RELATIONS)                             ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║ Kendi kurallarına (targetTable vb.) sahip olmak ZORUNDADIR.                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */
export interface Relation1NField extends BaseFieldConfig {
  type: "relation_1_n";
  relationConfig: {
    targetTable: string;
    targetKey: string;
    displayKey: string;
  };
}

export interface RelationNMField extends BaseFieldConfig {
  type: "relation_n_m";
  relationNMConfig: {
    junctionTable: string;
    targetTable: string;
    targetKey: string;
    sourceColumn: string;
    targetColumn: string;
    displayKey: string;
  };
}

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         FİNAL: MASTER TİP BİRLİĞİ                            ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */
export type FieldConfig =
  | TranslatableField
  | StandardField
  | SelectField
  | Relation1NField
  | RelationNMField;


export interface ModuleConfig {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  adminRoute: string;
  table: any;
  auxiliaryTables?: Record<string, any>;
  defaultSort?: { column: string; direction: "asc" | "desc" };
  permissions: { action: string; name: string; description: string }[];
  schema: FieldConfig[];
}