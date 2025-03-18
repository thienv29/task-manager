import {create} from "zustand"
import {usersAPI} from "@/lib/api-instant"
import {UserForm, UserFull} from "@/lib/types"

interface UserStore {
    users: UserFull[]
    isModalAddOrUpdateOpen: boolean
    editingUser: UserForm | null

    fetchUsers: () => Promise<void>
    setModalOpen: (isOpen: boolean) => void
    setEditingUser: (user: UserForm | null) => void

    addUser: (user: UserForm) => Promise<void>
    editUser: (user: UserForm) => Promise<void>
    deleteUser: (userId: number) => Promise<void>
    showModalAddOrUpdate: () => void
    hideModalAddOrUpdate: () => void
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    isModalAddOrUpdateOpen: false,
    editingUser: null,

    fetchUsers: async () => {
        const users = await usersAPI.getAll()
        set({users})
    },
    setModalOpen: (isOpen) => set({isModalAddOrUpdateOpen: isOpen}),
    setEditingUser: async (user) => {
        set({editingUser: user})
        await useUserStore.getState().showModalAddOrUpdate();
    },
    showModalAddOrUpdate: () => set({isModalAddOrUpdateOpen: true}),
    hideModalAddOrUpdate: () => set({isModalAddOrUpdateOpen: false}),

    addUser: async (user) => {
        await usersAPI.create(user)
        await useUserStore.getState().fetchUsers()
        await useUserStore.getState().hideModalAddOrUpdate();
    },
    editUser: async (user) => {
        await usersAPI.update(user)
        await useUserStore.getState().fetchUsers()
        await useUserStore.getState().hideModalAddOrUpdate();
    },
    deleteUser: async (userId) => {
        await usersAPI.delete(userId)
        await useUserStore.getState().fetchUsers()
        await useUserStore.getState().hideModalAddOrUpdate();
    }
}))