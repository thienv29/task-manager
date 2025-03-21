import {create} from "zustand"
import {tasksAPI} from "@/lib/api-instant"
import {TaskForm, TaskFull} from "@/lib/types"

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
        const tasks = await tasksAPI.getAll()
        set({tasks})
    },
    setEditingTask: async (task) => {
        set({editingTask: task})
    },
    addTask: async (task) => {
        await tasksAPI.create(task)
        useTaskStore.getState().fetchTasks()
    },
    editTask: async (task) => {
        await tasksAPI.update(task)
        useTaskStore.getState().fetchTasks()
    },
    deleteTask: async (taskId) => {
        await tasksAPI.delete(taskId)
        useTaskStore.getState().fetchTasks()
    }
}))