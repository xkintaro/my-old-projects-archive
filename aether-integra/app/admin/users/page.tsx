import { db } from "@/core/db";

import { users, roles, userRoles } from "@/core/db/schema";

import { createNewUser, updateUserRolesAction } from "./actions";

export default async function UsersDashboard() {

  const [allUsers, allRoles, allUserRoles] = await Promise.all([
    db.select().from(users),
    db.select().from(roles),
    db.select().from(userRoles),
  ]);

  const userRolesMap = allUsers.map((user) => {
    const userRoleIds = allUserRoles
      .filter((ur) => ur.userId === user.id)
      .map((ur) => ur.roleId);
    return { ...user, roleIds: userRoleIds };
  });

  return (
    <div>

      <form action={createNewUser}>

        <div>

          <label>Ad</label><br />

          <input type="text" name="name" required />

        </div>

        <div>

          <label>Email</label><br />

          <input type="email" name="email" required />

        </div>

        <div>

          <label>Şifre</label><br />

          <input type="password" name="password" required />

        </div>

        <div>

          {allRoles.length === 0 && <span style={{ color: "red" }}>Önce sistemde rol oluşturmalısın.</span>}

          <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "5px" }}>

            {allRoles.map((role) => (

              <label key={role.id}>
                <input type="checkbox" name="roles" value={role.id} />
                {role.name}
              </label>

            ))}

          </div>

        </div>

        <button type="submit">
          Oluştur
        </button>

      </form>

      <h3>
        Sistemdeki Kullanıcılar ({userRolesMap.length})
      </h3>

      <table>

        <thead>

          <tr>

            <th>İsim</th>

            <th>Email</th>

            <th>Roller</th>

          </tr>

        </thead>

        <tbody>

          {userRolesMap.map((user) => (

            <tr key={user.id}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>

                <form action={updateUserRolesAction} style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                  <input type="hidden" name="userId" value={user.id} />

                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

                    {allRoles.map((role) => {

                      const hasRole = user.roleIds.includes(role.id);

                      return (

                        <label key={role.id} style={{ fontSize: "14px" }}>

                          <input
                            type="checkbox"
                            name="roles"
                            value={role.id}
                            defaultChecked={hasRole}
                          />

                          {role.name}

                        </label>

                      );

                    })}

                  </div>

                  <button>Güncelle</button>

                </form>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}