import { create } from "zustand";
import {EVENT_COLUMN, EVENT_TASK} from "@/lib/types";
import {useTaskStore} from "@/lib/stores/storeTasks";
import { useColumnStore } from "@/lib/stores/storeColumns";

interface WebSocketState {
    socket: WebSocket | null;
    connect: () => void;
    sendMessage: (message: string) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
    socket: null,

    connect: () => {
        if (get().socket) return; // Tránh tạo nhiều kết nối

        const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string);

        socket.onopen = () => {
            console.log("✅ WebSocket connected");
        };

        socket.onmessage = (event) => {
            const cleanData = event.data.split(': ').pop();  // Lấy phần sau dấu ": "

            switch (cleanData) {
                case EVENT_COLUMN.ADD_COLUMN:
                case EVENT_COLUMN.EDIT_COLUMN:
                case EVENT_COLUMN.DELETE_COLUMN:
                    useColumnStore.getState().fetchColumns();
                    break;
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
        } else {
            console.warn("⚠️ WebSocket not connected!");
        }
    },
}));