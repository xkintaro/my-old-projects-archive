import { db } from "@/core/db";
import { getAllSystemPermissions } from "@/core/registry";
import { createRole, updateRole, deleteRole } from "./actions";

export default async function RolesDashboard() {
  const allRoles = await db.query.roles.findMany();

  const systemPermissions = getAllSystemPermissions();

  return (
    <div>
      <h1>Rol ve Yetki Yönetimi (RBAC)</h1>
      <hr />

      <div style={{ background: "#f5f5f5", padding: "15px", marginBottom: "20px" }}>
        <h3>Yeni Rol Oluştur</h3>
        <form action={createRole}>
          <div style={{ marginBottom: "10px" }}>
            <label>Rol Adı (örn: Stajyer Editör):</label><br />
            <input type="text" name="name" required style={{ width: "300px" }} />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label><strong>Modül Yetkileri:</strong></label><br />
            <div style={{ marginTop: "10px" }}>
              {systemPermissions.map((perm) => (
                <label key={perm} style={{ display: "block", cursor: "pointer" }}>
                  <input type="checkbox" name="permissions" value={perm} /> {perm} 
                </label>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: "gray", marginTop: "10px" }}>
              * Yukarıdaki yetki listesi, &quot;Module Registry&quot; üzerinden aktif modüllere göre otomatik çizilmektedir.
            </p>
          </div>

          <button type="submit">Rolü Kaydet</button>
        </form>
      </div>

      <h3>Mevcut Roller ({allRoles.length})</h3>

      {allRoles.map((role) => (
        <div key={role.id} style={{ background: "#fff", border: "1px solid #ddd", padding: "15px", marginBottom: "15px" }}>

          <form action={updateRole}>
            <input type="hidden" name="roleId" value={role.id} />

            <div style={{ marginBottom: "10px" }}>
              <label style={{ fontSize: "12px", color: "gray" }}>Rol Adı:</label><br />
              <input type="text" name="name" defaultValue={role.name} required style={{ width: "300px" }} />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ fontSize: "12px", color: "gray" }}>Yetkiler:</label>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "5px" }}>
                {systemPermissions.map((perm) => (
                  <label key={perm} style={{ fontSize: "13px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      name="permissions"
                      value={perm}
                      defaultChecked={role.permissions.includes(perm)}
                    /> {perm}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit">Güncelle</button>
            </div>
          </form>

          <form action={deleteRole} style={{ marginTop: "10px" }}>
            <input type="hidden" name="roleId" value={role.id} />
            <button
              type="submit"
              style={{ color: "red", background: "none", border: "1px solid red", padding: "5px 10px", cursor: "pointer" }}
            >
              🗑️ Bu Rolü Sil
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}