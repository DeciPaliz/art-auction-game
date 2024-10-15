-- CreateTable
CREATE TABLE "Game" (
    "hostId" INTEGER NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "hash" TEXT,
    "currentTurn" INTEGER,
    "currentRound" INTEGER,
    "trend" INTEGER[],
    "currentAuctionTurn" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("hostId")
);

-- CreateTable
CREATE TABLE "PlayerInfo" (
    "id" INTEGER NOT NULL,
    "turnOrder" INTEGER,
    "gameId" INTEGER NOT NULL,
    "money" INTEGER,
    "bid" INTEGER,

    CONSTRAINT "PlayerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "isPainting" BOOLEAN,
    "auctionedInId" INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_auctionedInId_key" ON "Card"("auctionedInId");

-- AddForeignKey
ALTER TABLE "PlayerInfo" ADD CONSTRAINT "PlayerInfo_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerInfo" ADD CONSTRAINT "PlayerInfo_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("hostId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "PlayerInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_auctionedInId_fkey" FOREIGN KEY ("auctionedInId") REFERENCES "Game"("hostId") ON DELETE CASCADE ON UPDATE CASCADE;
