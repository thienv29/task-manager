import { Prisma } from "@prisma/client";

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority?: string;
  columnId?: number;
  teamId?: number;
  assignee: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: number;
  title: string;
  color: string;
  tasks: number[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  password?: string;
  teamId?: number;
  assignedTasks: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: number;
  name: string;
  description?: string;
  color?: string;
  users: number[];
  tasks: number[];
  createdAt: Date;
  updatedAt: Date;
}

export type TeamFull = Prisma.TeamGetPayload<{
  include: {
    tasks: true;
    users: true;
  };
}>;

export type TaskFull = Prisma.TaskGetPayload<{
  include: {
    assignee: true;
  };
}>;

export type UserFull = Prisma.UserGetPayload<{
  include: {
    assignedTasks: true;
  };
}>;
