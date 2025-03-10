"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { User, Team } from "@/lib/types"

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (user: User | Omit<User, "id">) => void
  onDelete?: (userId: string) => void
  teams: Team[]
  user: User | null
}

export default function UserModal({ isOpen, onClose, onSave, onDelete, teams, user }: UserModalProps) {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "",
    teamIds: [],
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        teamIds: user.teamIds,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        role: "",
        teamIds: [],
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTeamToggle = (teamId: string) => {
    setFormData((prev) => {
      const teamIds = prev.teamIds.includes(teamId)
        ? prev.teamIds.filter((id) => id !== teamId)
        : [...prev.teamIds, teamId]

      return { ...prev, teamIds }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      onSave({ ...formData, id: user.id })
    } else {
      onSave(formData)
    }
  }

  const handleDelete = () => {
    if (user && onDelete) {
      onDelete(user.id)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{user ? "Edit User" : "Create New User"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" value={formData.role} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label>Teams</Label>
              <div className="grid gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                {teams.map((team) => (
                  <div key={team.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`team-${team.id}`}
                      checked={formData.teamIds.includes(team.id)}
                      onCheckedChange={() => handleTeamToggle(team.id)}
                    />
                    <Label htmlFor={`team-${team.id}`} className="cursor-pointer">
                      {team.name}
                    </Label>
                  </div>
                ))}
                {teams.length === 0 && <p className="text-sm text-muted-foreground">No teams available</p>}
              </div>
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
              <Button type="submit">{user ? "Save Changes" : "Create User"}</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

