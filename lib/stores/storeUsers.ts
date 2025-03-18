import {create} from "zustand"
import {usersAPI} from "@/lib/api-instant"
import {UserForm, UserFull} from "@/lib/types"

interface UserStore {
    users: UserFull[]
    editingUser: UserForm | null

    fetchUsers: () => void
    setEditingUser: (user: UserForm | null) => void

    addUser: (user: UserForm) => Promise<void>
    editUser: (user: UserForm) => Promise<void>
    deleteUser: (userId: number) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    editingUser: null,

    fetchUsers: async () => {
        const users = await usersAPI.getAll()
        set({users})
    },
    setEditingUser: async (user) => {
        set({editingUser: user})
    },
    addUser: async (user) => {
        await usersAPI.create(user)
        useUserStore.getState().fetchUsers()
    },
    editUser: async (user) => {
        await usersAPI.update(user)
        useUserStore.getState().fetchUsers()
    },
    deleteUser: async (userId) => {
        await usersAPI.delete(userId)
        useUserStore.getState().fetchUsers()
    }
}))