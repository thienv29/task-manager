import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Lấy danh sách tất cả users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}

// Tạo user mới
export async function POST(req: Request) {
  // try {
    const body = await req.json();
    const newUser = await prisma.user.create({ data: body });
    return NextResponse.json(newUser, { status: 201 });
  // } catch (error) {
    // return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  // }
}

// Cập nhật user
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updatedData } = body;

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

// Xóa user
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    await prisma.user.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}
