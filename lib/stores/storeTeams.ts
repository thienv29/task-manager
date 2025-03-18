import {create} from "zustand"
import {teamsAPI} from "@/lib/api-instant"
import {TeamForm, TeamFull} from "@/lib/types"

interface TeamStore {
    teams: TeamFull[]
    isModalAddOrUpdateOpen: boolean
    editingTeam: TeamForm | null

    fetchTeams: () => Promise<void>
    setModalOpen: (isOpen: boolean) => void
    setEditingTeam: (team: TeamForm | null) => void

    addTeam: (team: TeamForm) => Promise<void>
    editTeam: (team: TeamForm) => Promise<void>
    deleteTeam: (teamId: number) => Promise<void>
    showModalAddOrUpdate: () => void
    hideModalAddOrUpdate: () => void
}

export const useTeamStore = create<TeamStore>((set) => ({
    teams: [],
    isModalAddOrUpdateOpen: false,
    editingTeam: null,

    fetchTeams: async () => {
        const teams = await teamsAPI.getAll()
        set({teams})
    },
    setModalOpen: (isOpen) => set({isModalAddOrUpdateOpen: isOpen}),
    setEditingTeam: async (team) => {
        set({editingTeam: team})
        await useTeamStore.getState().showModalAddOrUpdate();
    },
    showModalAddOrUpdate: () => set({isModalAddOrUpdateOpen: true}),
    hideModalAddOrUpdate: () => set({isModalAddOrUpdateOpen: false}),

    addTeam: async (team) => {
        await teamsAPI.create(team)
        await useTeamStore.getState().fetchTeams()
        await useTeamStore.getState().hideModalAddOrUpdate();
    },
    editTeam: async (team) => {
        await teamsAPI.update(team)
        await useTeamStore.getState().fetchTeams()
        await useTeamStore.getState().hideModalAddOrUpdate();
    },
    deleteTeam: async (teamId) => {
        await teamsAPI.delete(teamId)
        await useTeamStore.getState().fetchTeams()
        await useTeamStore.getState().hideModalAddOrUpdate();
    }
}))