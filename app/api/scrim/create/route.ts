import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { CreateScrimFormData } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const formData: CreateScrimFormData & { authorId: number } =
      await req.json();

    // Validate input
    if (!formData.teamName?.trim()) {
      return NextResponse.json(
        { error: "Team name is required" },
        { status: 400 },
      );
    }

    if (!formData.date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    if (!formData.time) {
      return NextResponse.json({ error: "Time is required" }, { status: 400 });
    }

    if (!formData.authorId) {
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 },
      );
    }

    if (
      !formData.minRank ||
      !formData.maxRank ||
      !formData.squadType ||
      !formData.gameFormat
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 },
      );
    }

    if (formData.gameCount < 1 || formData.gameCount > 100) {
      return NextResponse.json(
        { error: "Game count must be between 1 and 100" },
        { status: 400 },
      );
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: formData.authorId },
    });

    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create scrim
    const scrim = await prisma.scrim.create({
      data: {
        squadType: formData.squadType,
        teamName: formData.teamName,
        teamLogo: formData.teamLogo || null,
        minRank: formData.minRank,
        maxRank: formData.maxRank,
        gameFormat: formData.gameFormat,
        gameCount: formData.gameCount,
        date: formData.date,
        time: formData.time,
        authorId: formData.authorId,
      },
    });

    return NextResponse.json(
      {
        message: "Scrim created successfully",
        scrim,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create scrim error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
