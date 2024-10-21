/*
  Warnings:

  - Added the required column `type` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `session` ADD COLUMN `type` ENUM('ACCESS', 'REFRESH') NOT NULL;
