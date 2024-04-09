-- DropIndex
DROP INDEX "Option_voteId_key";

-- AlterTable
ALTER TABLE "Option" ALTER COLUMN "count" SET DEFAULT 0;
