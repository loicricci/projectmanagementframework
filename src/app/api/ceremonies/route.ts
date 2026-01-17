import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all ceremonies
export async function GET() {
  try {
    const ceremonies = await prisma.ceremony.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(ceremonies);
  } catch (error) {
    console.error("Error fetching ceremonies:", error);
    return NextResponse.json({ error: "Failed to fetch ceremonies" }, { status: 500 });
  }
}

// POST update a ceremony (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, purpose, participants, inputs, outputs, templateLink } = body;

    const updatedCeremony = await prisma.ceremony.update({
      where: { id },
      data: {
        name,
        purpose,
        participants,
        inputs,
        outputs,
        templateLink,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedCeremony);
  } catch (error) {
    console.error("Error updating ceremony:", error);
    return NextResponse.json({ error: "Failed to update ceremony" }, { status: 500 });
  }
}
