import { auth, signOut } from "@/core/auth/auth";

export default async function AdminDashboard() {

  const session = await auth();

  async function handleLogout() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div>

      <h1>Admin</h1>

      <hr />

      <ul>

        <li>
          {session?.user?.email}
        </li>

      </ul>

      <hr />

      <form action={handleLogout}>

        <button type="submit">
          logout
        </button>

      </form>

    </div>
  );
}