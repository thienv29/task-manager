import { create } from 'zustand';
import type { User, Team, Task } from '@/lib/types';
import { usersAPI, teamsAPI, tasksAPI } from '@/lib/api-instant';

interface State {
  users: User[];
  teams: Team[];
  tasks: Task[];
  isModalOpen: boolean;
  editingUser: User | null;
  editingTask: Task | null;
  setUsers: (users: User[]) => void;
  setTeams: (teams: Team[]) => void;
  setTasks: (tasks: Task[]) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setEditingUser: (user: User | null) => void;
  setEditingTask: (task: Task | null) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  editUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  editTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  fetchUsers: () => Promise<void>;
  fetchTeams: () => Promise<void>;
  fetchTasks: () => Promise<void>;
}

export const useStore = create<State>((set) => ({
  users: [],
  teams: [],
  tasks: [],
  isModalOpen: false,
  editingUser: null,
  editingTask: null,
  setUsers: (users) => set({ users }),
  setTeams: (teams) => set({ teams }),
  setTasks: (tasks) => set({ tasks }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setEditingUser: (user) => set({ editingUser: user }),
  setEditingTask: (task) => set({ editingTask: task }),
  addUser: (user) =>
    set((state) => ({
      users: [
        ...state.users,
        { ...user, id: Math.random().toString(36).substring(2, 9) } as User,
      ],
      isModalOpen: false,
      editingUser: null,
    })),
  editUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
      isModalOpen: false,
      editingUser: null,
    })),
  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
      isModalOpen: false,
      editingUser: null,
    })),
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
  fetchUsers: async () => {
    const res = await usersAPI.getAll();
    set({ users: res });
  },
  fetchTeams: async () => {
    const res = await teamsAPI.getAll();
    set({ teams: res });
  },
  fetchTasks: async () => {
    const res = await tasksAPI.getAll();
    set({ tasks: res });
  }
}));