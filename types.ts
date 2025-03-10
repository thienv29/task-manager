export interface Task {
  id: string
  title: string
  description: string
  columnId: string
  assigneeId: string
  teamId: string
  priority: string
}

export interface Column {
  id: string
  title: string
  color: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  teamIds: string[]
}

export interface Team {
  id: string
  name: string
  description: string
  memberIds: string[]
  color: string
}

