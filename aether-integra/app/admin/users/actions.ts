"use server";

import { db } from "@/core/db";

import { users, userRoles, auditLogs } from "@/core/db/schema";

import { revalidatePath } from "next/cache";

import bcrypt from "bcryptjs";

import { eq } from "drizzle-orm";

import { checkPermission } from "@/core/auth/auth";

export async function createNewUser(formData: FormData) {

  const adminId = await checkPermission("user:create");

  const name = formData.get("name") as string;

  const email = formData.get("email") as string;

  const password = formData.get("password") as string;

  const roleIds = formData.getAll("roles") as string[];

  if (!name || !email || !password) throw new Error("Tüm alanlar zorunludur.");

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.transaction(async (tx) => {

    const [newUser] = await tx.insert(users).values({
      name,
      email,
      password: hashedPassword,
    }).returning();

    if (roleIds.length > 0) {
      const userRoleMappings = roleIds.map((roleId) => ({
        userId: newUser.id,
        roleId: roleId,
      }));
      await tx.insert(userRoles).values(userRoleMappings);
    }

    await tx.insert(auditLogs).values({
      userId: adminId,
      action: "user:create",
      entityType: "users",
      entityId: newUser.id,
      newValues: { email, roles: roleIds },
    });

  });

  revalidatePath("/admin/users");
}

export async function updateUserRolesAction(formData: FormData) {

  const adminId = await checkPermission("user:update");

  const targetUserId = formData.get("userId") as string;

  const roleIds = formData.getAll("roles") as string[];

  if (!targetUserId) return;

  await db.transaction(async (tx) => {

    await tx.delete(userRoles).where(eq(userRoles.userId, targetUserId));

    if (roleIds.length > 0) {
      const userRoleMappings = roleIds.map((roleId) => ({
        userId: targetUserId,
        roleId: roleId,
      }));
      await tx.insert(userRoles).values(userRoleMappings);
    }

    await tx.insert(auditLogs).values({
      userId: adminId,
      action: "user:update_roles",
      entityType: "user_roles",
      entityId: targetUserId,
      newValues: { updatedRoles: roleIds },
    });

  });

  revalidatePath("/admin/users");
}