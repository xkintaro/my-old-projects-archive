import { ModuleConfig } from "@/core/registry/types";
import { products, productToTags } from "./db/schema";

export const ProductsModule: ModuleConfig = {
  id: "products",
  name: "Ürünler",
  icon: "📦",
  adminRoute: "/admin/products",
  table: products,
  auxiliaryTables: { "product_tags": productToTags },
  defaultSort: { column: "createdAt", direction: "desc" },
  permissions: [
    { action: "products:view", name: "Görüntüle", description: "" },
    { action: "products:create", name: "Oluştur", description: "" },
    { action: "products:update", name: "Güncelle", description: "" },
    { action: "products:delete", name: "Sil", description: "" }
  ],
  schema: [
    {
      name: "title",
      label: "Ürün Başlığı",
      type: "text",
      translatable: true,
      required: true,
      showInList: true,
      sortable: true,
      filterConfig: { enabled: true, operator: "like" }
    },
    {
      name: "slug",
      label: "URL",
      type: "text",
      readonly: true,
      autoSlugFrom: "title",
      showInList: true,
      translatable: true
    },
    {
      name: "summary",
      label: "Kısa Açıklama",
      type: "textarea",
      translatable: true
    },
    {
      name: "description",
      label: "Detaylı İçerik",
      type: "richtext",
      translatable: true
    },
    {
      name: "price",
      label: "Fiyat",
      type: "number",
      showInList: true,
      sortable: true,
      filterConfig: { enabled: true, operator: "gt" }
    },
    {
      name: "stock",
      label: "Stok Adedi",
      type: "number",
      showInList: true
    },
    {
      name: "isFeatured",
      label: "Öne Çıkar",
      type: "boolean",
      defaultValue: false,
      filterConfig: { enabled: true, operator: "eq" }
    },
    {
      name: "releaseDate",
      label: "Yayın Tarihi",
      type: "date"
    },
    {
      name: "saleEndTime",
      label: "İndirim Bitiş",
      type: "datetime"
    },
    {
      name: "brandColor",
      label: "Marka Rengi",
      type: "color",
      defaultValue: "#3b82f6"
    },
    {
      name: "specs",
      label: "Teknik Özellikler",
      type: "key_value",
      translatable: true,
      description: "Örn: RAM - 16GB"
    },
    {
      name: "status",
      label: "Durum",
      type: "select",
      options: [
        { label: "Taslak", value: "draft" },
        { label: "Yayında", value: "published" },
        { label: "Arşivlendi", value: "archived" }
      ],
      defaultValue: "draft",
      filterConfig: { enabled: true, operator: "eq" }
    },
    {
      name: "features",
      label: "Ekstralar",
      type: "multiselect",
      options: [
        { label: "Hızlı Teslimat", value: "fast_delivery" },
        { label: "Hediye Paketi", value: "gift_wrap" },
        { label: "Garanti Uzatma", value: "warranty" }
      ]
    },
    {
      name: "categoryId",
      label: "Kategori",
      type: "relation_1_n",
      relationConfig: {
        targetTable: "categories",
        targetKey: "id",
        displayKey: "name"
      },
      filterConfig: {
        enabled: true, operator: "eq", source: "categories"
      }
    },
    {
      name: "tags",
      label: "Etiketler",
      type: "relation_n_m",
      relationNMConfig: {
        junctionTable: "product_tags",
        targetTable: "tags",
        targetKey: "id",
        sourceColumn: "productId",
        targetColumn: "tagId",
        displayKey: "name"
      }
    }
  ],
};