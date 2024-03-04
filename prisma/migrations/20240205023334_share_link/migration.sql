-- CreateTable
CREATE TABLE "SongShareLink" (
    "id" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SongShareLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SongShareLink_value_key" ON "SongShareLink"("value");

-- AddForeignKey
ALTER TABLE "SongShareLink" ADD CONSTRAINT "SongShareLink_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
