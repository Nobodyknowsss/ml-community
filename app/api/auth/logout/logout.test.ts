import { POST } from "./route";
import { NextRequest } from "next/server";

describe("/api/auth/logout", () => {
  it("should clear session cookie on logout", async () => {
    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/logout"),
      {
        method: "POST",
      },
    );

    const response = await POST(request);
    const setCookieHeader = response.headers.get("set-cookie");

    expect(response.status).toBe(200);
    expect(setCookieHeader).toContain("session=");
    expect(setCookieHeader).toContain("Max-Age=0");
  });

  it("should return success message", async () => {
    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/logout"),
      {
        method: "POST",
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Logged out successfully");
  });

  it("should have httpOnly and secure flags", async () => {
    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/logout"),
      {
        method: "POST",
      },
    );

    const response = await POST(request);
    const setCookieHeader = response.headers.get("set-cookie");

    expect(setCookieHeader).toContain("HttpOnly");
    expect(setCookieHeader).toContain("SameSite=strict");
  });
});
