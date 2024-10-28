/*
  Warnings:

  - You are about to drop the column `wikipediaLink` on the `Author` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "wikipediaLink";

-- AlterTable
ALTER TABLE "AuthorTranslation" ADD COLUMN     "wikipediaLink" TEXT;
