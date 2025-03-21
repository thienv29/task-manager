import UserMenu from "@/components/user-menu";
import Navigate from "@/components/partials/navigate";

export default function Navbar() {
    return (
        <nav className="border-b">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold mr-8">TeamTask</h1>
                        <Navigate/>
                    </div>
                    <div>
                        <UserMenu/>
                    </div>
                </div>
                <Navigate isOutSite={true}/>
            </div>
        </nav>
    )
}

