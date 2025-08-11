/*
  Warnings:

  - The values [TESTMONY,MICSELLANOUS] on the enum `CATEGORIES` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `categoryId` on the `Lyrics` table. All the data in the column will be lost.
  - The `language` column on the `Lyrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `LastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LANGUAGES" AS ENUM ('ENGLISH', 'SIDAMA', 'AFAAN_OROMO', 'AMHARIC', 'GURAGIGNA', 'KEMBATISSA', 'WOLAITA', 'TIGRIGNA', 'HADYIGNA', 'NUER');

-- AlterEnum
BEGIN;
CREATE TYPE "CATEGORIES_new" AS ENUM ('THANKSGIVING', 'CONFESS', 'PRAISE', 'PRAYER', 'CHRISTIAN_LIVING', 'DEVOTIONAL', 'WORSHIP', 'TESTIMONY', 'MISCELLANEOUS');
ALTER TABLE "Lyrics" ALTER COLUMN "Category" DROP DEFAULT;
ALTER TABLE "Lyrics" ALTER COLUMN "Category" TYPE "CATEGORIES_new" USING ("Category"::text::"CATEGORIES_new");
ALTER TYPE "CATEGORIES" RENAME TO "CATEGORIES_old";
ALTER TYPE "CATEGORIES_new" RENAME TO "CATEGORIES";
DROP TYPE "CATEGORIES_old";
ALTER TABLE "Lyrics" ALTER COLUMN "Category" SET DEFAULT 'THANKSGIVING';
COMMIT;

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Lyrics" DROP COLUMN "categoryId",
DROP COLUMN "language",
ADD COLUMN     "language" "LANGUAGES" NOT NULL DEFAULT 'ENGLISH';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "LastName" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- DropEnum
DROP TYPE "LANGAUAGES";
