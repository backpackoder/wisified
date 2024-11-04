/*
  Warnings:

  - You are about to drop the column `sources` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the `_CommentLikeToCommentReply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_createdById_fkey";

-- DropForeignKey
ALTER TABLE "_CommentLikeToCommentReply" DROP CONSTRAINT "_CommentLikeToCommentReply_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentLikeToCommentReply" DROP CONSTRAINT "_CommentLikeToCommentReply_B_fkey";

-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "createdById" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "sources",
ALTER COLUMN "createdById" DROP NOT NULL;

-- AlterTable
ALTER TABLE "QuoteTranslation" ADD COLUMN     "sources" TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "language" SET DEFAULT 'en';

-- DropTable
DROP TABLE "_CommentLikeToCommentReply";

-- CreateTable
CREATE TABLE "CommentReplyLike" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,

    CONSTRAINT "CommentReplyLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommentReplyLike_userId_replyId_key" ON "CommentReplyLike"("userId", "replyId");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReplyLike" ADD CONSTRAINT "CommentReplyLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReplyLike" ADD CONSTRAINT "CommentReplyLike_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "CommentReply"("id") ON DELETE CASCADE ON UPDATE CASCADE;
