"use server";

import { db } from "@/core/db";
import { roles, auditLogs, userRoles } from "@/core/db/schema";
import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { checkPermission } from "@/core/auth/auth";
import { getAllSystemPermissions } from "@/core/registry";

export async function createRole(formData: FormData) {
  const adminId = await checkPermission("role:create");

  const name = formData.get("name") as string;
  const rawPermissions = formData.getAll("permissions") as string[];

  if (!name) return;

  const validSystemPermissions = getAllSystemPermissions();
  const safePermissions = rawPermissions.filter(perm => validSystemPermissions.includes(perm));

  await db.transaction(async (tx) => {
    const [newRole] = await tx.insert(roles).values({
      name: name,
      permissions: safePermissions,
    }).returning();

    await tx.insert(auditLogs).values({
      userId: adminId,
      action: "role:create",
      entityType: "roles",
      entityId: newRole.id,
      newValues: { name, permissions: safePermissions },
    });
  });

  revalidatePath("/admin/roles");
}

export async function updateRole(formData: FormData) {
  const adminId = await checkPermission("role:update");

  const roleId = formData.get("roleId") as string;
  const name = formData.get("name") as string;
  const rawPermissions = formData.getAll("permissions") as string[];

  if (!roleId || !name) return;

  const validSystemPermissions = getAllSystemPermissions();
  const safePermissions = rawPermissions.filter(perm => validSystemPermissions.includes(perm));

  await db.transaction(async (tx) => {
    const [oldRole] = await tx.select().from(roles).where(eq(roles.id, roleId));

    await tx.update(roles).set({
      name: name,
      permissions: safePermissions,
    }).where(eq(roles.id, roleId));

    await tx.insert(auditLogs).values({
      userId: adminId,
      action: "role:update",
      entityType: "roles",
      entityId: roleId,
      oldValues: oldRole || null,
      newValues: { name, permissions: safePermissions },
    });
  });

  revalidatePath("/admin/roles");
}

export async function deleteRole(formData: FormData) {
  const adminId = await checkPermission("role:delete");

  const roleId = formData.get("roleId") as string;
  if (!roleId) return;

  const [{ count }] = await db.select({ count: sql<number>`count(*)` })
    .from(userRoles)
    .where(eq(userRoles.roleId, roleId));

  if (Number(count) > 0) {
    throw new Error(
      `Bu role atanmış ${count} kullanıcı var. Silmeden önce kullanıcıların rollerini değiştirin.`
    );
  }

  await db.transaction(async (tx) => {
    const [oldRole] = await tx.select().from(roles).where(eq(roles.id, roleId));

    await tx.delete(roles).where(eq(roles.id, roleId));

    await tx.insert(auditLogs).values({
      userId: adminId,
      action: "role:delete",
      entityType: "roles",
      entityId: roleId,
      oldValues: oldRole || null,
    });
  });

  revalidatePath("/admin/roles");
}