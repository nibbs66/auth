/*
  Warnings:

  - Added the required column `expiryAt` to the `EmailVerify` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryAt` to the `NoncePair` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailVerify" ADD COLUMN     "expiryAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "NoncePair" ADD COLUMN     "expiryAt" TIMESTAMP(3) NOT NULL;
