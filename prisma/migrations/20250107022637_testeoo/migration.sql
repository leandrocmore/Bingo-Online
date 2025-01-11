/*
  Warnings:

  - You are about to drop the column `assasCkeckup` on the `Carrinho` table. All the data in the column will be lost.
  - Added the required column `carrinhoId` to the `AssasCkeckup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Carrinho" DROP CONSTRAINT "Carrinho_assasCkeckup_fkey";

-- AlterTable
ALTER TABLE "AssasCkeckup" ADD COLUMN     "carrinhoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Carrinho" DROP COLUMN "assasCkeckup";

-- AddForeignKey
ALTER TABLE "AssasCkeckup" ADD CONSTRAINT "AssasCkeckup_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho"("IdCarrinho") ON DELETE RESTRICT ON UPDATE CASCADE;
