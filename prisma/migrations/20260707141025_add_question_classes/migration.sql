/*
  Warnings:

  - You are about to drop the column `class` on the `questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `questions` DROP COLUMN `class`;

-- CreateTable
CREATE TABLE `question_classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `class` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,

    UNIQUE INDEX `question_classes_questionId_class_key`(`questionId`, `class`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `question_classes` ADD CONSTRAINT `question_classes_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
