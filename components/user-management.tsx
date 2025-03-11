"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import UserList from "@/components/user-list"
import UserModal from "@/components/user-modal"
import { useStore } from "@/lib/store"
import type { User } from "@/lib/types"

export default function UserManagement() {
  const {
    users,
    teams,
    isModalOpen,
    editingUser,
    setIsModalOpen,
    setEditingUser,
    addUser,
    editUser,
    deleteUser,
    fetchUsers,
    fetchTeams,
  } = useStore();

  useEffect(() => {
    fetchUsers();
    fetchTeams();
  }, [fetchUsers, fetchTeams]);

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

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
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onSave={editingUser ? editUser : addUser}
        onDelete={editingUser ? deleteUser : undefined}
        teams={teams}
        user={editingUser}
      />
    </div>
  );
}

