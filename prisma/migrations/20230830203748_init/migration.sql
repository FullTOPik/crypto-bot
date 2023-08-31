-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegramId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "userName" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "txID" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "amountUSD" INTEGER NOT NULL,
    "toAddress" TEXT NOT NULL DEFAULT '',
    "ownewAddress" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_txID_key" ON "Transaction"("txID");
