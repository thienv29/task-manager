"use client"
import React, {useEffect} from "react"
import Navbar from "@/components/partials/navbar"
import {useWebSocketStore} from "@/lib/stores/storeWebsocket";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {

    const connect = useWebSocketStore((state) => state.connect);

    useEffect(() => {
        connect(); // Kết nối WebSocket khi app chạy
    }, [connect]);

    return (
        <main>
            <Navbar/>
            <div className="container mx-auto py-6 px-4">{children}</div>
        </main>
    )
}


