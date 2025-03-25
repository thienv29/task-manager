import { create } from "zustand";
import {EVENT_TASK} from "@/lib/types";
import {useTaskStore} from "@/lib/stores/storeTasks";

interface WebSocketState {
    socket: WebSocket | null;
    connect: () => void;
    sendMessage: (message: string) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
    socket: null,

    connect: () => {
        if (get().socket) return; // Tránh tạo nhiều kết nối

        const socket = new WebSocket("ws://localhost:8080");

        socket.onopen = () => {
            console.log("✅ WebSocket connected");
        };

        socket.onmessage = (event) => {
            console.log("📩 Received:", event.data);
            const cleanData = event.data.split(': ').pop();  // Lấy phần sau dấu ": "

            switch (cleanData) {
                case EVENT_TASK.ADD_TASK:
                case EVENT_TASK.EDIT_TASK:
                case EVENT_TASK.DELETE_TASK:
                    useTaskStore.getState().fetchTasks();
                    break;
            }
        };

        socket.onerror = (error) => {
            console.error("⚠️ WebSocket error:", error);
        };

        socket.onclose = () => {
            console.warn("🔴 WebSocket disconnected, retrying in 3s...");
            setTimeout(() => get().connect(), 3000);
        };

        set({ socket });
    },

    sendMessage: (message: string) => {
        const socket = get().socket;
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
            console.log("📤 Sent:", message);
        } else {
            console.warn("⚠️ WebSocket not connected!");
        }
    },
}));