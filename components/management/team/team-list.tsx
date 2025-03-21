import {Card, CardContent} from "@/components/ui/card"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {User} from "@prisma/client"
import {TeamFull} from "@/lib/types"

interface TeamListProps {
    teams: TeamFull[]
    users: User[]
    onEditTeam: (team: TeamFull) => void
}

export default function TeamList({teams, onEditTeam}: TeamListProps) {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams.map((team) => (
                <Card
                    key={team.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onEditTeam(team)}
                >
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-4 mb-4">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${team.color}`}>
                                {getInitials(team.name)}
                            </div>
                            <div>
                                <h3 className="font-medium text-lg">{team.name}</h3>
                                <p className="text-sm text-muted-foreground">{team.description}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium mb-2">Members ({team.users.length}):</p>
                            <div className="flex -space-x-2 overflow-hidden">
                                {team.users.map((user) => (
                                    <Avatar key={user.id} className="border-2 border-background">
                                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                    </Avatar>
                                ))}
                                {team.users.length === 0 &&
                                    <span className="text-sm text-muted-foreground">No members</span>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

