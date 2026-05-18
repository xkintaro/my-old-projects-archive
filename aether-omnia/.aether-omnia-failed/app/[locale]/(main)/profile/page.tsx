import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getFullRoute } from "@/lib/i18n/server-routes"

interface PageProps {
    params: Promise<{ locale: string }>
}

export default async function ProfilePage({ params }: PageProps) {
    const { locale } = await params

    const session = await auth()

    if (!session?.user?.username) {
        const loginUrl = await getFullRoute('login', locale)
        redirect(loginUrl)
    }

    const profileBase = await getFullRoute('profile', locale)
    redirect(`${profileBase}/${session.user.username}`)
}