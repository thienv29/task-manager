"use client"

import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {PlusCircle} from "lucide-react"
import TeamList from "@/components/management/team/team-list"
import TeamModal from "@/components/management/team/team-modal"
import {useTeamStore} from "@/lib/stores/storeTeams";
import {useUserStore} from "@/lib/stores/storeUsers";
import {TeamForm} from "@/lib/types";

export default function TeamManagement() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const {
        teams, editingTeam,
        fetchTeams, setEditingTeam,
        addTeam, editTeam, deleteTeam
    } = useTeamStore()

    const {
        users, fetchUsers
    } = useUserStore()

    useEffect(() => {
        fetchTeams()
        fetchUsers()
    }, [])

    const handleEdit = async (e: TeamForm) => {
        await editTeam(e);
        setModalOpen(false);
    }
    const handleAdd = async (e: TeamForm) => {
        await addTeam(e);
        setEditingTeam(null)
        setModalOpen(false);
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Teams</h2>
                <Button onClick={() => setModalOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4"/> Add Team
                </Button>
            </div>

            <TeamList teams={teams} users={users} onEditTeam={(e) => {
                setEditingTeam(e)
                setModalOpen(true);
            }}/>

            <TeamModal
                isOpen={isModalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingTeam(null)
                }}
                onSave={editingTeam ? handleEdit : handleAdd}
                onDelete={editingTeam ? deleteTeam : undefined}
                users={users}
                team={editingTeam}
            />
        </div>
    )
}
