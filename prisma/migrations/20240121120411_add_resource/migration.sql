/*
  Warnings:

  - You are about to alter the column `create_time` on the `admin_users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modify_time` on the `admin_users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_time` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modify_time` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_time` on the `category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modify_time` on the `category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_time` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `remind_time` on the `notices` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_time` on the `notices` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_time` on the `replies` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_time` on the `resources` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modif_time` on the `resources` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_time` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modify_time` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `sign_up_time` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `category_name` to the `resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_status` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin_users` MODIFY `create_time` DATETIME NOT NULL,
    MODIFY `modify_time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `articles` MODIFY `create_time` DATETIME NOT NULL,
    MODIFY `modify_time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `category` MODIFY `create_time` DATETIME NOT NULL,
    MODIFY `modify_time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `comments` MODIFY `create_time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `notices` MODIFY `remind_time` DATETIME NOT NULL,
    MODIFY `create_time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `replies` MODIFY `create_time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `resources` ADD COLUMN `category_name` BIGINT NOT NULL,
    ADD COLUMN `category_status` BIGINT NOT NULL,
    MODIFY `create_time` DATETIME NOT NULL,
    MODIFY `modif_time` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `create_time` DATETIME NOT NULL,
    MODIFY `modify_time` DATETIME NOT NULL,
    MODIFY `sign_up_time` DATETIME NOT NULL;
