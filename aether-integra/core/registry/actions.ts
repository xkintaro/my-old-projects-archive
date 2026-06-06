"use server";

import { db } from "@/core/db";
import { auditLogs } from "@/core/db/schema";
import { moduleTables } from "@/core/registry/db";
import { activeModules } from "@/core/registry";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, checkPermission } from "@/core/auth/auth";
import { eq, ilike, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { buildDataFromForm, validateRequiredI18nFields } from "./form-utils";

function resolveModule(moduleId: string) {
    const activeModule = activeModules.find((m) => m.id === moduleId);
    const targetTable = moduleTables[moduleId];

    if (!activeModule || !targetTable) {
        throw new Error(`Modül veya tablo bulunamadı: '${moduleId}'`);
    }

    return { activeModule, targetTable };
}

export async function saveColumnPreferences(moduleId: string, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Giriş reddedildi.");

    const selectedCols = formData.getAll("cols") as string[];
    const cookieStore = await cookies();

    cookieStore.set(`prefs_cols_${moduleId}`, JSON.stringify(selectedCols), {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
    });

    revalidatePath(`/admin/${moduleId}`);
}

export async function createDynamicRecord(moduleId: string, formData: FormData) {
    const userId = await checkPermission(`${moduleId}:create`);
    const { activeModule, targetTable } = resolveModule(moduleId);

    const { data: insertData, nmData } = buildDataFromForm(activeModule.schema, formData);

    insertData.createdBy = userId;

    validateRequiredI18nFields(activeModule.schema, insertData);

    await db.transaction(async (tx) => {
        const insertedRecords = await tx.insert(targetTable).values(insertData).returning() as any[];
        const newRecord = insertedRecords[0];

        for (const col of activeModule.schema) {
            if (col.type === "relation_n_m" && col.relationNMConfig) {
                const targetIds = nmData[col.name] || [];
                if (targetIds.length === 0) continue;

                const junctionTable = moduleTables[col.relationNMConfig.junctionTable];
                if (!junctionTable) continue;

                const mappings = targetIds.map((targetId) => ({
                    [col.relationNMConfig!.sourceColumn]: newRecord.id,
                    [col.relationNMConfig!.targetColumn]: targetId,
                }));

                await tx.insert(junctionTable).values(mappings);
            }
        }

        await tx.insert(auditLogs).values({
            userId: userId,
            action: `${moduleId}:create`,
            entityType: moduleId,
            entityId: newRecord.id,
            newValues: { ...insertData, relations: nmData },
        });
    });

    revalidatePath(`/admin/${moduleId}`);
    redirect(`/admin/${moduleId}`);
}

export async function updateDynamicRecord(moduleId: string, formData: FormData) {
    const userId = await checkPermission(`${moduleId}:update`);

    const recordId = formData.get("id") as string;
    if (!recordId) throw new Error("Güncellenecek kaydın ID'si bulunamadı.");

    const { activeModule, targetTable } = resolveModule(moduleId);
    const { data: updateData, nmData } = buildDataFromForm(activeModule.schema, formData);

    updateData.updatedAt = new Date();

    updateData.updatedBy = userId;

    validateRequiredI18nFields(activeModule.schema, updateData);

    await db.transaction(async (tx) => {
        const [oldRecord] = await tx.select().from(targetTable).where(eq(targetTable.id, recordId));

        await tx.update(targetTable).set(updateData).where(eq(targetTable.id, recordId));

        for (const col of activeModule.schema) {
            if (col.type === "relation_n_m" && col.relationNMConfig) {
                const junctionTable = moduleTables[col.relationNMConfig.junctionTable];
                if (!junctionTable) continue;

                await tx.delete(junctionTable).where(eq(junctionTable[col.relationNMConfig.sourceColumn], recordId));

                const targetIds = nmData[col.name] || [];
                if (targetIds.length > 0) {
                    const mappings = targetIds.map((targetId) => ({
                        [col.relationNMConfig!.sourceColumn]: recordId,
                        [col.relationNMConfig!.targetColumn]: targetId,
                    }));
                    await tx.insert(junctionTable).values(mappings);
                }
            }
        }

        await tx.insert(auditLogs).values({
            userId: userId,
            action: `${moduleId}:update`,
            entityType: moduleId,
            entityId: recordId,
            oldValues: oldRecord || null,
            newValues: { ...updateData, relations: nmData },
        });
    });

    revalidatePath(`/admin/${moduleId}`);
    redirect(`/admin/${moduleId}`);
}

export async function deleteDynamicRecord(moduleId: string, formData: FormData) {
    const userId = await checkPermission(`${moduleId}:delete`);

    const recordId = formData.get("id") as string;
    if (!recordId) throw new Error("Silinecek kaydın ID'si bulunamadı.");

    const { targetTable } = resolveModule(moduleId);

    await db.transaction(async (tx) => {
        const [oldRecord] = await tx.select().from(targetTable).where(eq(targetTable.id, recordId));

        await tx.delete(targetTable).where(eq(targetTable.id, recordId));

        await tx.insert(auditLogs).values({
            userId: userId,
            action: `${moduleId}:delete`,
            entityType: moduleId,
            entityId: recordId,
            oldValues: oldRecord || null,
        });
    });

    revalidatePath(`/admin/${moduleId}`);
}

export async function searchRelationData(targetTableStr: string, targetKey: string, displayKey: string, query: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Yetkisiz işlem.");

    const relTable = moduleTables[targetTableStr];
    if (!relTable) return [];

    const safeQuery = query.replace(/[%_\\]/g, "\\$&");

    const selectObj: Record<string, any> = {
        [targetKey]: relTable[targetKey]
    };

    if (targetKey !== displayKey) {
        selectObj[displayKey] = relTable[displayKey];
    }

    return await db
        .select(selectObj)
        .from(relTable)
        .where(
            query
                ? ilike(sql`CAST(${relTable[displayKey]} AS TEXT)`, `%${safeQuery}%`)
                : undefined
        )
        .limit(20);
}