import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTask = await prisma.task.create({ data: body });

    return NextResponse.json({ message: "Task created", data: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 400 });
  }
}

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json({ message: "Tasks retrieved", data: tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve tasks" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updatedTask = await prisma.task.update({
      where: { id: body.id },
      data: body
    });

    return NextResponse.json({ message: "Task updated", data: updatedTask }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 400 });
  }
}
