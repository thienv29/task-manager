"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { User, Team } from "@/lib/types"

interface TeamModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (team: Team | Omit<Team, "id">) => void
  onDelete?: (teamId: string) => void
  users: User[]
  team: Team | null
}

export default function TeamModal({ isOpen, onClose, onSave, onDelete, users, team }: TeamModalProps) {
  const [formData, setFormData] = useState<Omit<Team, "id">>({
    name: "",
    description: "",
    memberIds: [],
    color: "bg-blue-500",
  })

  const colorOptions = [
    { value: "bg-blue-500", label: "Blue" },
    { value: "bg-green-500", label: "Green" },
    { value: "bg-purple-500", label: "Purple" },
    { value: "bg-red-500", label: "Red" },
    { value: "bg-yellow-500", label: "Yellow" },
    { value: "bg-pink-500", label: "Pink" },
  ]

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        description: team.description,
        memberIds: team.memberIds,
        color: team.color,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        memberIds: [],
        color: "bg-blue-500",
      })
    }
  }, [team])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMemberToggle = (userId: string) => {
    setFormData((prev) => {
      const memberIds = prev.memberIds.includes(userId)
        ? prev.memberIds.filter((id) => id !== userId)
        : [...prev.memberIds, userId]

      return { ...prev, memberIds }
    })
  }

  const handleColorChange = (color: string) => {
    setFormData((prev) => ({ ...prev, color }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (team) {
      onSave({ ...formData, id: team.id })
    } else {
      onSave(formData)
    }
  }

  const handleDelete = () => {
    if (team && onDelete) {
      onDelete(team.id)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{team ? "Edit Team" : "Create New Team"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Team Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label>Team Color</Label>
              <RadioGroup value={formData.color} onValueChange={handleColorChange} className="flex flex-wrap gap-2">
                {colorOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`color-${option.value}`} className="sr-only" />
                    <Label
                      htmlFor={`color-${option.value}`}
                      className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                        formData.color === option.value ? "ring-2 ring-offset-2 ring-primary" : ""
                      } ${option.value}`}
                    >
                      {formData.color === option.value && <span className="text-white text-xs">✓</span>}
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
                      checked={formData.memberIds.includes(user.id)}
                      onCheckedChange={() => handleMemberToggle(user.id)}
                    />
                    <Label htmlFor={`user-${user.id}`} className="cursor-pointer">
                      {user.name} ({user.role})
                    </Label>
                  </div>
                ))}
                {users.length === 0 && <p className="text-sm text-muted-foreground">No users available</p>}
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            {team && onDelete && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{team ? "Save Changes" : "Create Team"}</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

