-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Borrow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "userScore" INTEGER,
    "borrowDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" DATETIME,
    CONSTRAINT "Borrow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Borrow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE INDEX "Book_name_idx" ON "Book"("name");

-- CreateIndex
CREATE INDEX "Borrow_bookId_idx" ON "Borrow"("bookId");

-- CreateIndex
CREATE INDEX "Borrow_bookId_userScore_idx" ON "Borrow"("bookId", "userScore");

-- CreateIndex
CREATE INDEX "Borrow_userId_idx" ON "Borrow"("userId");

-- CreateIndex
CREATE INDEX "Borrow_bookId_returnDate_idx" ON "Borrow"("bookId", "returnDate");
