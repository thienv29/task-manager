import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {auth} from "@/auth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react"

export default async function Header() {
    const session = await auth()

    return (
        <header className="sticky flex items-center justify-center top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
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
                            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
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
                    {!session?.user && <Button asChild variant="ghost" className="hidden md:inline-flex">
                        <Link href="/login">Log in</Link>
                    </Button>}
                    {
                        session && <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={session.user?.image ?? ''}
                                            alt={session.user?.name ?? ''}
                                        />
                                        <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {session.user?.name}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {session.user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link href="/dashboard/profile">
                                            Profile
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/dashboard/settings">
                                            Settings
                                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator/>

                                    <DropdownMenuItem className='cursor-pointer text-red-500' onClick={signOut}>
                                        Log out
                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }

                    <Button asChild>
                        <Link href="#">Get Started</Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
