import { db } from "@/core/db";
import { moduleTables } from "@/core/registry/db";
import type { FieldConfig } from "@/core/registry/types";
import { eq, inArray } from "drizzle-orm";

export async function resolveLookups(
  schema: FieldConfig[],
  record?: Record<string, any>
): Promise<Record<string, any[]>> {

  const relationCols = schema.filter(
    (col) => (col.type === "relation_1_n" && col.relationConfig) ||
      (col.type === "relation_n_m" && col.relationNMConfig)
  );

  if (relationCols.length === 0) return {};

  const lookupResults = await Promise.all(
    relationCols.map(async (col) => {
      const isNM = col.type === "relation_n_m";

      const targetTableStr = isNM ? col.relationNMConfig!.targetTable : col.relationConfig!.targetTable;
      const targetKey = isNM ? col.relationNMConfig!.targetKey : col.relationConfig!.targetKey;
      const displayKey = isNM ? col.relationNMConfig!.displayKey : col.relationConfig!.displayKey;

      const relTable = moduleTables[targetTableStr];
      if (!relTable) return [];

      const selectObj: Record<string, any> = {};
      selectObj[targetKey] = relTable[targetKey];
      if (targetKey !== displayKey) {
        selectObj[displayKey] = relTable[displayKey];
      }

      let results = await db.select(selectObj).from(relTable).limit(20);

      const currentValue = record?.[col.name];
      if (currentValue) {
        if (isNM && Array.isArray(currentValue) && currentValue.length > 0) {
          const missingIds = currentValue.filter(id => !results.find(r => r[targetKey] === id));
          if (missingIds.length > 0) {
            const missingRecords = await db.select(selectObj).from(relTable).where(inArray(relTable[targetKey], missingIds));
            results = [...missingRecords, ...results];
          }
        } else if (!isNM && !results.find(r => r[targetKey] === currentValue)) {
          const selectedRecord = await db.select(selectObj).from(relTable).where(eq(relTable[targetKey], currentValue)).limit(1);
          if (selectedRecord.length > 0) {
            results = [selectedRecord[0], ...results];
          }
        }
      }

      return results;
    })
  );

  const lookups: Record<string, any[]> = {};
  relationCols.forEach((col, i) => {
    lookups[col.name] = lookupResults[i];
  });

  return lookups;
}