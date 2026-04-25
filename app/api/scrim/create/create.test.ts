import { POST } from "./route";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    scrim: {
      create: jest.fn(),
    },
  },
}));

describe("/api/scrim/create", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST - Create Scrim", () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      password: "hashedpwd",
      ign: "TestIGN",
      mlbbId: "123456789",
      currentRank: "Legend",
      peakRank: "Mythic",
      role: "Mid",
      totalMatches: 100,
      winRate: 65.5,
      fbLink: null,
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockScrimData = {
      squadType: "full",
      teamName: "Alpha Squad",
      teamLogo: "data:image/png;base64,iVBORw0KGgo=",
      minRank: "Legend",
      maxRank: "Mythic Immortal",
      gameFormat: "Games",
      gameCount: 3,
      date: "2026-04-26",
      time: "20:00",
      authorId: 1,
    };

    const mockCreatedScrim = {
      id: 1,
      ...mockScrimData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it("should create a scrim successfully with valid data", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.scrim.create as jest.Mock).mockResolvedValue(mockCreatedScrim);

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(mockScrimData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.message).toBe("Scrim created successfully");
      expect(data.scrim).toMatchObject({
        id: 1,
        squadType: "full",
        teamName: "Alpha Squad",
        minRank: "Legend",
        maxRank: "Mythic Immortal",
        gameFormat: "Games",
        gameCount: 3,
        date: "2026-04-26",
        time: "20:00",
        authorId: 1,
      });
      expect(prisma.scrim.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          squadType: "full",
          teamName: "Alpha Squad",
          minRank: "Legend",
          maxRank: "Mythic Immortal",
        }),
      });
    });

    it("should return 400 if team name is missing", async () => {
      const invalidData = { ...mockScrimData, teamName: "" };

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(invalidData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Team name is required");
    });

    it("should return 400 if date is missing", async () => {
      const invalidData = { ...mockScrimData, date: "" };

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(invalidData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is required");
    });

    it("should return 400 if time is missing", async () => {
      const invalidData = { ...mockScrimData, time: "" };

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(invalidData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Time is required");
    });

    it("should return 401 if authorId is missing", async () => {
      const invalidData = { ...mockScrimData };
      delete (invalidData as any).authorId;

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(invalidData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe("User authentication required");
    });

    it("should return 400 if minRank is missing", async () => {
      const invalidData = { ...mockScrimData, minRank: "" };

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(invalidData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("All required fields must be filled");
    });

    it("should return 400 if maxRank is missing", async () => {
      const invalidData = { ...mockScrimData, maxRank: "" };

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(invalidData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("All required fields must be filled");
    });

    it("should return 400 if squadType is missing", async () => {
      const invalidData = { ...mockScrimData, squadType: "" };

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(invalidData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("All required fields must be filled");
    });

    it("should return 400 if gameFormat is missing", async () => {
      const invalidData = { ...mockScrimData, gameFormat: "" };

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(invalidData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("All required fields must be filled");
    });

    it("should return 400 if gameCount is below 1", async () => {
      const invalidData = { ...mockScrimData, gameCount: 0 };

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(invalidData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Game count must be between 1 and 100");
    });

    it("should return 400 if gameCount exceeds 100", async () => {
      const invalidData = { ...mockScrimData, gameCount: 101 };

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(invalidData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Game count must be between 1 and 100");
    });

    it("should return 404 if user does not exist", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(mockScrimData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe("User not found");
      expect(prisma.scrim.create).not.toHaveBeenCalled();
    });

    it("should return 500 on database error", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.scrim.create as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(mockScrimData),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Internal server error");
    });

    it("should handle all valid squadron types", async () => {
      for (const squadType of ["full", "open"]) {
        jest.clearAllMocks();
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
        (prisma.scrim.create as jest.Mock).mockResolvedValue({
          ...mockCreatedScrim,
          squadType,
        });

        const data = { ...mockScrimData, squadType };
        const req = new NextRequest("http://localhost:3000/api/scrim/create", {
          method: "POST",
          body: JSON.stringify(data),
        });

        const response = await POST(req);
        const responseData = await response.json();

        expect(response.status).toBe(201);
        expect(responseData.scrim.squadType).toBe(squadType);
      }
    });

    it("should handle all valid game formats", async () => {
      for (const gameFormat of ["Games", "Best of"]) {
        jest.clearAllMocks();
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
        (prisma.scrim.create as jest.Mock).mockResolvedValue({
          ...mockCreatedScrim,
          gameFormat,
        });

        const data = { ...mockScrimData, gameFormat };
        const req = new NextRequest("http://localhost:3000/api/scrim/create", {
          method: "POST",
          body: JSON.stringify(data),
        });

        const response = await POST(req);
        const responseData = await response.json();

        expect(response.status).toBe(201);
        expect(responseData.scrim.gameFormat).toBe(gameFormat);
      }
    });

    it("should accept optional teamLogo as null", async () => {
      const dataWithoutLogo = { ...mockScrimData, teamLogo: undefined };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.scrim.create as jest.Mock).mockResolvedValue({
        ...mockCreatedScrim,
        teamLogo: null,
      });

      const req = new NextRequest("http://localhost:3000/api/scrim/create", {
        method: "POST",
        body: JSON.stringify(dataWithoutLogo),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.scrim.teamLogo).toBeNull();
    });

    it("should store gameCount within valid range (1-100)", async () => {
      const testCases = [1, 5, 50, 100];

      for (const count of testCases) {
        jest.clearAllMocks();
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
        (prisma.scrim.create as jest.Mock).mockResolvedValue({
          ...mockCreatedScrim,
          gameCount: count,
        });

        const data = { ...mockScrimData, gameCount: count };
        const req = new NextRequest("http://localhost:3000/api/scrim/create", {
          method: "POST",
          body: JSON.stringify(data),
        });

        const response = await POST(req);
        const responseData = await response.json();

        expect(response.status).toBe(201);
        expect(responseData.scrim.gameCount).toBe(count);
      }
    });
  });
});
