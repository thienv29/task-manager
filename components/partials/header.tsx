import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {auth} from "@/lib/auth";
import React from "react";
import UserMenu from "@/components/user-menu";

export default async function Header() {
    const session = await auth()

    return (
        <header
            className="sticky flex items-center justify-center top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image src="/images/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32}/>
                    <span className="text-xl font-bold">Company</span>
                </div>

                <nav className="hidden md:flex">
                    <ul className="flex items-center gap-6">
                        <li>
                            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href="#testimonials"
                                  className="text-sm font-medium transition-colors hover:text-primary">
                                Testimonials
                            </Link>
                        </li>
                        <li>
                            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="flex items-center gap-4">
                    <UserMenu/>
                    <Button asChild>
                        <Link href="/dashboard">Get Started</Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
