/*
  Warnings:

  - You are about to drop the `_LyricsToLyricsContents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LyricsToLyricsContents" DROP CONSTRAINT "_LyricsToLyricsContents_A_fkey";

-- DropForeignKey
ALTER TABLE "_LyricsToLyricsContents" DROP CONSTRAINT "_LyricsToLyricsContents_B_fkey";

-- AlterTable
ALTER TABLE "LyricsContents" ADD COLUMN     "lyricsId" INTEGER;

-- DropTable
DROP TABLE "_LyricsToLyricsContents";

-- AddForeignKey
ALTER TABLE "LyricsContents" ADD CONSTRAINT "LyricsContents_lyricsId_fkey" FOREIGN KEY ("lyricsId") REFERENCES "Lyrics"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
