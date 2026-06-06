import { ModuleConfig } from "./types";
import { CategoriesModule } from "@/modules/categories";
import { ProductsModule } from "@/modules/products";
import { TagsModule } from "@/modules/tags";
import { corePermissions } from "@/core/auth/permissions";
import { systemSchemaFields } from "@/core/registry/system-fields";

const rawModules: ModuleConfig[] = [
  CategoriesModule,
  ProductsModule,
  TagsModule,
];

export const activeModules: ModuleConfig[] = rawModules.map((mod) => ({
  ...mod,
  schema: [...mod.schema, ...systemSchemaFields],
}));

export function getAllSystemPermissions() {
  const allPermissions: string[] = [];

  corePermissions.forEach((perm) => {
    allPermissions.push(perm.action);
  });

  activeModules.forEach((mod) => {
    mod.permissions.forEach((perm) => {
      allPermissions.push(perm.action);
    });
  });

  return allPermissions;
}