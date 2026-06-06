import { timestamp, text } from "drizzle-orm/pg-core";
import { users } from "@/core/db/schema";
import type { FieldConfig } from "./types";

export const systemColumns = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  createdBy: text("created_by").references(() => users.id, { onDelete: "set null" }),
  updatedBy: text("updated_by").references(() => users.id, { onDelete: "set null" }),
};

export const systemSchemaFields: FieldConfig[] = [
  {
    name: "createdAt",
    label: "Oluşturulma Zamanı",
    type: "datetime",
    showInList: false,
    system: true,
    filterConfig: { enabled: true, operator: "btw" },
  },
  {
    name: "updatedAt",
    label: "Son Güncelleme",
    type: "datetime",
    showInList: false,
    system: true,
    filterConfig: { enabled: true, operator: "btw" },
  },
  {
    name: "createdBy",
    label: "Oluşturan",
    type: "relation_1_n",
    showInList: false,
    system: true,
    relationConfig: {
      targetTable: "users",
      targetKey: "id",
      displayKey: "name",
    },
    filterConfig: { enabled: true, operator: "eq", source: "users" },
  },
  {
    name: "updatedBy",
    label: "Son Güncelleyen",
    type: "relation_1_n",
    showInList: false,
    system: true,
    relationConfig: {
      targetTable: "users",
      targetKey: "id",
      displayKey: "name",
    },
    filterConfig: { enabled: true, operator: "eq", source: "users" },
  },
];