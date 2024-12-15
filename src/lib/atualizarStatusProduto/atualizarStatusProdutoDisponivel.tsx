import PrismaGlobal from "../PrismaGlobal/PrismaGlobal";

export async function atualizarStatusProdutoDisponivel() {
    try {
      const result = await PrismaGlobal.produto.updateMany({
        data: { Status: "Disponivel" }, // Atualiza todos os produtos no banco
      });
  
      console.log(`Produtos atualizados: ${result.count}`);
      return result;
    } catch (error) {
      console.error("Erro ao atualizar status dos produtos:", error);
      throw new Error("Falha ao atualizar status dos produtos.");
    }
  }