import { create } from "zustand";

export type UserRole = "ADMIN" | "TEAM_LEAD" | "MEMBER";

interface RoleState {
    role: UserRole; // Vai trò hiện tại của người dùng
    teamid: string; // ID của team nếu người dùng là TEAM_LEAD
    setTeamid: (teamid: string) => void; // Hàm để cập nhật teamId
    setRole: (role: UserRole) => void; // Hàm để cập nhật vai trò
}

const useRoleStore = create<RoleState>((set) => ({
    role: "MEMBER", // Giá trị mặc định
    teamid: "", // Giá trị mặc định cho teamid
    setTeamid: (teamid) => set({ teamid }), // Hàm để cập nhật teamid
    setRole: (role) => set({ role }),
}));


export default useRoleStore;

