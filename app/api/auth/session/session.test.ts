import { GET } from "./route";
import { NextRequest } from "next/server";

describe("/api/auth/session", () => {
  it("should return user data if session is valid", async () => {
    const sessionData = JSON.stringify({
      id: 1,
      username: "testuser",
      name: "Test User",
    });

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/session"),
      {
        method: "GET",
        headers: {
          Cookie: `session=${sessionData}`,
        },
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Session active");
    expect(data.user.username).toBe("testuser");
    expect(data.user.id).toBe(1);
  });

  it("should return 401 if no session cookie", async () => {
    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/session"),
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("No active session");
  });

  it("should return 401 if session cookie is invalid JSON", async () => {
    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/session"),
      {
        method: "GET",
        headers: {
          Cookie: "session=invalid-json-data",
        },
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Invalid session");
  });

  it("should not return password in session data", async () => {
    const sessionData = JSON.stringify({
      id: 1,
      username: "testuser",
      name: "Test User",
    });

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/session"),
      {
        method: "GET",
        headers: {
          Cookie: `session=${sessionData}`,
        },
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(data.user.password).toBeUndefined();
  });
});
