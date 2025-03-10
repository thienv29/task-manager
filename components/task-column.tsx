import type React from "react"
import TaskCard from "@/components/task-card"
import type { Task, Column, Team, User } from "@/lib/types"

interface TaskColumnProps {
  column: Column
  tasks: Task[]
  onDragStart: (e: React.DragEvent, taskId: string) => void
  onDrop: (e: React.DragEvent, columnId: string) => void
  onEditTask: (task: Task) => void
  getTeamById: (teamId: string) => Team | undefined
  getUserById: (userId: string) => User | undefined
}

export default function TaskColumn({
  column,
  tasks,
  onDragStart,
  onDrop,
  onEditTask,
  getTeamById,
  getUserById,
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
      className={`${column.color} rounded-lg p-4 h-full min-h-[500px]`}
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
            team={getTeamById(task.teamId)}
            assignee={getUserById(task.assigneeId)}
          />
        ))}
      </div>
    </div>
  )
}

