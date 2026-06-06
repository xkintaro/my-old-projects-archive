import * as coreSchema from "@/core/db/schema";
import * as categoriesSchema from "@/modules/categories/db/schema";
import * as productsSchema from "@/modules/products/db/schema";
import * as tagsSchema from "@/modules/tags/db/schema";
import { activeModules } from "@/core/registry";

export const globalSchema = {
  ...coreSchema,
  ...categoriesSchema,
  ...productsSchema,
  ...tagsSchema,
};

const dynamicTables: Record<string, any> = {
  "users": coreSchema.users,
};

activeModules.forEach((mod) => {
  dynamicTables[mod.id] = mod.table;

  if (mod.auxiliaryTables) {
    Object.assign(dynamicTables, mod.auxiliaryTables);
  }
});

export const moduleTables = dynamicTables;