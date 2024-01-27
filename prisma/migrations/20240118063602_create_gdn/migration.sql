-- CreateTable
CREATE TABLE `admin_users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `role` TINYINT NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `create_time` DATETIME NOT NULL,
    `modify_time` DATETIME NOT NULL,
    `modifier_id` BIGINT NOT NULL,
    `modifier_nickname` VARCHAR(20) NOT NULL,
    `modifier_avatar` VARCHAR(255) NOT NULL,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `author_id` BIGINT NOT NULL,
    `author_nickname` VARCHAR(20) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `click_count` INTEGER NOT NULL DEFAULT 0,
    `comment_count` INTEGER NOT NULL DEFAULT 0,
    `like_count` INTEGER NOT NULL DEFAULT 0,
    `widget` INTEGER NOT NULL DEFAULT 0,
    `create_time` DATETIME NOT NULL,
    `modify_time` DATETIME NOT NULL,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,
    `status` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(10) NOT NULL,
    `widget` INTEGER NOT NULL,
    `create_time` DATETIME NOT NULL,
    `modify_time` DATETIME NOT NULL,
    `founder` BIGINT NOT NULL,
    `modifier` BIGINT NOT NULL,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,
    `description` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `author_id` BIGINT NOT NULL,
    `author_nickname` VARCHAR(50) NOT NULL,
    `author_avatar` VARCHAR(255) NOT NULL,
    `article_id` BIGINT NOT NULL,
    `create_time` DATETIME NOT NULL,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `replies` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `author_id` BIGINT NOT NULL,
    `author_nickname` VARCHAR(50) NOT NULL,
    `author_avatar` VARCHAR(255) NOT NULL,
    `article_id` BIGINT NOT NULL,
    `create_time` DATETIME NOT NULL,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,
    `reply_id` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notices` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(10) NOT NULL,
    `source_id` BIGINT NOT NULL,
    `source_type` TINYINT NOT NULL,
    `source_content` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `state` TINYINT NOT NULL DEFAULT 0,
    `sender_id` BIGINT NOT NULL,
    `sender_nickname` VARCHAR(20) NOT NULL,
    `sender_avatar` VARCHAR(255) NOT NULL,
    `recipient_id` BIGINT NOT NULL,
    `remind_time` DATETIME NOT NULL,
    `create_time` DATETIME NOT NULL,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resources` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `create_time` DATETIME NOT NULL,
    `modif_time` DATETIME NOT NULL,
    `founder` BIGINT NOT NULL,
    `modifier` BIGINT NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `cover` VARCHAR(255) NOT NULL,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `client_id` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `nickname` VARCHAR(20) NOT NULL,
    `create_time` DATETIME NOT NULL,
    `modify_time` DATETIME NOT NULL,
    `sign_up_time` DATETIME NOT NULL,
    `modifier` BIGINT NOT NULL,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,
    `status` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
