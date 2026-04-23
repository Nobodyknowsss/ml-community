import { POST } from "@/app/api/auth/login/route";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextRequest } from "next/server";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs");

describe("/api/auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully login with correct credentials", async () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      password: "hashed_password_123",
      name: "Test User",
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(true);

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/login"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "testuser",
          password: "password123",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Login successful");
    expect(data.user).toEqual({
      id: 1,
      username: "testuser",
      name: "Test User",
    });
    expect(data.user.password).toBeUndefined();
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: "testuser" },
    });
    expect(compare).toHaveBeenCalledWith("password123", "hashed_password_123");
  });

  it("should return 400 when username is missing", async () => {
    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/login"),
      {
        method: "POST",
        body: JSON.stringify({
          password: "password123",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Username and password are required");
  });

  it("should return 400 when password is missing", async () => {
    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/login"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "testuser",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Username and password are required");
  });

  it("should return 401 when user does not exist", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/login"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "nonexistent",
          password: "password123",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Invalid username or password");
  });

  it("should return 401 when password is incorrect", async () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      password: "hashed_password_123",
      name: "Test User",
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(false);

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/login"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "testuser",
          password: "wrongpassword",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Invalid username or password");
  });

  it("should not reveal if username or password was wrong", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/login"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "nonexistent",
          password: "password123",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    // Should use generic error message for security (prevents username enumeration)
    expect(data.error).toBe("Invalid username or password");
  });

  it("should handle server errors gracefully", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(
      new Error("Database connection error"),
    );

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/login"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "testuser",
          password: "password123",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Internal server error");
  });

  it("should handle password comparison errors", async () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      password: "hashed_password_123",
      name: "Test User",
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockRejectedValue(new Error("Comparison error"));

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/login"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "testuser",
          password: "password123",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Internal server error");
  });
});
