import { pgTable, text, numeric, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { systemColumns } from "@/core/registry/system-fields";
import { categories } from "@/modules/categories/db/schema";
import { tags } from "@/modules/tags/db/schema";

export const products = pgTable("product", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: jsonb("title").notNull(),
  slug: jsonb("slug").notNull(),
  summary: jsonb("summary"),
  description: jsonb("description"),
  price: numeric("price").default("0"),
  stock: numeric("stock").default("0"),
  isFeatured: boolean("is_featured").default(false),
  releaseDate: timestamp("release_date"),
  saleEndTime: timestamp("sale_end_time"),
  brandColor: text("brand_color"),
  specs: jsonb("specs"),
  status: text("status"),
  features: jsonb("features"),
  categoryId: text("category_id").references(() => categories.id),
  ...systemColumns,
});

export const productToTags = pgTable("product_tag", {
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  tagId: text("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
});