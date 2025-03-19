'use client'
import Link from "next/link"
import {usePathname} from "next/navigation"
import {Briefcase, CheckSquare, Users} from "lucide-react"

export default function Navigate({isOutSite = false}) {
    const pathname = usePathname()

    const navItems = [
        {href: "/dashboard", label: "Tasks", icon: CheckSquare},
        {href: "/dashboard/users", label: "Users", icon: Users},
        {href: "/dashboard/teams", label: "Teams", icon: Briefcase},
    ]
    if (!isOutSite) {
        return (
            <div className="hidden md:flex space-x-4">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                            <Icon className="h-4 w-4 mr-2"/>
                            {item.label}
                        </Link>
                    )
                })}
            </div>
        )
    }

    return (

        <div className="md:hidden flex overflow-x-auto py-2 space-x-4">
            {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                            isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    >
                        <Icon className="h-4 w-4 mr-2"/>
                        {item.label}
                    </Link>
                )
            })}
        </div>

    )
}

