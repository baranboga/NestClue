/*
  Warnings:

  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_categoryId_fkey";

-- DropTable
DROP TABLE "bookmarks";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "questions";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "nodes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isEnd" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "choices" (
    "id" SERIAL NOT NULL,
    "choiceText" TEXT NOT NULL,
    "nodeId" INTEGER NOT NULL,
    "nextNodeId" INTEGER,

    CONSTRAINT "choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_progress" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "currentNodeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "choices" ADD CONSTRAINT "choices_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choices" ADD CONSTRAINT "choices_nextNodeId_fkey" FOREIGN KEY ("nextNodeId") REFERENCES "nodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_progress" ADD CONSTRAINT "player_progress_currentNodeId_fkey" FOREIGN KEY ("currentNodeId") REFERENCES "nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
