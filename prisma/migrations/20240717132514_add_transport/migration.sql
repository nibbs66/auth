-- AlterTable
ALTER TABLE "EmailVerify" ADD COLUMN     "transports" TEXT[];

-- AlterTable
ALTER TABLE "U2F" ADD COLUMN     "transports" TEXT[];
