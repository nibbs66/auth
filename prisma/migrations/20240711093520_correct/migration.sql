/*
  Warnings:

  - You are about to drop the column `authId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_authId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authId",
ADD COLUMN     "auth_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_auth_id_key" ON "User"("auth_id");
