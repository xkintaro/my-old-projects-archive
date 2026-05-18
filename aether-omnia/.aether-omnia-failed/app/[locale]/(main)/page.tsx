"use client"

import { useT } from "@/providers/translation-provider"
import { useRoute } from "@/providers/route-provider"
import Link from "next/link"

export default function HomePage() {
  const t = useT()
  const { getLink } = useRoute()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">{t("site.home")}</h1>
      <p className="text-muted-foreground mb-8">{t("site.welcome", "Hoş geldiniz")}</p>

      <div className="flex gap-4">

        <Link
          href={getLink('login')}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
        >
          {t("auth.login")}
        </Link>

        <Link
          href={getLink('register')}
          className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition"
        >
          {t("auth.register")}
        </Link>
      </div>

      <div className="mt-8">
        <Link href={getLink('dashboard')} className="text-blue-500 hover:underline">
          Admin Paneline Git ({getLink('dashboard')})
        </Link>
      </div>
    </div>
  )
}