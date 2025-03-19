/*
  Warnings:

  - Made the column `priority` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `priority` ENUM('LOW', 'NORMAL', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'NORMAL';
