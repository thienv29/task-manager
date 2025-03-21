import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {ColumnFull} from "@/lib/types";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const columns: ColumnFull[] = await prisma.column.findMany({
            include: {tasks: true},
        });
        return NextResponse.json(columns);
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch columns"}, {status: 500});
    }
}

export async function POST(req: Request) {
    try {
        const {title, color, tasks} = await req.json();

        const column = await prisma.column.create({
            data: {
                title,
                color,
                tasks: {
                    connect: tasks?.map((task: ColumnFull) => ({id: task.id})) || [],
                },
            },
            include: {tasks: true},
        });

        return NextResponse.json(column, {status: 201});
    } catch (error) {
        return NextResponse.json({error: "Failed to create column"}, {status: 500});
    }
}

export async function DELETE(req: Request) {
    try {
        const {id} = await req.json();
        await prisma.column.delete({where: {id}});
        return NextResponse.json({message: "Team deleted successfully"});
    } catch (error) {
        return NextResponse.json({error: "Failed to delete column"}, {status: 500});
    }
}

export async function PUT(req: Request) {
    try {
        const {id, title, color, tasks} = await req.json();
        const updatedTeam = await prisma.column.update({
            where: {id},
            data: {
                title,
                color,
                tasks: {
                    set: tasks?.map((task: ColumnFull) => ({id: task.id})) || [],
                },
            },
            include: {tasks: true},
        });
        return NextResponse.json(updatedTeam);
    } catch (error) {
        return NextResponse.json({error: "Failed to update column"}, {status: 500});
    }
}
