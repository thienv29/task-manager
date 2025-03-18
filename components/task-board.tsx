"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {PlusCircle} from "lucide-react"
import TaskColumn from "@/components/task-column"
import TaskModal from "@/components/task-modal"
import type {Column, Task, Team, User} from "@/lib/types"
import {tasksAPI, teamsAPI} from "@/lib/api-instant"

export default function TaskBoard() {
    const [columns, setColumns] = useState<Column[]>([
        {id: "todo", title: "To Do", color: "bg-slate-200"},
        {id: "in-progress", title: "In Progress", color: "bg-blue-200"},
        {id: "done", title: "Done", color: "bg-green-200"},
    ]);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    useEffect(() => {
        getTeams();
        getUsers();
        getTasks();
    }, [])

    const getTasks = async () => {
        const res = await tasksAPI.getAll();
        console.log(res);
        setTasks(res);
    }

    const getTeams = async () => {
        const res = await teamsAPI.getAll();
        console.log(res);
        setTeams(res);
    }

    const getUsers = async () => {
        const res = await teamsAPI.getAll();
        setUsers(res);
    }


    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDrop = (e: React.DragEvent, columnId: string) => {
        const taskId = e.dataTransfer.getData("taskId");

        setTasks(tasks.map((task) => (task.id === taskId ? {...task, columnId} : task)));
    };

    const handleAddTask = (task: Omit<Task, "id">) => {
        const newTask = {
            ...task,
            id: Math.random().toString(36).substring(2, 9),
        };

        setTasks([...tasks, newTask as Task]);
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleEditTask = (task: Task) => {
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const openEditModal = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const filteredTasks = selectedTeam ? tasks.filter((task) => task.teamId === selectedTeam) : tasks;

    const getTeamById = (teamId: string) => {
        return teams.find((team) => team.id === teamId);
    };

    const getUserById = (userId: string) => {
        return users.find((user) => user.id === userId);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Tasks</h2>
                <div className="flex gap-2">
                    <select
                        className="px-2 py-1 border rounded-md text-sm"
                        value={selectedTeam || ""}
                        onChange={(e) => setSelectedTeam(e.target.value || null)}
                    >
                        <option value="">All Teams</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
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
                        tasks={filteredTasks.filter((task) => task.columnId === column.id)}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                        onEditTask={openEditModal}
                        getTeamById={getTeamById}
                        getUserById={getUserById}
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

