/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentRank" TEXT NOT NULL DEFAULT 'Warrior',
ADD COLUMN     "currentRankStars" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fbLink" TEXT,
ADD COLUMN     "mlbbId" TEXT,
ADD COLUMN     "peakRank" TEXT NOT NULL DEFAULT 'Warrior',
ADD COLUMN     "peakRankStars" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'Mid',
ADD COLUMN     "totalMatches" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "winRate" DOUBLE PRECISION NOT NULL DEFAULT 0;
