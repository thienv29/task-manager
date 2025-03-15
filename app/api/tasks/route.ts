import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Tạo task mới
export async function POST(req: Request) {
  // try {
    const body = await req.json();
    const newTeam = await prisma.task.create({ data: body });
    return NextResponse.json(newTeam, { status: 201 });
  // } catch (error) {
  //   return NextResponse.json({ error: "Error creating team" }, { status: 500 });
  // }
}

export async function GET() {
  try {
    // Lấy tất cả tasks từ database
    const tasks = await prisma.task.findMany();
    
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updatedData } = body;

    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}

// Xóa task theo ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  }
}