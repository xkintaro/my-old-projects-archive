"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface AuthLogoProps {
    title?: string
    subtitle?: string
}

export function AuthLogo({
    title = "Aether Omnia",
    subtitle = "Yönetim Paneli"
}: AuthLogoProps) {
    return (
        <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                <motion.div
                    className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/40 to-accent/40 blur-lg"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent shadow-lg shadow-primary/25">
                    <Sparkles className="h-7 w-7 text-primary-foreground" />
                </div>
            </div>
            <h1 className="bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
                {subtitle}
            </p>
        </motion.div>
    )
}
