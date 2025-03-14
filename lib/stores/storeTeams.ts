import { create } from 'zustand';
import type { Team } from '@/lib/types';
import { teamsAPI } from '@/lib/api-instant';

interface TeamState {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  fetchTeams: () => Promise<void>;
}

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  setTeams: (teams) => set({ teams }),
  fetchTeams: async () => {
    const res = await teamsAPI.getAll();
    set({ teams: res });
  },
}));