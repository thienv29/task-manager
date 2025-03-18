import {create} from "zustand"
import {teamsAPI} from "@/lib/api-instant"
import {TeamForm, TeamFull} from "@/lib/types"

interface TeamStore {
    teams: TeamFull[]
    editingTeam: TeamForm | null

    fetchTeams: () => void
    setEditingTeam: (team: TeamForm | null) => void

    addTeam: (team: TeamForm) => Promise<void>
    editTeam: (team: TeamForm) => Promise<void>
    deleteTeam: (teamId: number) => Promise<void>
}

export const useTeamStore = create<TeamStore>((set) => ({
    teams: [],
    editingTeam: null,

    fetchTeams: async () => {
        const teams = await teamsAPI.getAll()
        set({teams})
    },
    setEditingTeam: async (team) => {
        set({editingTeam: team})
    },
    addTeam: async (team) => {
        await teamsAPI.create(team)
        useTeamStore.getState().fetchTeams()
    },
    editTeam: async (team) => {
        await teamsAPI.update(team)
        useTeamStore.getState().fetchTeams()
    },
    deleteTeam: async (teamId) => {
        await teamsAPI.delete(teamId)
        useTeamStore.getState().fetchTeams()
    }
}))