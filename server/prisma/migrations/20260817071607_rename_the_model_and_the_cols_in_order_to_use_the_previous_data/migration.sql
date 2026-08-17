/*
  Warnings:

  - You are about to drop the column `current_address` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `goals` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `driver` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "current_address",
DROP COLUMN "goals",
DROP COLUMN "phone",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "growth_goals" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "terms_agreed" BOOLEAN DEFAULT false;

-- DropTable
DROP TABLE "driver";
