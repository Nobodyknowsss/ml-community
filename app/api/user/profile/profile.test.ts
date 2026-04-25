import { PUT } from "./route";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe("/api/user/profile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("PUT - Update Profile", () => {
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

    const updateData = {
      username: "testuser",
      ign: "UpdatedIGN",
      mlbbId: "987654321",
      currentRank: "Mythic",
      peakRank: "Mythic Immortal",
      role: "Jungle",
      totalMatches: 150,
      winRate: 72.5,
      fbLink: "https://facebook.com/profile",
      avatarUrl: "https://example.com/avatar.jpg",
    };

    it("should update profile successfully with valid data", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        ign: "UpdatedIGN",
        mlbbId: "987654321",
        currentRank: "Mythic",
        peakRank: "Mythic Immortal",
        role: "Jungle",
        totalMatches: 150,
        winRate: 72.5,
        fbLink: "https://facebook.com/profile",
        avatarUrl: "https://example.com/avatar.jpg",
      });

      const req = new NextRequest("http://localhost:3000/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      const response = await PUT(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Profile updated successfully");
      expect(data.user.username).toBe("testuser"); // Username should not change
      expect(data.user.ign).toBe("UpdatedIGN");
      expect(data.user).not.toHaveProperty("password");
    });

    it("should return 400 if username is missing", async () => {
      const invalidData = { ...updateData, username: undefined };

      const req = new NextRequest("http://localhost:3000/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(invalidData),
      });

      const response = await PUT(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Username is required");
    });

    it("should return 400 if mlbbId is missing", async () => {
      const invalidData = { ...updateData, mlbbId: "" };

      const req = new NextRequest("http://localhost:3000/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(invalidData),
      });

      const response = await PUT(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("MLBB ID is required");
    });

    it("should return 404 if user does not exist", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const req = new NextRequest("http://localhost:3000/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      const response = await PUT(req);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe("User not found");
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it("should return 500 on database error", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.user.update as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const req = new NextRequest("http://localhost:3000/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      const response = await PUT(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Internal server error");
    });

    it("should preserve user ign if not provided", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const dataWithoutIGN = { ...updateData, ign: undefined };

      const req = new NextRequest("http://localhost:3000/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(dataWithoutIGN),
      });

      const response = await PUT(req);

      expect(response.status).toBe(200);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { username: "testuser" },
        data: expect.objectContaining({
          ign: mockUser.ign,
        }),
      });
    });

    it("should use default values for optional fields", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const minimalData = {
        username: "newuser",
        mlbbId: "111111111",
      };

      const req = new NextRequest("http://localhost:3000/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(minimalData),
      });

      const response = await PUT(req);

      expect(response.status).toBe(200);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { username: "newuser" },
        data: expect.objectContaining({
          currentRank: "Warrior",
          peakRank: "Warrior",
          role: "Mid",
          totalMatches: 0,
          winRate: 0,
          fbLink: null,
          avatarUrl: null,
        }),
      });
    });

    it("should not return password in response", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        ...updateData,
      });

      const req = new NextRequest("http://localhost:3000/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      const response = await PUT(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user).not.toHaveProperty("password");
      expect(data.user).toHaveProperty("id");
      expect(data.user).toHaveProperty("username");
    });

    it("should handle all valid rank updates", async () => {
      const ranks = [
        "Warrior",
        "Elite",
        "Master",
        "Grand Master",
        "Epic",
        "Legend",
        "Mythic",
        "Mythic Honor",
        "Mythic Glory",
        "Mythic Immortal",
      ];

      for (const rank of ranks) {
        jest.clearAllMocks();
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
        (prisma.user.update as jest.Mock).mockResolvedValue({
          ...mockUser,
          currentRank: rank,
        });

        const data = { ...updateData, currentRank: rank };
        const req = new NextRequest("http://localhost:3000/api/user/profile", {
          method: "PUT",
          body: JSON.stringify(data),
        });

        const response = await PUT(req);
        const responseData = await response.json();

        expect(response.status).toBe(200);
      }
    });
  });
});
