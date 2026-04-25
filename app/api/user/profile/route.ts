import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const {
      username,
      ign,
      mlbbId,
      currentRank,
      peakRank,
      role,
      totalMatches,
      winRate,
      fbLink,
      avatarUrl,
    } = await req.json();

    // Validate required fields
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 },
      );
    }

    if (!mlbbId) {
      return NextResponse.json(
        { error: "MLBB ID is required" },
        { status: 400 },
      );
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { username },
    });

    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user profile (username is permanent and cannot be edited)
    const updatedUser = await prisma.user.update({
      where: { username },
      data: {
        ign: ign || userExists.ign,
        mlbbId,
        currentRank: currentRank || "Warrior",
        peakRank: peakRank || "Warrior",
        role: role || "Mid",
        totalMatches: totalMatches || 0,
        winRate: winRate || 0,
        fbLink: fbLink || null,
        avatarUrl: avatarUrl || null,
      },
    });

    // Don't return password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: userWithoutPassword,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
