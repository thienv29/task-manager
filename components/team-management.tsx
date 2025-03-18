"use client"

import {useEffect} from "react"
import {Button} from "@/components/ui/button"
import {PlusCircle} from "lucide-react"
import TeamList from "@/components/team-list"
import TeamModal from "@/components/team-modal"
import {useTeamStore} from "@/lib/stores/storeTeams";
import {useUserStore} from "@/lib/stores/storeUsers";

export default function TeamManagement() {
    const {
        teams, isModalAddOrUpdateOpen, editingTeam,
        fetchTeams, setModalOpen, setEditingTeam,
        addTeam, editTeam, deleteTeam
    } = useTeamStore()

    const {
        users, fetchUsers
    } = useUserStore()

    useEffect(() => {
        fetchTeams()
        fetchUsers()
    }, [])

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Teams</h2>
                <Button onClick={() => setModalOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4"/> Add Team
                </Button>
            </div>

            <TeamList teams={teams} users={users} onEditTeam={setEditingTeam}/>

            <TeamModal
                isOpen={isModalAddOrUpdateOpen}
                onClose={() => {
                    setModalOpen(false)
                    setEditingTeam(null)
                }}
                onSave={editingTeam ? editTeam : addTeam}
                onDelete={editingTeam ? deleteTeam : undefined}
                users={users}
                team={editingTeam}
            />
        </div>
    )
}