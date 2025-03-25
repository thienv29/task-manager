"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Column, Team, User} from "@prisma/client";
import {TaskForm} from "@/lib/types";
import {Checkbox} from "@/components/ui/checkbox";

interface TaskModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (task: TaskForm) => void
    onDelete?: (taskId: number) => void
    columns: Column[]
    teams: Team[]
    users: User[]
    task: TaskForm | null
}

const initTaskForm: TaskForm = {
    id: 0,
    title: "",
    description: "",
    columnId: 0,
    assignees: [],
    teamId: 0,
    priority: "MEDIUM",
}

export default function TaskModal({isOpen, onClose, onSave, onDelete, columns, teams, users, task}: TaskModalProps) {
    const [formData, setFormData] = useState<TaskForm>(initTaskForm)

    const [filteredUsers, setFilteredUsers] = useState<User[]>(users)

    useEffect(() => {
        if (task) {
            setFormData({
                id: task.id,
                title: task.title,
                description: task.description,
                columnId: task.columnId,
                assignees: task.assignees,
                teamId: task.teamId,
                priority: task.priority,
            })

            // Filter users based on selected team
            if (task.teamId) {
                filterUsersByTeam(task.teamId)
            } else {
                setFilteredUsers(users)
            }
        } else {
            setFormData(initTaskForm)
            setFilteredUsers(users)
        }
    }, [task, users])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleChangeStatus = (value: string) => {
        setFormData((prev) => ({...prev, columnId: Number(value)}))
    }


    const handleChangeTeam = (value: string) => {
        setFormData((prev) => ({...prev, teamId: Number(value)}))
        filterUsersByTeam(Number(value))
    }

    const filterUsersByTeam = (teamId: number) => {
        if (teamId) {
            const teamUsers = users.filter((user) => user.teamId == (teamId) || false);
            setFilteredUsers(teamUsers);
        } else {
            setFilteredUsers(users);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (task) {
            onSave({...formData, id: task.id})
        } else {
            onSave(formData)
        }
    }

    const handleDelete = () => {
        if (task && onDelete) {
            onDelete(task.id)
        }
    }

    const handleMemberToggle = (userId: number) => {
        setFormData((prev) => {
            const memberIds = prev.assignees.map(u => u.id).includes(userId)
                ? prev.assignees.map(u => u.id).filter((id) => id !== userId)
                : [...prev.assignees.map(u => u.id), userId]

            const userCurrents = users.filter(u => memberIds.includes(u.id))

            return {...prev, assignees: userCurrents}
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={formData.title} onChange={handleChange} required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description || ''}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={`${formData.columnId}`}
                                        onValueChange={handleChangeStatus}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {columns.map((column) => (
                                            <SelectItem key={column.id} value={`${column.id}`}>
                                                {column.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select value={formData.priority}
                                        onValueChange={(value) => handleSelectChange("priority", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LOW">Low</SelectItem>
                                        <SelectItem value="NORMAL">Normal</SelectItem>
                                        <SelectItem value="MEDIUM">Medium</SelectItem>
                                        <SelectItem value="HIGH">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="team">Team</Label>
                            <Select value={`${formData.teamId}`}
                                    onValueChange={handleChangeTeam}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select team"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {teams.map((team) => (
                                        <SelectItem key={team.id} value={`${team.id}`}>
                                            {team.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="assignee">Assignee</Label>
                            <div className="grid gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                                {filteredUsers.map((user) => (
                                    <div key={user.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`user-${user.id}`}
                                            checked={formData.assignees.map(u => u.id).includes(user.id)}
                                            onCheckedChange={() => handleMemberToggle(user.id)}
                                        />
                                        <Label htmlFor={`user-${user.id}`} className="cursor-pointer">
                                            {user.name} ({user.role})
                                        </Label>
                                    </div>
                                ))}
                                {filteredUsers.length === 0 &&
                                    <p className="text-sm text-muted-foreground">No users available</p>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex justify-between">
                        {task && onDelete && (
                            <Button type="button" variant="destructive" onClick={handleDelete}>
                                Delete
                            </Button>
                        )}
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">{task ? "Save Changes" : "Create Task"}</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

