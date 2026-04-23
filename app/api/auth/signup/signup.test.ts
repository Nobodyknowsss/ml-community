import { POST } from "@/app/api/auth/signup/route";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest } from "next/server";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs");

describe("/api/auth/signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user with all fields", async () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      password: "hashed_password_123",
      name: null,
      mlbbId: "12345678",
      currentRank: "Epic",
      currentRankStars: 50,
      peakRank: "Legend",
      peakRankStars: 75,
      role: "Mid",
      totalMatches: 100,
      winRate: 52.5,
      fbLink: "https://facebook.com/testuser",
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      posts: [],
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
          passwordConfirm: "password123",
          mlbbId: "12345678",
          currentRank: "Epic",
          currentRankStars: 50,
          peakRank: "Legend",
          peakRankStars: 75,
          role: "Mid",
          totalMatches: 100,
          winRate: 52.5,
          fbLink: "https://facebook.com/testuser",
          avatarUrl: "",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe("User created successfully");
    expect(data.user.username).toBe("testuser");
    expect(data.user.mlbbId).toBe("12345678");
    expect(data.user.password).toBeUndefined();
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
          passwordConfirm: "short",
          mlbbId: "12345678",
          currentRank: "Epic",
          currentRankStars: 50,
          peakRank: "Legend",
          peakRankStars: 75,
          role: "Mid",
          totalMatches: 100,
          winRate: 52.5,
          fbLink: "",
          avatarUrl: "",
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
      mlbbId: "12345678",
    });

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/signup"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "testuser",
          password: "password123",
          passwordConfirm: "password123",
          mlbbId: "87654321",
          currentRank: "Epic",
          currentRankStars: 50,
          peakRank: "Legend",
          peakRankStars: 75,
          role: "Mid",
          totalMatches: 100,
          winRate: 52.5,
          fbLink: "",
          avatarUrl: "",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.error).toBe("Username already taken");
  });

  it("should return 400 when MLBB ID is missing", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/signup"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "testuser",
          password: "password123",
          passwordConfirm: "password123",
          mlbbId: "",
          currentRank: "Epic",
          currentRankStars: 50,
          peakRank: "Legend",
          peakRankStars: 75,
          role: "Mid",
          totalMatches: 100,
          winRate: 52.5,
          fbLink: "",
          avatarUrl: "",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("MLBB ID is required");
  });

  it("should return 400 when passwords do not match", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest(
      new URL("http://localhost:3000/api/auth/signup"),
      {
        method: "POST",
        body: JSON.stringify({
          username: "testuser",
          password: "password123",
          passwordConfirm: "password456",
          mlbbId: "12345678",
          currentRank: "Epic",
          currentRankStars: 50,
          peakRank: "Legend",
          peakRankStars: 75,
          role: "Mid",
          totalMatches: 100,
          winRate: 52.5,
          fbLink: "",
          avatarUrl: "",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Passwords do not match");
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
          passwordConfirm: "password123",
          mlbbId: "12345678",
          currentRank: "Epic",
          currentRankStars: 50,
          peakRank: "Legend",
          peakRankStars: 75,
          role: "Mid",
          totalMatches: 100,
          winRate: 52.5,
          fbLink: "",
          avatarUrl: "",
        }),
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Internal server error");
  });
});
