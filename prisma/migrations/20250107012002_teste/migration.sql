/*
  Warnings:

  - Added the required column `encodedImage` to the `Carrinho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payload` to the `Carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carrinho" ADD COLUMN     "encodedImage" TEXT NOT NULL,
ADD COLUMN     "payload" TEXT NOT NULL;
