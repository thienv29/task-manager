import {create} from "zustand"
import {columnsAPI} from "@/lib/api-instant"
import {ColumnForm, ColumnFull, EVENT_COLUMN} from "@/lib/types"
import {useWebSocketStore} from "@/lib/stores/storeWebsocket";

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
        useWebSocketStore.getState().sendMessage(EVENT_COLUMN.ADD_COLUMN)
        useColumnStore.getState().fetchColumns()
    },
    editColumn: async (column) => {
        await columnsAPI.update(column)
        useWebSocketStore.getState().sendMessage(EVENT_COLUMN.EDIT_COLUMN)
        useColumnStore.getState().fetchColumns()
    },
    deleteColumn: async (columnId) => {
        await columnsAPI.delete(columnId)
        useWebSocketStore.getState().sendMessage(EVENT_COLUMN.DELETE_COLUMN)
        useColumnStore.getState().fetchColumns()
    }
}))