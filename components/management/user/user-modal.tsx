"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {TeamFull, UserForm} from "@/lib/types"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface UserModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (user: UserForm) => void
    onDelete?: (userId: number) => void
    teams: TeamFull[]
    user: UserForm | null
}

const initUserForm = {
    id: 0,
    name: "",
    email: "",
    role: "",
    teamId: 0,
    password: "",
}
export default function UserModal({isOpen, onClose, onSave, onDelete, teams, user}: UserModalProps) {
    const [formData, setFormData] = useState<UserForm>(initUserForm)

    useEffect(() => {
        if (user) {
            setFormData({...user});
        } else {
            setFormData(initUserForm)
        }
    }, [user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleChangeTeam = (value: string) => {
        setFormData((prev) => ({...prev, teamId: Number(value)}))
    }
    const handleChangeRole = (value: string) => {
        setFormData((prev) => ({...prev, role: value}))
    }

    const handleSubmit = () => {
        if (user) {
            onSave({...formData, id: user.id})
        } else {
            onSave(formData)
        }
    }

    const handleDelete = () => {
        if (user && onDelete) {
            onDelete(user.id);
            onClose();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{user ? "Edit User" : "Create New User"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                               required/>
                    </div>
                    {!user && <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" value={formData.password}
                               onChange={handleChange}
                               required/>
                    </div>}
                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select name="role" value={`${formData?.role}`} onValueChange={handleChangeRole}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select role"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'member'}>Member</SelectItem>
                                <SelectItem value={'admin'}>Admin</SelectItem>
                                <SelectItem value={'team_lead'}>Team Lead</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Teams</Label>
                        <Select name="teamId" value={`${formData?.teamId}`} onValueChange={handleChangeTeam}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a team"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'0'}>None</SelectItem>
                                {teams.map(team =>
                                    <SelectItem value={`${team.id}`}>{team.name}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        {teams.length === 0 &&
                            <p className="text-sm text-muted-foreground">No teams available</p>}
                    </div>
                </div>
                <DialogFooter className="flex justify-between">
                    {user && onDelete && (
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    )}
                    <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>{user ? "Save Changes" : "Create User"}</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

