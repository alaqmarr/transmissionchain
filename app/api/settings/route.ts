import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Iterate through keys and upsert in DB
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        await prisma.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
