/*
  Warnings:

  - You are about to drop the `teamuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `teamuser` DROP FOREIGN KEY `TeamUser_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `teamuser` DROP FOREIGN KEY `TeamUser_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `teamId` INTEGER NULL;

-- DropTable
DROP TABLE `teamuser`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
