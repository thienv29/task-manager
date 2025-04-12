"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {PlusCircle} from "lucide-react"
import TaskColumn from "@/components/management/task/task-column"
import TaskModal from "@/components/management/task/task-modal"
import {ColumnForm, TaskForm} from "@/lib/types";
import {useColumnStore} from "@/lib/stores/storeColumns";
import {useUserStore} from "@/lib/stores/storeUsers";
import {useTaskStore} from "@/lib/stores/storeTasks";
import {useTeamStore} from "@/lib/stores/storeTeams";
import ColumnModal from "@/components/management/column/column-modal"
import useRoleStore, { UserRole } from "@/lib/stores/storeRole"
import { useSession } from "next-auth/react"


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

    const {
        setEditingColumn,
        editingColumn,
        addColumn,
        editColumn,
        deleteColumn,
    } = useColumnStore();

    const {teams, fetchTeams} = useTeamStore();
    const role = useRoleStore((state) => state.role);
    const { data: session } = useSession(); // Lấy thông tin phiên đăng nhập
    useEffect(() => {
        if (session?.user?.role) {
            useRoleStore.setState({ role: session.user.role as UserRole });
        }
    }, [session]);



    const [isModalOpen, setIsTaskModalOpen] = useState(false);

    const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

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
        await editTask({...editingTask, columnId})
        setEditingTask(null)
    };

    const handleAddTask = async (task: TaskForm) => {
        await addTask(task);
        setIsTaskModalOpen(false);
        setEditingTask(null);
    };

    const handleEditTask = async (task: TaskForm) => {
        await editTask(task);
        setIsTaskModalOpen(false);
        setEditingTask(null);
    };

    const handleDeleteTask = async (taskId: number) => {
        await deleteTask(taskId);
        setIsTaskModalOpen(false);
        setEditingTask(null);
    };
    const handleAddColumn = async (column: ColumnForm) => {
        await addColumn(column);
        setIsColumnModalOpen(false);
        setEditingColumn(null);
    };

    const handleEditColumn = async (column: ColumnForm) => {
        await editColumn(column);
        setIsColumnModalOpen(false);
        setEditingColumn(null);
    };

    const handleDeleteColumn = async (columnId: number) => {
        await deleteColumn(columnId);
        setIsColumnModalOpen(false);
        setEditingColumn(null);
    };

    const openEditModal = (task: TaskForm) => {
        setEditingTask(task);
        setIsTaskModalOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Tasks</h2>
                <div className="flex gap-2">
                    { (role === "TEAM_LEAD" || role === "ADMIN") && (
                        <Button onClick={() => setIsTaskModalOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4"/> Add Task
                        </Button>
                    )}
                    { role === "ADMIN" && (
                        <Button onClick={() => setIsColumnModalOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4"/> Add Column
                        </Button>
                    )}
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
                        onEditColumn={(column) => {
                            setEditingColumn(column);
                            setIsColumnModalOpen(true);
                        }}
                    />
                ))}
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsTaskModalOpen(false);
                    setEditingTask(null);
                }}
                onSave={editingTask ? handleEditTask : handleAddTask}
                onDelete={editingTask ? handleDeleteTask : undefined}
                columns={columns}
                teams={teams}
                users={users}
                task={editingTask}
            />
            <ColumnModal
                isOpen={isColumnModalOpen}
                onClose={() => {
                    setIsColumnModalOpen(false)
                    setEditingColumn(null)
                } }
                onSave={editingColumn ? handleEditColumn : handleAddColumn}
                onDelete={editingColumn ? handleDeleteColumn : undefined} column={editingColumn}            />

        </div>
    );
}

