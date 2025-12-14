-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_songId_fkey" FOREIGN KEY ("songId") REFERENCES "LyricsContents"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
