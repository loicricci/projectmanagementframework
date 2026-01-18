import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET current phase
export async function GET() {
  try {
    const settings = await prisma.projectSettings.findUnique({
      where: { id: "default" },
      include: {
        currentPhase: true,
        updatedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!settings) {
      return NextResponse.json({
        currentPhaseId: null,
        currentPhase: null,
        updatedAt: null,
        updatedBy: null,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching current phase:", error);
    return NextResponse.json({ error: "Failed to fetch current phase" }, { status: 500 });
  }
}

// POST/PUT to set current phase (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { phaseId } = body;

    // Validate that the phase exists if provided
    if (phaseId) {
      const phase = await prisma.phase.findUnique({
        where: { id: phaseId },
      });

      if (!phase) {
        return NextResponse.json({ error: "Phase not found" }, { status: 404 });
      }
    }

    // Check if user exists in database, only set updatedById if they do
    let updatedById: string | null = null;
    if (session.user.id) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });
      if (user) {
        updatedById = user.id;
      }
    }

    // Upsert the settings (create if not exists, update if exists)
    const settings = await prisma.projectSettings.upsert({
      where: { id: "default" },
      update: {
        currentPhaseId: phaseId || null,
        updatedById,
      },
      create: {
        id: "default",
        currentPhaseId: phaseId || null,
        updatedById,
      },
      include: {
        currentPhase: true,
        updatedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating current phase:", error);
    return NextResponse.json({ error: "Failed to update current phase" }, { status: 500 });
  }
}
