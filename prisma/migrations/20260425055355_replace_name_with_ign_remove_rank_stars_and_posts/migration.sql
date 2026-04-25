/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `currentRankStars` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `peakRankStars` on the `User` table. All the data in the column will be lost.
  - Added the required column `ign` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentRankStars",
DROP COLUMN "name",
DROP COLUMN "peakRankStars",
ADD COLUMN     "ign" TEXT NOT NULL;
