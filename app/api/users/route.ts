import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { UserFull } from "@/lib/types";
import bcrypt from "bcryptjs";
import {hashPassword} from "@/prisma/seed";

const prisma = new PrismaClient();

// Create a new user
export async function POST(req: Request) {
  try {
    const { name, email, password, role, assignedTasks, teamId } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role,
        assignedTasks: {
          connect: assignedTasks?.map((taskId: number) => ({ id: taskId })) || [],
        },
        teamId,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Get all users
export async function GET() {
  try {
    const users: UserFull[] = await prisma.user.findMany({
      include: {
        assignedTasks: true,
        team: true
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Update a user
export async function PUT(req: Request) {
  try {
    const { id, name, email, password, role, teamId } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password,
        role,
        teamId,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Delete a user
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}