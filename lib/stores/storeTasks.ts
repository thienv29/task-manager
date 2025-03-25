import {create} from "zustand"
import {tasksAPI} from "@/lib/api-instant"
import {EVENT_TASK, TaskForm, TaskFull} from "@/lib/types"
import {useWebSocketStore} from "@/lib/stores/storeWebsocket";

interface TaskStore {
    tasks: TaskFull[]
    editingTask: TaskForm | null

    fetchTasks: () => void
    setEditingTask: (task: TaskForm | null) => void
    addTask: (task: TaskForm) => Promise<void>
    editTask: (task: TaskForm) => Promise<void>
    deleteTask: (taskId: number) => Promise<void>
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    editingTask: null,

    fetchTasks: async () => {
        console.log('fetch task')
        const tasks = await tasksAPI.getAll()
        set({tasks})
    },
    setEditingTask: async (task) => {
        set({editingTask: task})
    },
    addTask: async (task) => {
        await tasksAPI.create(task)
        useWebSocketStore.getState().sendMessage(EVENT_TASK.ADD_TASK)
        useTaskStore.getState().fetchTasks()
    },
    editTask: async (task) => {
        await tasksAPI.update(task)
        useWebSocketStore.getState().sendMessage(EVENT_TASK.EDIT_TASK)
        useTaskStore.getState().fetchTasks()
    },
    deleteTask: async (taskId) => {
        await tasksAPI.delete(taskId)
        useWebSocketStore.getState().sendMessage(EVENT_TASK.DELETE_TASK)
        useTaskStore.getState().fetchTasks()
    }
}))