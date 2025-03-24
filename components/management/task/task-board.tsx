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
    const [socket, setSocket] = useState<WebSocket | null>(null); // Khai báo biến socket và setSocket

    useEffect(() => {
        fetchColumns();
        fetchUsers();
        fetchTasks();
        fetchTeams();
        const ws = setupWebSocket(); // Thiết lập kết nối WebSocket
        setSocket(ws);

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    const setupWebSocket = (): WebSocket => {
        // Thiết lập kết nối WebSocket
        const socket = new WebSocket("ws://localhost:8080");

        socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        socket.onmessage = async (event) => {
            let message;
            if (event.data instanceof Blob) {
                // Chuyển đổi Blob thành chuỗi
                const text = await event.data.text();
                message = JSON.parse(text);
            } else {
                message = JSON.parse(event.data);
            }
            console.log("Received message:", message);
            if (message.type === "TASK_UPDATED") {
                await fetchTasks(); // Lấy lại danh sách tasks để cập nhật state
                console.log("Tasks updated");
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = (event) => {
            console.log("WebSocket connection closed:", event);
        };

        return socket;
    }

    const handleDragStart = (e: React.DragEvent, taskId: number) => {
        e.dataTransfer.setData("taskId", taskId.toString());
    };

    const handleDrop = (e: React.DragEvent, columnId: number) => {
        const taskId = e.dataTransfer.getData("taskId");
        // Xử lý logic khi thả task vào cột
    };

    const handleAddTask = async (task: TaskForm) => {
        await addTask(task);
        setIsModalOpen(false);
        setEditingTask(null);
        if (socket) {
            socket.send(JSON.stringify({ type: "TASK_UPDATED" }));
        }
    };

    const handleEditTask = (task: TaskForm) => {
        editTask(task);
        setIsModalOpen(false);
        setEditingTask(null);
        if (socket) {
            console.log("Sending message to server");
            socket.send(JSON.stringify({ type: "TASK_UPDATED" }));
        }
    };

    const handleDeleteTask = (taskId: number) => {
        deleteTask(taskId);
        setIsModalOpen(false);
        setEditingTask(null);
        if (socket) {
            socket.send(JSON.stringify({ type: "TASK_UPDATED" }));
        }
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

