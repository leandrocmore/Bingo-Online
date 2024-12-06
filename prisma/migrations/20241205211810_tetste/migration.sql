/*
  Warnings:

  - A unique constraint covering the columns `[MapWinId]` on the table `BingoMapWin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Id]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Id]` on the table `ProdutoPreco` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[SorteadorId]` on the table `Sorteador` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProdutoPreco" ALTER COLUMN "Id" DROP DEFAULT;
DROP SEQUENCE "ProdutoPreco_Id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "BingoMapWin_MapWinId_key" ON "BingoMapWin"("MapWinId");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_Id_key" ON "Produto"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "ProdutoPreco_Id_key" ON "ProdutoPreco"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Sorteador_SorteadorId_key" ON "Sorteador"("SorteadorId");
