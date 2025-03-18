"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {PlusCircle} from "lucide-react"
import TaskColumn from "@/components/management/task/task-column"
import TaskModal from "@/components/management/task/task-modal"
import {tasksAPI, teamsAPI} from "@/lib/api-instant"
import {ColumnFull, TaskForm, TaskFull, TeamFull, UserFull} from "@/lib/types";
import {useColumnStore} from "@/lib/stores/storeColumns";
import {useUserStore} from "@/lib/stores/storeUsers";
import {useTaskStore} from "@/lib/stores/storeTasks";
import {useTeamStore} from "@/lib/stores/storeTeams";

export default function TaskBoard() {
    const {columns, fetchColumns} = useColumnStore();
    const {users, fetchUsers} = useUserStore();
    const {tasks, fetchTasks} = useTaskStore();
    const {teams, fetchTeams} = useTeamStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskForm | null>(null);

    useEffect(() => {
        fetchColumns();
        fetchUsers();
        fetchTasks();
        fetchTeams();
    }, [])


    const handleDragStart = (e: React.DragEvent, taskId: number) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDrop = (e: React.DragEvent, columnId: number) => {
        const taskId = e.dataTransfer.getData("taskId");

    };

    const handleAddTask = (task: TaskForm) => {
        const newTask = {
            ...task,
            id: Math.random().toString(36).substring(2, 9),
        };

        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleEditTask = (task: TaskForm) => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleDeleteTask = (taskId: string) => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const openEditModal = (task: TaskForm) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Tasks</h2>
                <div className="flex gap-2">
                    <Button onClick={() => setIsModalOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4"/> Add Task
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {columns.map((column) => (
                    <TaskColumn
                        key={column.id}
                        column={column}
                        tasks={tasks.filter((task) => task.columnId === column.id)}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                        onEditTask={openEditModal}
                    />
                ))}
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTask(null);
                }}
                onSave={editingTask ? handleEditTask : handleAddTask}
                onDelete={editingTask ? handleDeleteTask : undefined}
                columns={columns}
                teams={teams}
                users={users}
                task={editingTask}
            />
        </div>
    );
}

