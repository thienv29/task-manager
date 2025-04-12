"use client"

import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {PlusCircle} from "lucide-react"
import UserList from "@/components/management/user/user-list"
import UserModal from "@/components/management/user/user-modal"
import {useUserStore} from "@/lib/stores/storeUsers"
import {useTeamStore} from "@/lib/stores/storeTeams"
import {UserForm} from "@/lib/types";

export default function UserManagement() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    const {
        users,
        editingUser,
        setEditingUser,
        addUser,
        editUser,
        deleteUser,
        fetchUsers,
    } = useUserStore();
    const {teams, fetchTeams} = useTeamStore();

    useEffect(() => {
        fetchUsers();
        fetchTeams();
    }, [fetchUsers, fetchTeams]);

    const handleEdit = async (e: UserForm) => {
        await editUser(e);
        setModalOpen(false);
    }
    const handleAdd = async (e: UserForm) => {
        await addUser(e);
        setEditingUser(null);
        setModalOpen(false);
    }

    const filteredUsers = users.filter((user) =>
        `${user.name} ${user.email}`.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Users</h2>
                <Button onClick={() => setModalOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4"/> Add User
                </Button>
            </div>
            <Input
                placeholder="Search users by name or email..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <UserList
                users={filteredUsers}
                teams={teams}
                onEditUser={(e) => {
                    setEditingUser(e);
                    setModalOpen(true);
                }}
            />

            <UserModal
                isOpen={isModalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingUser(null);
                }}
                onSave={editingUser ? handleEdit : handleAdd}
                onDelete={editingUser ? deleteUser : undefined}
                teams={teams}
                user={editingUser}
            />
        </div>
    );
}