export interface PermissionDefinition {
  action: string;
  name: string;
  description: string;
}

export const corePermissions: PermissionDefinition[] = [
  { action: "user:view", name: "Kullanıcıları Görüntüleme", description: "Kullanıcıları görüntüleyebilir" },
  { action: "user:create", name: "Kullanıcı Oluşturma", description: "Yeni kullanıcı oluşturabilir" },
  { action: "user:update", name: "Kullanıcı Düzenleme", description: "Kullanıcı rollerini güncelleyebilir" },

  { action: "role:view", name: "Rolleri Görüntüleme", description: "Rolleri görüntüleyebilir" },
  { action: "role:create", name: "Rol Oluşturma", description: "Yeni rol oluşturabilir" },
  { action: "role:update", name: "Rol Düzenleme", description: "Rolleri güncelleyebilir" },
  { action: "role:delete", name: "Rol Silme", description: "Rolleri silebilir" },

  { action: "audit_log:view", name: "Sistem Loglarını Görüntüleme", description: "Sistem loglarını görüntüleyebilir" },
];

export const coreRoutePermissions: Record<string, string> = {
  "/admin/users": "user:view",
  "/admin/roles": "role:view",
  "/admin/logs": "audit_log:view",
};

export function hasPermission(permissions: string[], required: string): boolean {
  return permissions.includes("*") || permissions.includes(required);
}

