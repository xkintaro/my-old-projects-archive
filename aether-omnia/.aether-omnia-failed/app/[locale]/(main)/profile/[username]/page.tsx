import { notFound } from "next/navigation"
import Link from "next/link"
import { getUserByUsername } from "@/lib/actions/user"
import { auth } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Shield, Settings, LogOut, LayoutDashboard } from "lucide-react"
import { getFullRoute } from "@/lib/i18n/server-routes"

interface ProfilePageProps {
    params: Promise<{
        username: string
        locale: string
    }>
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
    const { username: rawUsername, locale } = await params

    const username = rawUsername.startsWith("@")
        ? rawUsername.slice(1)
        : rawUsername

    const user = await getUserByUsername(username)

    if (!user) {
        notFound()
    }

    const session = await auth()
    const isOwnProfile = session?.user?.username === user.username
    const hasAdminAccess = session?.user?.userType === "GOD" || session?.user?.userType === "ADMIN"

    const dashboardLink = await getFullRoute("dashboard", locale)


    const memberSince = new Intl.DateTimeFormat("tr-TR", {
        year: "numeric",
        month: "long",
    }).format(user.createdAt)

    const initials = user.name
        ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
        : user.username.slice(0, 2).toUpperCase()

    return (
        <div className="min-h-screen bg-background">
            <div className="relative h-48 bg-linear-to-br from-primary/30 via-accent/20 to-secondary/30 md:h-64">
                {user.banner && (
                    <img
                        src={user.banner}
                        alt="Banner"
                        className="h-full w-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
            </div>

            <div className="mx-auto max-w-4xl px-4">
                <div className="relative -mt-20 mb-6 flex flex-col items-center md:-mt-24 md:flex-row md:items-end md:gap-6">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-xl md:h-40 md:w-40">
                        <AvatarImage src={user.avatar ?? undefined} alt={user.username} />
                        <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary md:text-3xl">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="mt-4 flex flex-col items-center text-center md:mt-0 md:items-start md:text-left">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                                {user.name || user.username}
                            </h1>
                            {user.role.type !== "USER" && (
                                <Badge variant="secondary" className="gap-1">
                                    <Shield className="h-3 w-3" />
                                    {user.role.type} 
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground">@{user.username}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 md:ml-auto md:mt-0">
                        {isOwnProfile && (
                            <Badge variant="outline" className="gap-1">
                                <User className="h-3 w-3" />
                                Bu sizin profiliniz
                            </Badge>
                        )}
                        {isOwnProfile && (
                            <Link href="/logout">
                                <Button variant="destructive" className="w-full">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Çıkış Yap
                                </Button>
                            </Link>
                        )}
                        {isOwnProfile && hasAdminAccess && (
                            <Link href={dashboardLink}>
                                <Button variant="outline" className="w-full">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    Admin Paneline Git
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 pb-8 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <h2 className="text-lg font-semibold">Hakkında</h2>
                        </CardHeader>
                        <CardContent>
                            {user.description ? (
                                <p className="text-muted-foreground">{user.description}</p>
                            ) : (
                                <p className="italic text-muted-foreground/60">
                                    Henüz bir açıklama eklenmemiş.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-semibold">Bilgiler</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Üyelik:</span>
                                <span className="font-medium">{memberSince}</span>
                            </div>
                            {user.links.length > 0 && (
                                <div className="space-y-2">
                                    <span className="text-sm text-muted-foreground">Bağlantılar:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {user.links.map((link, i) => (
                                            <a
                                                key={i}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-primary hover:underline"
                                            >
                                                {new URL(link).hostname}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
