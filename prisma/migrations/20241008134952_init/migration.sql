-- CreateTable
CREATE TABLE "Artist" (
    "Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "LyricsContents" (
    "Id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "chorus" TEXT NOT NULL,
    "verse1" TEXT NOT NULL,
    "verse2" TEXT NOT NULL,
    "verse3" TEXT NOT NULL,
    "verse4" TEXT NOT NULL,
    "verse5" TEXT NOT NULL,
    "verse6" TEXT NOT NULL,

    CONSTRAINT "LyricsContents_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Lyrics" (
    "Id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "audioFileUrl" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lyrics_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Album" (
    "Id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "coverImageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Category" (
    "Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "Id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "lyricsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Lyrics" ADD CONSTRAINT "Lyrics_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lyrics" ADD CONSTRAINT "Lyrics_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lyrics" ADD CONSTRAINT "Lyrics_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lyrics" ADD CONSTRAINT "Lyrics_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "LyricsContents"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_lyricsId_fkey" FOREIGN KEY ("lyricsId") REFERENCES "Lyrics"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
