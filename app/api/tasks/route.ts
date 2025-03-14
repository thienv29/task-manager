import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Lấy dữ liệu từ body request
    const { title, description, columnId, assigneeId, teamId, priority } = await req.json();

    // Kiểm tra dữ liệu đầu vào (tránh lỗi thiếu dữ liệu)
    if (!title || !description || !columnId || !assigneeId || !teamId || !priority) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Tạo Task mới trong database
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        columnId,
        assigneeId,
        teamId,
        priority,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
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