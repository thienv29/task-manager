"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import UserList from "@/components/user-list"
import UserModal from "@/components/user-modal"
import type { User, Team } from "@/lib/types"
import { usersAPI } from "@/lib/api-instant"
import { teamsAPI } from "@/lib/api-instant"
import { tasksAPI } from "@/lib/api-instant"


export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)


  useEffect(() => {
    getUsers();
    getTeams();
  }, [])
  const getTeams = async () => {
    const res = await teamsAPI.getAll();
    setTeams(res);
  }
  const getUsers = async () => {
    const res = await usersAPI.getAll();
    setUsers(res);
  }

  const handleAddUser = (user: Omit<User, "id">) => {
    const newUser = {
      ...user,
      id: Math.random().toString(36).substring(2, 9),
    }

    setUsers([...users, newUser as User])
    setIsModalOpen(false)
    setEditingUser(null)
  }

  const handleEditUser = (user: User) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)))
    setIsModalOpen(false)
    setEditingUser(null)
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
    setIsModalOpen(false)
    setEditingUser(null)
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <UserList users={users} teams={teams} onEditUser={openEditModal} />

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingUser(null)
        }}
        onSave={editingUser ? handleEditUser : handleAddUser}
        onDelete={editingUser ? handleDeleteUser : undefined}
        teams={teams}
        user={editingUser}
      />
    </div>
  )
}

