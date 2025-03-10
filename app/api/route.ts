import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Lấy dữ liệu từ body
    return NextResponse.json({ message: "Data received", data: body }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "This is a GET request", data: { id: 1, name: "Thiện" } }, { status: 200 });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ message: "PUT request successful", updatedData: body }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ message: "PATCH request successful", updatedFields: body }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}