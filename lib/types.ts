import { Prisma } from "@prisma/client";

export type TeamFull = Prisma.TeamGetPayload<{
  include: {
    tasks: true;
    users: true;
  };
}>;

export type TeamForm = Omit<TeamFull, "createdAt" | "updatedAt" | "tasks">;

export type TaskFull = Prisma.TaskGetPayload<{
  include: {
    assignee: true;
  };
}>;
export type TaskForm = Omit<TaskFull, "createdAt" | "updatedAt">;

export type UserFull = Prisma.UserGetPayload<{
  include: {
    assignedTasks: true;
    team: true;
  };
}>;

export type UserForm = Omit<UserFull, "createdAt" | "updatedAt" | "assignedTasks">;
