import type React from "react"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import type {Task, Team, User} from "@/lib/types"

interface TaskCardProps {
    task: Task
    onDragStart: (e: React.DragEvent, taskId: string) => void
    onClick: () => void
    team?: Team
    assignee?: User
}

export default function TaskCard({task, onDragStart, onClick, team, assignee}: TaskCardProps) {
    const priorityColors = {
        low: "bg-slate-100 text-slate-800",
        medium: "bg-blue-100 text-blue-800",
        high: "bg-red-100 text-red-800",
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
    }

    return (
        <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
            onClick={onClick}
        >
            <CardContent className="p-3">
                <h4 className="font-medium mb-2">{task.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{task.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary" className={priorityColors[task.priority as keyof typeof priorityColors]}>
                        {task.priority}
                    </Badge>
                    {team && (
                        <Badge variant="outline" className="border-2"
                               style={{borderColor: team.color.replace("bg-", "")}}>
                            {team.name}
                        </Badge>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex justify-between items-center">
                {assignee && (
                    <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback className="text-xs">{getInitials(assignee.name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{assignee.name}</span>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

