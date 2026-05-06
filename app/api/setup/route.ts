import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // Check if any admin exists
    const userCount = await prisma.user.count();
    
    if (userCount > 0) {
      return NextResponse.json({ error: "An admin account already exists." }, { status: 403 });
    }

    const { email, password } = await req.json();

    if (!email || !password || password.length < 8) {
      return NextResponse.json({ error: "Invalid email or password (min 8 chars required)" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({ error: "Failed to create admin account" }, { status: 500 });
  }
}
