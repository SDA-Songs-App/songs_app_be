/*
  Warnings:

  - You are about to drop the column `contentId` on the `Lyrics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lyrics" DROP CONSTRAINT "Lyrics_contentId_fkey";

-- AlterTable
ALTER TABLE "Lyrics" DROP COLUMN "contentId";

-- CreateTable
CREATE TABLE "_LyricsToLyricsContents" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LyricsToLyricsContents_AB_unique" ON "_LyricsToLyricsContents"("A", "B");

-- CreateIndex
CREATE INDEX "_LyricsToLyricsContents_B_index" ON "_LyricsToLyricsContents"("B");

-- AddForeignKey
ALTER TABLE "_LyricsToLyricsContents" ADD CONSTRAINT "_LyricsToLyricsContents_A_fkey" FOREIGN KEY ("A") REFERENCES "Lyrics"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LyricsToLyricsContents" ADD CONSTRAINT "_LyricsToLyricsContents_B_fkey" FOREIGN KEY ("B") REFERENCES "LyricsContents"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
