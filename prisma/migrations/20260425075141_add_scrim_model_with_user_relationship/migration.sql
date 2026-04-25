-- CreateTable
CREATE TABLE "Scrim" (
    "id" SERIAL NOT NULL,
    "squadType" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "teamLogo" TEXT,
    "minRank" TEXT NOT NULL,
    "maxRank" TEXT NOT NULL,
    "gameFormat" TEXT NOT NULL,
    "gameCount" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scrim_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scrim" ADD CONSTRAINT "Scrim_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
