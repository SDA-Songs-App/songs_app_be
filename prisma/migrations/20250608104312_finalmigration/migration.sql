/*
  Warnings:

  - The values [NEUR] on the enum `LANGAUAGE` will be removed. If these variants are still used in the database, this will fail.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CATEGORY" AS ENUM ('THANKSGIVING', 'CONFESS', 'PRAISE', 'PRAYER', 'CHRISTIAN_LIVING', 'DEVOTIONAL', 'WORSHIP', 'TESTMONY', 'MICSELLANOUS');

-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('ADMIN', 'SUPER_ADMIN', 'GUEST');

-- AlterEnum
BEGIN;
CREATE TYPE "LANGAUAGE_new" AS ENUM ('ENGLISH', 'SIDAMA', 'AFAAN_OROMO', 'AHMARIC', 'GURAGIGNA', 'KEMBATISSA', 'WOLAITA', 'TIGRIGNA', 'HADYIGNA', 'NUER');
ALTER TABLE "Lyrics" ALTER COLUMN "language" DROP DEFAULT;
ALTER TABLE "Lyrics" ALTER COLUMN "language" TYPE "LANGAUAGE_new" USING ("language"::text::"LANGAUAGE_new");
ALTER TYPE "LANGAUAGE" RENAME TO "LANGAUAGE_old";
ALTER TYPE "LANGAUAGE_new" RENAME TO "LANGAUAGE";
DROP TYPE "LANGAUAGE_old";
ALTER TABLE "Lyrics" ALTER COLUMN "language" SET DEFAULT 'ENGLISH';
COMMIT;

-- DropForeignKey
ALTER TABLE "Lyrics" DROP CONSTRAINT "Lyrics_categoryId_fkey";

-- AlterTable
ALTER TABLE "Lyrics" ADD COLUMN     "Category" "CATEGORY" NOT NULL DEFAULT 'THANKSGIVING';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "ROLES" NOT NULL DEFAULT 'ADMIN';

-- DropTable
DROP TABLE "Category";
