/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `callSign` VARCHAR(191) NULL,
    ADD COLUMN `externalId` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_externalId_key` ON `users`(`externalId`);
