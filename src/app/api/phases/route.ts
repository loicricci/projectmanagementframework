import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all phases
export async function GET() {
  try {
    const phases = await prisma.phase.findMany({
      orderBy: { order: "asc" },
      include: { ceremony: true },
    });
    return NextResponse.json(phases);
  } catch (error) {
    console.error("Error fetching phases:", error);
    return NextResponse.json({ error: "Failed to fetch phases" }, { status: 500 });
  }
}

// POST update a phase (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, shortName, narrative, entryCriteria, exitGate, toolLinks, docuwareLinks, ceremonyId } = body;

    const updatedPhase = await prisma.phase.update({
      where: { id },
      data: {
        name,
        shortName,
        narrative,
        entryCriteria,
        exitGate,
        toolLinks,
        docuwareLinks,
        ceremonyId,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedPhase);
  } catch (error) {
    console.error("Error updating phase:", error);
    return NextResponse.json({ error: "Failed to update phase" }, { status: 500 });
  }
}
