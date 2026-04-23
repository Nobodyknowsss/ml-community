import { POST } from "@/app/api/auth/signup/route";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest } from "next/server";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs");

describe("/api/auth/signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user with hashed password", async () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      password: "hashed_password_123",
      name: "Test User",
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (hash as jest.Mock).mockResolvedValue("hashed_password_123");
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/signup"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "testuser",
          password: "password123",
          name: "Test User",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe("User created successfully");
    expect(data.user).toEqual({
      id: 1,
      username: "testuser",
      name: "Test User",
    });
    expect(data.user.password).toBeUndefined();
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        username: "testuser",
        password: "hashed_password_123",
        name: "Test User",
      },
    });
  });

  it("should return 400 when username is missing", async () => {
    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/signup"),
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
      new URL("http://localhost:3000/api/auth/signup"),
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

  it("should return 400 when password is less than 6 characters", async () => {
    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/signup"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "testuser",
          password: "short",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Password must be at least 6 characters");
  });

  it("should return 409 when username already exists", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      username: "testuser",
      password: "hashed_password",
      name: "Existing User",
    });

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/signup"),
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

    expect(response.status).toBe(409);
    expect(data.error).toBe("Username already taken");
  });

  it("should handle server errors gracefully", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(
      new Error("Database connection error"),
    );

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/signup"),
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

  it("should accept optional name field", async () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      password: "hashed_password_123",
      name: null,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (hash as jest.Mock).mockResolvedValue("hashed_password_123");
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/signup"),
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

    expect(response.status).toBe(201);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        username: "testuser",
        password: "hashed_password_123",
        name: null,
      },
    });
  });
});
