import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(req: Request) {
    try {
        const {columnId, taskId} = await req.json();

        if (!taskId || !columnId) {
            return NextResponse.json({error: "Task ID is required"}, {status: 400});
        }

        const updatedTask = await prisma.task.update({
            where: {id: Number(taskId)},
            data: {
                columnId
            },
        });

        return NextResponse.json(updatedTask, {status: 200});
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}