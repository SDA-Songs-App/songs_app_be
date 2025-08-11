/*
  Warnings:

  - The `language` column on the `Lyrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LANGAUAGE" AS ENUM ('ENGLISH', 'SIDAMA', 'AFAAN_OROMO', 'AHMARIC', 'GURAGIGNA', 'KEMBATISSA', 'WOLAITA', 'TIGRIGNA', 'HADYIGNA', 'NEUR');

-- AlterTable
ALTER TABLE "Lyrics" DROP COLUMN "language",
ADD COLUMN     "language" "LANGAUAGE" NOT NULL DEFAULT 'ENGLISH';
