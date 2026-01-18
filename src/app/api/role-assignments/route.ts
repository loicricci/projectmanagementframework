import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all role assignments
export async function GET() {
  try {
    const assignments = await prisma.roleAssignment.findMany({
      orderBy: { roleName: "asc" },
    });
    return NextResponse.json(assignments);
  } catch (error) {
    console.error("Error fetching role assignments:", error);
    return NextResponse.json(
      { error: "Failed to fetch role assignments" },
      { status: 500 }
    );
  }
}

// POST - Create or update a role assignment
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { roleKey, roleName, assigneeName, assigneeEmail, assigneePhone, notes } = body;

    if (!roleKey || !roleName) {
      return NextResponse.json(
        { error: "roleKey and roleName are required" },
        { status: 400 }
      );
    }

    // Upsert - create if doesn't exist, update if it does
    const assignment = await prisma.roleAssignment.upsert({
      where: { roleKey },
      update: {
        roleName,
        assigneeName: assigneeName || null,
        assigneeEmail: assigneeEmail || null,
        assigneePhone: assigneePhone || null,
        notes: notes || null,
      },
      create: {
        roleKey,
        roleName,
        assigneeName: assigneeName || null,
        assigneeEmail: assigneeEmail || null,
        assigneePhone: assigneePhone || null,
        notes: notes || null,
      },
    });

    return NextResponse.json(assignment);
  } catch (error) {
    console.error("Error saving role assignment:", error);
    return NextResponse.json(
      { error: "Failed to save role assignment" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a role assignment
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const roleKey = searchParams.get("roleKey");

    if (!roleKey) {
      return NextResponse.json(
        { error: "roleKey is required" },
        { status: 400 }
      );
    }

    await prisma.roleAssignment.delete({
      where: { roleKey },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting role assignment:", error);
    return NextResponse.json(
      { error: "Failed to delete role assignment" },
      { status: 500 }
    );
  }
}
