import { activeModules } from "@/core/registry";

import { auth } from "@/core/auth/auth";

import { hasPermission } from "@/core/auth/permissions";

import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

  const session = await auth();

  const permissions = session?.user?.permissions || [];

  return (

    <div style={{ display: "flex", minHeight: "100vh" }}>

      <aside style={{ width: "250px", borderRight: "1px solid #ccc", padding: "20px" }}>

        <nav>

          <ul style={{ listStyleType: "none", padding: 0 }}>

            <li>
              <Link href="/admin">
                Home
              </Link>
            </li>

            {hasPermission(permissions, "user:view") && (
              <li>
                <Link href="/admin/users">
                  Users
                </Link>
              </li>
            )}

            {hasPermission(permissions, "audit_log:view") && (
              <li>
                <Link href="/admin/logs">
                  Audit Logs
                </Link>
              </li>
            )}

            {hasPermission(permissions, "role:view") && (
              <li>
                <Link href="/admin/roles">
                  Roles
                </Link>
              </li>
            )}

            <hr />

            {activeModules.map((module) => {

              const canView = hasPermission(permissions, `${module.id}:view`);

              if (!canView) return null;

              return (
                <li key={module.id}>
                  <Link href={module.adminRoute}>
                    {module.name}
                  </Link>
                </li>
              );

            })}

          </ul>

        </nav>

      </aside>

      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>

    </div>

  );
}