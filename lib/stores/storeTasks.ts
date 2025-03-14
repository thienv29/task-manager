import { create } from 'zustand';
import type { Task } from '@/lib/types';
import { tasksAPI } from '@/lib/api-instant';

interface TaskState {
  tasks: Task[];
  isModalOpen: boolean;
  editingTask: Task | null;
  setTasks: (tasks: Task[]) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setEditingTask: (task: Task | null) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  editTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  fetchTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isModalOpen: false,
  editingTask: null,
  setTasks: (tasks) => set({ tasks }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setEditingTask: (task) => set({ editingTask: task }),
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { ...task, id: Math.random().toString(36).substring(2, 9) } as Task,
      ],
      isModalOpen: false,
      editingTask: null,
    })),
  editTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
      isModalOpen: false,
      editingTask: null,
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
      isModalOpen: false,
      editingTask: null,
    })),
  fetchTasks: async () => {
    const res = await tasksAPI.getAll();
    set({ tasks: res });
  },
}));