import { ModuleConfig } from "@/core/registry/types";
import { tags } from "./db/schema";

export const TagsModule: ModuleConfig = {
    id: "tags",
    name: "Etiketler",
    icon: "🏷️",
    adminRoute: "/admin/tags",
    table: tags,
    permissions: [
        { action: "tags:view", name: "Görüntüle", description: "" },
        { action: "tags:create", name: "Oluştur", description: "" },
        { action: "tags:update", name: "Güncelle", description: "" },
        { action: "tags:delete", name: "Sil", description: "" },
    ],
    schema: [
        {
            name: "name",
            label: "Etiket Adı",
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
    ],
};