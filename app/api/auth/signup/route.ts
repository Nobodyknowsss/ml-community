import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { SignupFormData } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const formData: SignupFormData = await req.json();

    // Validate input
    if (!formData.username || !formData.password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 },
      );
    }

    if (formData.password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    if (!formData.mlbbId) {
      return NextResponse.json(
        { error: "MLBB ID is required" },
        { status: 400 },
      );
    }

    if (formData.password !== formData.passwordConfirm) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: formData.username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await hash(formData.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username: formData.username,
        password: hashedPassword,
        mlbbId: formData.mlbbId,
        currentRank: formData.currentRank,
        currentRankStars: formData.currentRankStars,
        peakRank: formData.peakRank,
        peakRankStars: formData.peakRankStars,
        role: formData.role,
        totalMatches: formData.totalMatches,
        winRate: formData.winRate,
        fbLink: formData.fbLink || null,
        avatarUrl: formData.avatarUrl || null,
      },
    });

    // Don't return the password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
