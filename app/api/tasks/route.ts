import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {TaskFull, TeamFull, UserFull} from "@/lib/types";

const prisma = new PrismaClient();

export async function GET() {
    try {
    const tasks: TaskFull[] = await prisma.task.findMany({
        include: {assignees: true},
    });
    return NextResponse.json(tasks, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch tasks"}, {status: 500});
    }
}

export async function POST(req: Request) {
    try {
        const {title, description, priority, columnId, assignees, teamId} = await req.json();

        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                priority,
                columnId,
                assignees: {
                    connect: assignees?.map((user: UserFull) => ({id: user.id})) || [],
                    
                },
                teamId: teamId == 0 ? null : teamId,
            },
        });

        return NextResponse.json(newTask, {status: 201});
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}


export async function PUT(req: Request) {
    try {
        const {id, title, description, priority, columnId, assignees, teamId} = await req.json();

        if (!id) {
            return NextResponse.json({error: "Task ID is required"}, {status: 400});
        }

        const updatedTask = await prisma.task.update({
            where: {id: Number(id)},
            data: {
                title,
                description,
                priority,
                columnId,
                assignees: {
                    set: assignees?.map((user: UserFull) => ({id: user.id})) || [],
                },
                teamId,
            },
        });

        return NextResponse.json(updatedTask, {status: 200});
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}

export async function DELETE(req: Request) {
    try {
        const {id} = await req.json();
        await prisma.task.delete({where: {id}});
        return NextResponse.json({message: "Task deleted successfully"});
    } catch (error) {
        return NextResponse.json({error: "Failed to delete Task"}, {status: 500});1 
    } 
}