import {create} from "zustand"
import {tasksAPI} from "@/lib/api-instant"
import {TaskForm, TaskFull} from "@/lib/types"

interface TaskStore {
    tasks: TaskFull[]
    isModalAddOrUpdateOpen: boolean
    editingTask: TaskForm | null

    fetchTasks: () => Promise<void>
    setModalOpen: (isOpen: boolean) => void
    setEditingTask: (task: TaskForm | null) => void

    addTask: (task: TaskForm) => Promise<void>
    editTask: (task: TaskForm) => Promise<void>
    deleteTask: (taskId: number) => Promise<void>
    showModalAddOrUpdate: () => void
    hideModalAddOrUpdate: () => void
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    isModalAddOrUpdateOpen: false,
    editingTask: null,

    fetchTasks: async () => {
        const tasks = await tasksAPI.getAll()
        set({tasks})
    },
    setModalOpen: (isOpen) => set({isModalAddOrUpdateOpen: isOpen}),
    setEditingTask: async (task) => {
        set({editingTask: task})
        await useTaskStore.getState().showModalAddOrUpdate();
    },
    showModalAddOrUpdate: () => set({isModalAddOrUpdateOpen: true}),
    hideModalAddOrUpdate: () => set({isModalAddOrUpdateOpen: false}),

    addTask: async (task) => {
        await tasksAPI.create(task)
        await useTaskStore.getState().fetchTasks()
        await useTaskStore.getState().hideModalAddOrUpdate();
    },
    editTask: async (task) => {
        await tasksAPI.update(task)
        await useTaskStore.getState().fetchTasks()
        await useTaskStore.getState().hideModalAddOrUpdate();
    },
    deleteTask: async (taskId) => {
        await tasksAPI.delete(taskId)
        await useTaskStore.getState().fetchTasks()
        await useTaskStore.getState().hideModalAddOrUpdate();
    }
}))