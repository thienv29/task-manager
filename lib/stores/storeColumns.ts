import {create} from "zustand"
import {columnsAPI} from "@/lib/api-instant"
import {ColumnForm, ColumnFull} from "@/lib/types"

interface ColumnStore {
    columns: ColumnFull[]
    editingColumn: ColumnForm | null

    fetchColumns: () => void
    setEditingColumn: (column: ColumnForm | null) => void

    addColumn: (column: ColumnForm) => Promise<void>
    editColumn: (column: ColumnForm) => Promise<void>
    deleteColumn: (columnId: number) => Promise<void>
}

export const useColumnStore = create<ColumnStore>((set) => ({
    columns: [],
    editingColumn: null,

    fetchColumns: async () => {
        const columns = await columnsAPI.getAll()
        set({columns})
    },
    setEditingColumn: async (column) => {
        set({editingColumn: column})
    },
    addColumn: async (column) => {
        await columnsAPI.create(column)
        useColumnStore.getState().fetchColumns()
    },
    editColumn: async (column) => {
        await columnsAPI.update(column)
        useColumnStore.getState().fetchColumns()
    },
    deleteColumn: async (columnId) => {
        await columnsAPI.delete(columnId)
        useColumnStore.getState().fetchColumns()
    }
}))