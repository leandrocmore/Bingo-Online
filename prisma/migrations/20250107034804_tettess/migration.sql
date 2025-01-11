-- DropForeignKey
ALTER TABLE "AssasCkeckup" DROP CONSTRAINT "AssasCkeckup_carrinhoId_fkey";

-- AddForeignKey
ALTER TABLE "AssasCkeckup" ADD CONSTRAINT "AssasCkeckup_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho"("IdCarrinho") ON DELETE CASCADE ON UPDATE CASCADE;
