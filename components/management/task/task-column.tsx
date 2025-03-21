import type React from "react"
import TaskCard from "@/components/management/task/task-card"
import type {ColumnFull, TaskFull} from "@/lib/types"

interface TaskColumnProps {
    column: ColumnFull
    tasks: TaskFull[]
    onDragStart: (e: React.DragEvent, taskId: number) => void
    onDrop: (e: React.DragEvent, columnId: number) => void
    onEditTask: (task: TaskFull) => void
}

export default function TaskColumn({
                                       column,
                                       tasks,
                                       onDragStart,
                                       onDrop,
                                       onEditTask,
                                   }: TaskColumnProps) {
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        onDrop(e, column.id)
    }

    return (
        <div
            className={` rounded-lg p-4 h-full min-h-[500px]`}
            style={{backgroundColor: column.color}}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <h3 className="font-medium text-lg mb-3">
                {column.title} ({tasks.length})
            </h3>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDragStart={onDragStart}
                        onClick={() => onEditTask(task)}
                        assignees={task.assignees}
                    />
                ))}
            </div>
        </div>
    )
}

