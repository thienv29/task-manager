import { create } from 'zustand';
import type { User } from '@/lib/types';
import { usersAPI } from '@/lib/api-instant';

interface UserState {
  users: User[];
  isModalOpen: boolean;
  editingUser: User | null;
  setUsers: (users: User[]) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setEditingUser: (user: User | null) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  editUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isModalOpen: false,
  editingUser: null,
  setUsers: (users) => set({ users }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setEditingUser: (user) => set({ editingUser: user }),
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
  fetchUsers: async () => {
    const res = await usersAPI.getAll();
    set({ users: res });
  },
}));
