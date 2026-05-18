import { APP_DESCRIPTION, APP_NAME } from "@/constants";
import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/providers/theme-provider"
import { SessionProvider } from "@/providers/session-provider"
import { fontSans, fontMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemePalette } from "@/components/shared/theme-palette";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
        fontMono.variable
      )}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="fixed top-5 right-5 flex items-center gap-2 z-999">
              <ThemeToggle />
              <ThemePalette />
            </div>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}