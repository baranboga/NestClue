/*
  Warnings:

  - Made the column `question1` on table `questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `question2` on table `questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `question3` on table `questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lat` on table `questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lng` on table `questions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "question1" SET NOT NULL,
ALTER COLUMN "question2" SET NOT NULL,
ALTER COLUMN "question3" SET NOT NULL,
ALTER COLUMN "lat" SET NOT NULL,
ALTER COLUMN "lng" SET NOT NULL;
