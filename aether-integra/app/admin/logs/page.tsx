import { db } from "@/core/db";
import { auditLogs, users } from "@/core/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import Link from "next/link";

const PAGE_SIZE = 50;

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Math.max(1, parseInt(resolvedSearchParams.page || "1", 10));
  const offset = (page - 1) * PAGE_SIZE;

  const [{ count: totalCount }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(auditLogs);

  const totalPages = Math.max(1, Math.ceil(Number(totalCount) / PAGE_SIZE));

  const logs = await db.select({
    log: auditLogs,
    userEmail: users.email,
  })
    .from(auditLogs)
    .leftJoin(users, eq(auditLogs.userId, users.id))
    .orderBy(desc(auditLogs.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset);

  return (
    <div>

      <h1>Audit Logs</h1>

      <p>
        Toplam {String(totalCount)} kayıt — Sayfa {page} / {totalPages}
      </p>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>

        <thead>

          <tr style={{ background: "#333", color: "white", textAlign: "left" }}>

            <th style={{ padding: "10px" }}>Tarih</th>
            <th style={{ padding: "10px" }}>Kullanıcı</th>
            <th style={{ padding: "10px" }}>Eylem</th>
            <th style={{ padding: "10px" }}>Tablo</th>
            <th style={{ padding: "10px" }}>Detay (JSON)</th>

          </tr>

        </thead>

        <tbody>

          {logs.map(({ log, userEmail }) => (

            <tr key={log.id} style={{ borderBottom: "1px solid #ddd" }}>

              <td style={{ padding: "10px" }}>{log.createdAt.toLocaleString("tr-TR")}</td>
              <td style={{ padding: "10px" }}>{userEmail}</td>
              <td style={{ padding: "10px", fontWeight: "bold" }}>{log.action}</td>
              <td style={{ padding: "10px" }}>{log.entityType}</td>
              <td style={{ padding: "10px" }}>
                <pre style={{ fontSize: "11px", background: "#f4f4f4", padding: "5px" }}>
                  {JSON.stringify(log.newValues, null, 2)}
                </pre>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        {page > 1 && (
          <Link href={`/admin/logs?page=${page - 1}`}>
            ← Önceki
          </Link>
        )}
        <span>Sayfa {page} / {totalPages}</span>
        {page < totalPages && (
          <Link href={`/admin/logs?page=${page + 1}`}>
            Sonraki →
          </Link>
        )}
      </div>

    </div>

  );

}