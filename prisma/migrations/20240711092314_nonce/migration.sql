-- CreateTable
CREATE TABLE "NoncePair" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nonce" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoncePair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NoncePair_nonce_key" ON "NoncePair"("nonce");

-- CreateIndex
CREATE UNIQUE INDEX "NoncePair_data_key" ON "NoncePair"("data");
