import { pgTable, text } from "drizzle-orm/pg-core";
import { systemColumns } from "@/core/registry/system-fields";
import { jsonb } from "drizzle-orm/pg-core";

export const tags = pgTable("tag", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: jsonb("name").notNull(),
    ...systemColumns,
});