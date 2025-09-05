-- AlterTable
ALTER TABLE "LyricsContents" ADD COLUMN     "languageKey" TEXT;

-- CreateTable
CREATE TABLE "Localizations" (
    "Id" SERIAL NOT NULL,
    "language_key" TEXT NOT NULL,
    "Header" TEXT NOT NULL,
    "notFound" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "CopyErrorTitle" TEXT NOT NULL,
    "CopyErrorDescription" TEXT NOT NULL,
    "LyricsCopiedTitle" TEXT NOT NULL,
    "LyricsCopiedDescription" TEXT NOT NULL,

    CONSTRAINT "Localizations_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Localizations_language_key_key" ON "Localizations"("language_key");

-- AddForeignKey
ALTER TABLE "LyricsContents" ADD CONSTRAINT "LyricsContents_languageKey_fkey" FOREIGN KEY ("languageKey") REFERENCES "Localizations"("language_key") ON DELETE SET NULL ON UPDATE CASCADE;
