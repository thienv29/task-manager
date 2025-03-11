"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Task, Column, Team, User } from "@/lib/types"

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (task: Task | Omit<Task, "id">) => void
  onDelete?: (taskId: string) => void
  columns: Column[]
  teams: Team[]
  users: User[]
  task: Task | null
}

export default function TaskModal({ isOpen, onClose, onSave, onDelete, columns, teams, users, task }: TaskModalProps) {
  const [formData, setFormData] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    columnId: "todo",
    assigneeId: "",
    teamId: "",
    priority: "medium",
  })

  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        columnId: task.columnId,
        assigneeId: task.assigneeId,
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
      setFormData({
        title: "",
        description: "",
        columnId: "todo",
        assigneeId: "",
        teamId: "",
        priority: "medium",
      })
      setFilteredUsers(users)
    }
  }, [task, users])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "teamId") {
      filterUsersByTeam(value)

      // Reset assignee if they're not in the selected team
      const userInTeam = users.find((user) => user.id === formData.assigneeId && user.teamIds.includes(value))

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        assigneeId: userInTeam ? prev.assigneeId : "",
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const filterUsersByTeam = (teamId: string) => {
    if (teamId) {
      const teamUsers = users.filter((user) => user.teamIds?.includes(teamId) || false);
      setFilteredUsers(teamUsers);
    } else {
      setFilteredUsers(users);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task) {
      onSave({ ...formData, id: task.id })
    } else {
      onSave(formData)
    }
  }

  const handleDelete = () => {
    if (task && onDelete) {
      onDelete(task.id)
    }
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
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.columnId} onValueChange={(value) => handleSelectChange("columnId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {column.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="team">Team</Label>
              <Select value={formData.teamId} onValueChange={(value) => handleSelectChange("teamId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select
                value={formData.assigneeId}
                onValueChange={(value) => handleSelectChange("assigneeId", value)}
                disabled={!formData.teamId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.teamId ? "Select assignee" : "Select a team first"} />
                </SelectTrigger>
                <SelectContent>
                  {filteredUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

