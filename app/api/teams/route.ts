import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { TeamFull } from "@/lib/types";

const prisma = new PrismaClient();

// Lấy danh sách tất cả teams
export async function GET() {
  try {
    const teams: TeamFull[] = await prisma.team.findMany({
      include: { tasks: true, users: true },
    });
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
  }
}

// Tạo một team mới
export async function POST(req: Request) {
  try {
    const { name, description, color, users, tasks } = await req.json();

    const team = await prisma.team.create({
      data: {
        name,
        description,
        color,
        users: {
          connect: users?.map((userId: number) => ({ id: userId })) || [],
        },
        tasks: {
          connect: tasks?.map((taskId: number) => ({ id: taskId })) || [],
        },
      },
      include: { users: true, tasks: true },
    });

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
  }
}

// Route động để xử lý team theo ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.team.delete({ where: { id } });
    return NextResponse.json({ message: "Team deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete team" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, description, color, users, tasks } = await req.json();
    const updatedTeam = await prisma.team.update({
      where: { id },
      data: {
        name,
        description,
        color,
        users: {
          set: users?.map((userId: number) => ({ id: userId })) || [],
        },
        tasks: {
          set: tasks?.map((taskId: number) => ({ id: taskId })) || [],
        },
      },
      include: { users: true, tasks: true },
    });
    return NextResponse.json(updatedTeam);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update team" }, { status: 500 });
  }
}
