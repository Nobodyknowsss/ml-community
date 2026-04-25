import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Protected routes that require authentication
  const protectedRoutes = ["/profile", "/chat", "/create"];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute) {
    // Check if session cookie exists
    const sessionCookie = req.cookies.get("session");

    // If no session, redirect to signin
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
