import type React from "react"
import TaskCard from "@/components/management/task/task-card"
import type {ColumnFull, TaskFull} from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import useRoleStore, { UserRole } from "@/lib/stores/storeRole"
import { useEffect } from "react"
import { useSession } from "next-auth/react";



interface TaskColumnProps {
    column: ColumnFull
    tasks: TaskFull[]
    onDragStart: (e: React.DragEvent, taskId: number) => void
    onDrop: (e: React.DragEvent, columnId: number) => void
    onEditTask: (task: TaskFull) => void
    onEditColumn: (column: ColumnFull) => void
}
export default function TaskColumn({
        column,
        tasks,
        onDragStart,
        onDrop,
        onEditTask,
        onEditColumn,
    }: TaskColumnProps) {
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

     const role = useRoleStore((state) => state.role);
     const { data: session } = useSession(); // Lấy thông tin phiên đăng nhập
     useEffect(() => {
         if (session?.user?.role) {
             useRoleStore.setState({ role: session.user.role as UserRole });
         }
     }, [session]);

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
            <h3 className="font-medium text-lg mb-3 flex items-center justify-between">
                <span>{column.title} ({tasks.length})</span>
                { role === "ADMIN" && ( // Chỉ hiển thị nút nếu người dùng là ADMIN
                    <Button variant="ghost" size="icon" onClick={() => onEditColumn(column)}>
                        <Pencil className="w-5 h-5" />
                    </Button>
                )}  
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


