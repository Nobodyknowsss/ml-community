import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { error: "No active session" },
        { status: 401 }
      );
    }

    const user = JSON.parse(sessionCookie.value);

    return NextResponse.json(
      {
        message: "Session active",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      { error: "Invalid session" },
      { status: 401 }
    );
  }
}
