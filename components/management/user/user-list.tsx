import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Team, User } from "@prisma/client";
import { UserFull } from "@/lib/types";
import useRoleStore, { UserRole } from "@/lib/stores/storeRole"; // Import store để lấy role và teamId
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface UserListProps {
    users: UserFull[];
    teams: Team[];
    onEditUser: (user: User) => void;
}

export default function UserList({ users, teams, onEditUser }: UserListProps) {
    const role = useRoleStore((state) => state.role); // Lấy vai trò từ store
    const teamId = useRoleStore((state) => state.teamid); // Lấy teamId của TEAM_LEAD từ store
    const { data: session } = useSession(); // Lấy thông tin phiên đăng nhập
    useEffect(() => {
        if (session?.user?.role) {
            useRoleStore.setState({ role: session.user.role as UserRole });
            useRoleStore.setState({ teamid: session.user.teamId }); // Cập nhật teamId từ session
        }
    }, [session]);
    
    console.log("Team ID:", teamId);

    const filteredUsers = role === "TEAM_LEAD"
    ? users.filter((user) => user.teamId === Number(teamId)) // Lọc người dùng cùng team với TEAM_LEAD
    : users; // Nếu không phải TEAM_LEAD, hiển thị tất cả người dùng
    
    console.log("Filtered users:", filteredUsers); // In ra danh sách người dùng đã lọc
    
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    };

    const getUserTeams = (user: User) => {
        return teams.filter((team) => user.teamId == team.id);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
                <Card
                    key={user.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onEditUser(user)}
                >
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h3 className="font-medium">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                <p className="text-sm">{user.role}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Teams:</p>
                            <div className="flex flex-wrap gap-2">
                                {getUserTeams(user).map((team) => (
                                    <Badge key={team.id} variant="secondary">
                                        {team.name}
                                    </Badge>
                                ))}
                                {getUserTeams(user).length === 0 && (
                                    <span className="text-sm text-muted-foreground">No teams</span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

