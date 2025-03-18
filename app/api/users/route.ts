import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {UserFull} from "@/lib/types";
import {hashPassword} from "@/lib/utils";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const {name, email, password, role, teamId} = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({error: "Missing required fields"}, {status: 400});
        }

        const passwordHash = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
                role,
                teamId: teamId == 0 ? null : teamId,
            },
        });

        return NextResponse.json(newUser, {status: 201});
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}

export async function GET() {
    try {
        const users: UserFull[] = await prisma.user.findMany({
            include: {
                assignedTasks: true,
                team: true
            },
        });

        return NextResponse.json(users, {status: 200});
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}

export async function PUT(req: Request) {
    try {
        const {id, name, email, role, teamId} = await req.json();

        if (!id) {
            return NextResponse.json({error: "User ID is required"}, {status: 400});
        }

        const updatedUser = await prisma.user.update({
            where: {id: Number(id)},
            data: {
                name,
                email,
                role,
                teamId,
            },
        });

        return NextResponse.json(updatedUser, {status: 200});
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}


export async function DELETE(req: Request) {
    try {
        const {id} = await req.json();
        await prisma.user.delete({where: {id}});
        return NextResponse.json({message: "User deleted successfully"});
    } catch (error) {
        return NextResponse.json({error: "Failed to delete User"}, {status: 500});
    }
}