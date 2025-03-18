import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Team, User} from "@prisma/client";
import {UserFull} from "@/lib/types";

interface UserListProps {
    users: UserFull[]
    teams: Team[]
    onEditUser: (user: User) => void
}

export default function UserList({users, teams, onEditUser}: UserListProps) {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
    }

    const getUserTeams = (user: User) => {
        return teams.filter((team) => user.teamId == team.id)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
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
                                {getUserTeams(user).length === 0 &&
                                    <span className="text-sm text-muted-foreground">No teams</span>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

