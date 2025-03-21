import type React from "react"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {TaskFull, TeamFull} from "@/lib/types";
import {User} from "@prisma/client";

interface TaskCardProps {
    task: TaskFull
    onDragStart: (e: React.DragEvent, taskId: number) => void
    onClick: () => void
    team?: TeamFull
    assignees?: User[]
}

export default function TaskCard({task, onDragStart, onClick, team, assignees}: TaskCardProps) {
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
                        <Badge
                            variant="outline"
                            className={`border-2 ${team.color ? team.color : ""}`}
                        >
                            {team.name}
                        </Badge>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex justify-between items-center">
                {assignees && assignees.length > 0 && (
                    <div className="flex -space-x-2">
                        {assignees.map((assignee) => (
                            <Avatar key={assignee.id} className="h-6 w-6 border-2 border-white">
                                <AvatarFallback className="text-xs">{getInitials(assignee.name)}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

