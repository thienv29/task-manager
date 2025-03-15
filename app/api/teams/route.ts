import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Lấy danh sách tất cả teams
export async function GET() {
  try {
    const teams = (await prisma.team.findMany({
      include: {
        users: true,
        tasks: true,
      }
    }))
    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching teams" }, { status: 500 });
  }
}

// Tạo team mới
export async function POST(req: Request) {
  // try {
    const body = await req.json();
    const newTeam = await prisma.team.create({ data: body });
    return NextResponse.json(newTeam, { status: 201 });
  // } catch (error) {
  //   return NextResponse.json({ error: "Error creating team" }, { status: 500 });
  // }
}

// Cập nhật team
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updatedData } = body;

    const updatedTeam = await prisma.team.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    return NextResponse.json(updatedTeam, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating team" }, { status: 500 });
  }
}

// Xóa team
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    await prisma.team.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "Team deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting team" }, { status: 500 });
  }
}
