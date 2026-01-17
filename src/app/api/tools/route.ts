import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all tools
export async function GET() {
  try {
    const tools = await prisma.tool.findMany({
      orderBy: [{ domain: "asc" }, { order: "asc" }],
    });
    return NextResponse.json(tools);
  } catch (error) {
    console.error("Error fetching tools:", error);
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}

// POST create or update a tool (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, domain, name, description, whenToUse, externalUrl, docuwareRef, icon, order } = body;

    if (id) {
      // Update existing tool
      const updatedTool = await prisma.tool.update({
        where: { id },
        data: {
          domain,
          name,
          description,
          whenToUse,
          externalUrl,
          docuwareRef,
          icon,
          order,
          updatedAt: new Date(),
        },
      });
      return NextResponse.json(updatedTool);
    } else {
      // Create new tool
      const newTool = await prisma.tool.create({
        data: {
          domain,
          name,
          description,
          whenToUse,
          externalUrl,
          docuwareRef,
          icon,
          order: order || 0,
        },
      });
      return NextResponse.json(newTool);
    }
  } catch (error) {
    console.error("Error saving tool:", error);
    return NextResponse.json({ error: "Failed to save tool" }, { status: 500 });
  }
}

// DELETE a tool (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Tool ID required" }, { status: 400 });
    }

    await prisma.tool.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tool:", error);
    return NextResponse.json({ error: "Failed to delete tool" }, { status: 500 });
  }
}
