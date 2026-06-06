import { signIn } from "@/core/auth/auth";
import { AuthError } from "next-auth";

export default function LoginPage() {

  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;

    const password = formData.get("password") as string;

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/admin"
      });
    } catch (error) {
      if (error instanceof AuthError) {
        console.log("NEXT-AUTH ERROR:", error.type);
      }
      throw error;
    }
  }

  return (
    <div>

      <form action={handleLogin}>

        <input type="email" name="email" defaultValue={"admin@system.com"} required />

        <input type="password" name="password" defaultValue={"123456"} required />

        <button type="submit">
          login
        </button>

      </form>

    </div>
  );
}