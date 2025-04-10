"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {User} from "@prisma/client";
import {TeamForm} from "@/lib/types";
import {ConfirmDialog} from "@/components/confirm-dialog";

interface TeamModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (team: TeamForm) => void
    onDelete?: (teamId: number) => void
    users: User[]
    team: TeamForm | null
}

const initTeamForm = {
    id: 0,
    name: "",
    description: "",
    color: "bg-blue-500",
    users: []
}

export default function TeamModal({isOpen, onClose, onSave, onDelete, users, team}: TeamModalProps) {
    const [formData, setFormData] = useState<TeamForm>(initTeamForm)

    const colorOptions = [
        {value: "bg-blue-500", label: "Blue"},
        {value: "bg-green-500", label: "Green"},
        {value: "bg-purple-500", label: "Purple"},
        {value: "bg-red-500", label: "Red"},
        {value: "bg-yellow-500", label: "Yellow"},
        {value: "bg-pink-500", label: "Pink"},
    ]

    useEffect(() => {
        if (team) {
            setFormData({
                id: team.id,
                name: team.name,
                description: team.description,
                color: team.color,
                users: team.users
            })
        } else {
            setFormData(initTeamForm)
        }
    }, [team])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleMemberToggle = (userId: number) => {
        setFormData((prev) => {
            const memberIds = prev.users.map(u => u.id).includes(userId)
                ? prev.users.map(u => u.id).filter((id) => id !== userId)
                : [...prev.users.map(u => u.id), userId]

            const userCurrents = users.filter(u => memberIds.includes(u.id))

            return {...prev, users: userCurrents}
        })
    }

    const handleColorChange = (color: string) => {
        setFormData((prev) => ({...prev, color}))
    }

    const handleSubmit = () => {
        if (team) {
            onSave({...formData, id: team.id})
        } else {
            onSave(formData)
        }
    }

    const handleDelete = () => {
        if (team && onDelete) {
            onDelete(team.id)
            onClose();
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{team ? "Edit Team" : "Create New Team"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Team Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description ?? ''}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Team Color</Label>
                            <RadioGroup value={formData.color ?? 'bg-blue-500'} onValueChange={handleColorChange}
                                        className="flex flex-wrap gap-2">
                                {colorOptions.map((option) => (
                                    <div key={option.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.value} id={`color-${option.value}`}
                                                        className="sr-only"/>
                                        <Label
                                            htmlFor={`color-${option.value}`}
                                            className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                                                formData.color === option.value ? "ring-2 ring-offset-2 ring-primary" : ""
                                            } ${option.value}`}
                                        >
                                            {formData.color === option.value &&
                                                <span className="text-white text-xs">✓</span>}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <div className="grid gap-2">
                            <Label>Team Members</Label>
                            <div className="grid gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                                {users.map((user) => (
                                    <div key={user.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`user-${user.id}`}
                                            checked={formData.users.map(u => u.id).includes(user.id)}
                                            onCheckedChange={() => handleMemberToggle(user.id)}
                                        />
                                        <Label htmlFor={`user-${user.id}`} className="cursor-pointer">
                                            {user.name} ({user.role})
                                        </Label>
                                    </div>
                                ))}
                                {users.length === 0 &&
                                    <p className="text-sm text-muted-foreground">No users available</p>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex justify-between">
                        {team && onDelete && (
                            <ConfirmDialog
                                title="Delete Item"
                                description="Are you sure you want to delete this item? This action cannot be undone."
                                confirmLabel="Delete"
                                variant="destructive"
                                onConfirm={handleDelete}
                                trigger={
                                    <Button type="button" variant="destructive">
                                        Delete
                                    </Button>
                                }
                            />

                        )}
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit}>{team ? "Save Changes" : "Create Team"}</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </>
    )
}

