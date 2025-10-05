/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `currentPage` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Book` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - Made the column `genreId` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pages` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "pages" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "synopsis" TEXT,
    "cover" TEXT,
    "genreId" INTEGER NOT NULL,
    CONSTRAINT "Book_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("author", "cover", "genreId", "id", "pages", "rating", "synopsis", "title", "year") SELECT "author", "cover", "genreId", "id", "pages", "rating", "synopsis", "title", "year" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
