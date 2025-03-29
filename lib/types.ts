import {Prisma} from "@prisma/client";

export type TeamFull = Prisma.TeamGetPayload<{
    include: {
        tasks: true;
        users: true;
    };
}>;

export type TeamForm = Omit<TeamFull, "createdAt" | "updatedAt" | "tasks">;

export type TaskFull = Prisma.TaskGetPayload<{
    include: {
        assignees: true;
    };
}>;
export type TaskForm = Omit<TaskFull, "createdAt" | "updatedAt">;
export type ColumnFull = Prisma.ColumnGetPayload<{
    include: {
        tasks: true
    };
}>;
export type ColumnForm = Omit<ColumnFull, "tasks">;

export type UserFull = Prisma.UserGetPayload<{
    include: {
        assignedTasks: true;
        team: true;
    };
}>;

export type UserForm = Omit<UserFull, "createdAt" | "updatedAt" | "assignedTasks" | "team">;


export type LoginModel = {
    email: string,
    password: string
}

export const EVENT_TASK = {
    ADD_TASK: 'ADD_TASK',
    EDIT_TASK: 'EDIT_TASK',
    DELETE_TASK: 'DELETE_TASK'
}

export const EVENT_COLUMN = {
    ADD_COLUMN: 'ADD_COLUMN',
    EDIT_COLUMN: 'EDIT_COLUMN',
    DELETE_COLUMN: 'DELETE_COLUMN'
}