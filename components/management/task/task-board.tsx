"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {PlusCircle} from "lucide-react"
import TaskColumn from "@/components/management/task/task-column"
import TaskModal from "@/components/management/task/task-modal"
import {TaskForm} from "@/lib/types";
import {useColumnStore} from "@/lib/stores/storeColumns";
import {useUserStore} from "@/lib/stores/storeUsers";
import {useTaskStore} from "@/lib/stores/storeTasks";
import {useTeamStore} from "@/lib/stores/storeTeams";

export default function TaskBoard() {
    const {columns, fetchColumns} = useColumnStore();
    const {users, fetchUsers} = useUserStore();
    const {
        tasks,
        editingTask,
        setEditingTask,
        fetchTasks,
        addTask,
        editTask,
        deleteTask,
    } = useTaskStore();
    const {teams, fetchTeams} = useTeamStore();

    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        fetchColumns();
        fetchUsers();
        fetchTasks();
        fetchTeams();
    }, []);

    const handleDragStart = (e: React.DragEvent, taskId: number) => {
        e.dataTransfer.setData("taskId", taskId.toString());
        setEditingTask(tasks.find(t => t.id == taskId))
    };

    const handleDrop =async (e: React.DragEvent, columnId: number) => {
        const taskId = Number(e.dataTransfer.getData("taskId"));
        console.log(columnId, taskId, editingTask);
        await editTask({...editingTask, columnId})
        setEditingTask(null)
    };

    const handleAddTask = async (task: TaskForm) => {
        await addTask(task);
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleEditTask = async (task: TaskForm) => {
        await editTask(task);
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleDeleteTask = async (taskId: number) => {
        await deleteTask(taskId);
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

