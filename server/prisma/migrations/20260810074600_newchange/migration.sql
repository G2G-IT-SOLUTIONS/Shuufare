/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "document" DROP CONSTRAINT "document_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "training" DROP CONSTRAINT "training_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_driver_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "accessibility" TEXT,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "alt_phone_number" TEXT,
ADD COLUMN     "is_employed" TEXT,
ADD COLUMN     "fcn_number" TEXT,
ADD COLUMN     "future_opportunities" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "goals" TEXT,
ADD COLUMN     "has_license" TEXT,
ADD COLUMN     "referral_source" TEXT,
ADD COLUMN     "license_file_path" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "ride_experience" TEXT,
ADD COLUMN     "ride_platform" TEXT,
ADD COLUMN     "targa_number" TEXT,
ADD COLUMN     "till_number" TEXT;

-- DropTable
DROP TABLE "admin";

-- DropTable
DROP TABLE "application";

-- DropTable
DROP TABLE "document";

-- DropTable
DROP TABLE "training";

-- DropTable
DROP TABLE "vehicle";
