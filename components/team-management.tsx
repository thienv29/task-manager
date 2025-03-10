"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import TeamList from "@/components/team-list"
import TeamModal from "@/components/team-modal"
import type { User, Team } from "@/lib/types"
import { teamsAPI } from "@/lib/api-instant"
import { get } from "http"

export default function TeamManagement() {
  
  const [teams, setTeams] = useState<Team[]>([


  ])

  const [users, setUsers] = useState<User[]>([
  ])
useEffect(() => { 
  getTeams(); 
  getUsers();
}, [])
const getTeams = async () => {  
  const res = await teamsAPI.getAll(); 
  setTeams(res);
}
const getUsers = async () => {  
  const res = await teamsAPI.getAll();
  setUsers(res);
}
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)

  const handleAddTeam = (team: Omit<Team, "id">) => {
    const newTeam = {
      ...team,
      id: Math.random().toString(36).substring(2, 9),
    }

    setTeams([...teams, newTeam as Team])
    setIsModalOpen(false)
    setEditingTeam(null)
  }

  const handleEditTeam = (team: Team) => {
    setTeams(teams.map((t) => (t.id === team.id ? team : t)))
    setIsModalOpen(false)
    setEditingTeam(null)
  }

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter((team) => team.id !== teamId))
    setIsModalOpen(false)
    setEditingTeam(null)
  }

  const openEditModal = (team: Team) => {
    setEditingTeam(team)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Teams</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Team
        </Button>
      </div>

      <TeamList teams={teams} users={users} onEditTeam={openEditModal} />

      <TeamModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTeam(null)
        }}
        onSave={editingTeam ? handleEditTeam : handleAddTeam}
        onDelete={editingTeam ? handleDeleteTeam : undefined}
        users={users}
        team={editingTeam}
      />
    </div>
  )
}

