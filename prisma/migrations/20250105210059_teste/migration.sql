/*
  Warnings:

  - The primary key for the `Carrinho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[IdCarrinho]` on the table `Carrinho` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Carrinho" DROP CONSTRAINT "Carrinho_pkey",
ALTER COLUMN "IdCarrinho" DROP DEFAULT,
ALTER COLUMN "IdCarrinho" SET DATA TYPE TEXT,
ADD CONSTRAINT "Carrinho_pkey" PRIMARY KEY ("IdCarrinho");
DROP SEQUENCE "Carrinho_IdCarrinho_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Carrinho_IdCarrinho_key" ON "Carrinho"("IdCarrinho");
