/*
  Warnings:

  - The `language` column on the `Lyrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `Category` column on the `Lyrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LANGAUAGES" AS ENUM ('ENGLISH', 'SIDAMA', 'AFAAN_OROMO', 'AHMARIC', 'GURAGIGNA', 'KEMBATISSA', 'WOLAITA', 'TIGRIGNA', 'HADYIGNA', 'NUER');

-- CreateEnum
CREATE TYPE "CATEGORIES" AS ENUM ('THANKSGIVING', 'CONFESS', 'PRAISE', 'PRAYER', 'CHRISTIAN_LIVING', 'DEVOTIONAL', 'WORSHIP', 'TESTMONY', 'MICSELLANOUS');

-- AlterTable
ALTER TABLE "Lyrics" DROP COLUMN "language",
ADD COLUMN     "language" "LANGAUAGES" NOT NULL DEFAULT 'ENGLISH',
DROP COLUMN "Category",
ADD COLUMN     "Category" "CATEGORIES" NOT NULL DEFAULT 'THANKSGIVING';

-- DropEnum
DROP TYPE "CATEGORY";

-- DropEnum
DROP TYPE "LANGAUAGE";
