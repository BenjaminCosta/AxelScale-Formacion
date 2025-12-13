-- Migration script to add admin fields to User table
-- Run this after deploying to production

ALTER TABLE `User` 
  ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'USER',
  ADD COLUMN `name` VARCHAR(191) NULL,
  ADD COLUMN `phone` VARCHAR(191) NULL;

-- Set the super admin
UPDATE `User` SET `role` = 'ADMIN' WHERE `email` = 'benjacostm100@gmail.com';
