import type React from "react"
import Navbar from "@/components/partials/navbar"

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main>
            <Navbar/>
            <div className="container mx-auto py-6 px-4">{children}</div>
        </main>
    )
}


