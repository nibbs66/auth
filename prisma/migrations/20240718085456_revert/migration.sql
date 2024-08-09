-- AlterTable
ALTER TABLE "EmailVerify" ALTER COLUMN "public_key" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "U2F" ALTER COLUMN "public_key" SET DATA TYPE TEXT;
