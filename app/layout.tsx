import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import './globals.css'
import {ThemeProvider} from "@/components/providers/theme-provider";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Team Task Management",
    description: "Manage tasks, users, and teams efficiently",
    generator: 'v0.dev'
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
        </ThemeProvider>
        </body>
        </html>
    )
}


