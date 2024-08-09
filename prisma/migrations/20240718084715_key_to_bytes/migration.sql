/*
  Warnings:

  - Changed the type of `public_key` on the `EmailVerify` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `public_key` on the `U2F` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EmailVerify" DROP COLUMN "public_key",
ADD COLUMN     "public_key" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "U2F" DROP COLUMN "public_key",
ADD COLUMN     "public_key" BYTEA NOT NULL;
