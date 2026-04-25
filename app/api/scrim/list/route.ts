import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const scrims = await prisma.scrim.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            ign: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Scrims retrieved successfully",
        scrims,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get scrims error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
