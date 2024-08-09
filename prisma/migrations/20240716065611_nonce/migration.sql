-- RenameIndex
ALTER INDEX "emailverify_expire_after_seconds_index" RENAME TO "EmailVerify_updatedAt";

-- RenameIndex
ALTER INDEX "noncepair_expire_after_seconds_index" RENAME TO "NoncePair_updatedAt";
