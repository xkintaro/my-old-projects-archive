import { ModuleConfig } from "@/core/registry/types";
import { categories } from "./db/schema";

export const CategoriesModule: ModuleConfig = {
  id: "categories",
  name: "Kategoriler",
  icon: "📂",
  adminRoute: "/admin/categories",
  table: categories,
  permissions: [
    { action: "categories:view", name: "Görüntüle", description: "" },
    { action: "categories:create", name: "Oluştur", description: "" },
    { action: "categories:update", name: "Güncelle", description: "" },
    { action: "categories:delete", name: "Sil", description: "" }
  ],
  schema: [
    {
      name: "name",
      label: "Kategori Adı",
      type: "text",
      translatable: true,
      required: true,
      showInList: true,
      sortable: true,
      filterConfig: {
        enabled: true,
        operator: "like"
      }
    },
    {
      name: "slug",
      translatable: true,
      label: "URL Uzantısı",
      type: "text",
      readonly: true,
      autoSlugFrom: "name",
      showInList: true
    },
  ],
};