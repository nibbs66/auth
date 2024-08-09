-- CreateIndex
CREATE INDEX "emailverify_expire_after_seconds_index" ON "EmailVerify"("updatedAt");

-- CreateIndex
CREATE INDEX "noncepair_expire_after_seconds_index" ON "NoncePair"("updatedAt");
