import { GET } from "./route";
import { prisma } from "@/lib/prisma";

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    scrim: {
      findMany: jest.fn(),
    },
  },
}));

describe("/api/scrim/list", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET - List Scrims", () => {
    const mockScrims = [
      {
        id: 1,
        squadType: "Full Squad",
        teamName: "Alpha Squad",
        teamLogo: null,
        minRank: "Legend",
        maxRank: "Mythic Immortal",
        gameFormat: "Games",
        gameCount: 3,
        date: "2026-04-26",
        time: "20:00",
        authorId: 1,
        createdAt: new Date("2026-04-25"),
        updatedAt: new Date("2026-04-25"),
        author: {
          id: 1,
          username: "player1",
          ign: "PlayerIGN",
        },
      },
      {
        id: 2,
        squadType: "Open Squad",
        teamName: "Beta Team",
        teamLogo: null,
        minRank: "Epic",
        maxRank: "Mythic",
        gameFormat: "Best of",
        gameCount: 5,
        date: "2026-04-27",
        time: "19:00",
        authorId: 2,
        createdAt: new Date("2026-04-25"),
        updatedAt: new Date("2026-04-25"),
        author: {
          id: 2,
          username: "player2",
          ign: "AnotherIGN",
        },
      },
    ];

    it("should retrieve all scrims successfully", async () => {
      (prisma.scrim.findMany as jest.Mock).mockResolvedValue(mockScrims);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Scrims retrieved successfully");
      expect(data.scrims).toHaveLength(2);
      expect(data.scrims[0]).toMatchObject({
        id: 1,
        squadType: "Full Squad",
        teamName: "Alpha Squad",
        minRank: "Legend",
        maxRank: "Mythic Immortal",
      });
      expect(data.scrims[1]).toMatchObject({
        id: 2,
        squadType: "Open Squad",
        teamName: "Beta Team",
        minRank: "Epic",
        maxRank: "Mythic",
      });
    });

    it("should include author information with each scrim", async () => {
      (prisma.scrim.findMany as jest.Mock).mockResolvedValue(mockScrims);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      data.scrims.forEach((scrim: (typeof mockScrims)[0]) => {
        expect(scrim.author).toBeDefined();
        expect(scrim.author.username).toBeDefined();
        expect(scrim.author.ign).toBeDefined();
      });
    });

    it("should return empty array when no scrims exist", async () => {
      (prisma.scrim.findMany as jest.Mock).mockResolvedValue([]);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.scrims).toEqual([]);
    });

    it("should order scrims by creation date (newest first)", async () => {
      (prisma.scrim.findMany as jest.Mock).mockResolvedValue(mockScrims);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(prisma.scrim.findMany).toHaveBeenCalledWith({
        include: {
          author: {
            select: {
              id: true,
              username: true,
              ign: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    it("should return 500 on database error", async () => {
      (prisma.scrim.findMany as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Internal server error");
    });

    it("should include all scrim fields in response", async () => {
      (prisma.scrim.findMany as jest.Mock).mockResolvedValue(mockScrims);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      data.scrims.forEach((scrim: (typeof mockScrims)[0]) => {
        expect(scrim).toHaveProperty("id");
        expect(scrim).toHaveProperty("squadType");
        expect(scrim).toHaveProperty("teamName");
        expect(scrim).toHaveProperty("minRank");
        expect(scrim).toHaveProperty("maxRank");
        expect(scrim).toHaveProperty("gameFormat");
        expect(scrim).toHaveProperty("gameCount");
        expect(scrim).toHaveProperty("date");
        expect(scrim).toHaveProperty("time");
      });
    });

    it("should handle multiple scrims from same author", async () => {
      const samAuthorScrims = [
        mockScrims[0],
        { ...mockScrims[1], authorId: 1 },
      ];
      (prisma.scrim.findMany as jest.Mock).mockResolvedValue(samAuthorScrims);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.scrims).toHaveLength(2);
    });
  });
});
