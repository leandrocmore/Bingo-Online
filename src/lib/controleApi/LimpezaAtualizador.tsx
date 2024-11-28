import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";
import { CarrinhoStatus } from "@prisma/client";

type CarrinhoCustom = {
  IdCarrinho: number;
  ProdutoId: number[];
  DataHoraInicio: Date;
  Quantidade: number;
  TelClientesId: string;
  Status: string;
};

// Função que atualiza o status dos produtos para "Disponível"
async function atualizarStatusDisponivel(produtoIds: number[]) {
  try {
    const idsValidos = produtoIds.flat();
    await PrismaGlobal.produto.updateMany({
      where: { Id: { in: idsValidos } },
      data: { Status: "Disponivel" },
    });
    console.log(`Produtos ${idsValidos} atualizados para "Disponível".`);
  } catch (error) {
    console.error("Erro ao atualizar status dos produtos para 'Disponível':", error);
    throw new Error("Falha ao atualizar status dos produtos.");
  }
}

// Função que atualiza o status dos produtos para "Comprado"
async function atualizaProdutoComprado(produtoIds: number[]) {
  try {
    const idsValidos = produtoIds.flat();
    await PrismaGlobal.produto.updateMany({
      where: { Id: { in: idsValidos } },
      data: { Status: "Comprado" },
    });
    console.log(`Produtos ${idsValidos.join(", ")} atualizados para "Comprado".`);
  } catch (error) {
    console.error("Erro ao confirmar status dos produtos:", error);
    throw new Error("Falha ao confirmar status dos produtos.");
  }
}

// Função que transfere os dados do carrinho para TransacaoPagos e o remove
async function Transferencia(carrinho: CarrinhoCustom) {
  try {
    await PrismaGlobal.$transaction(
      async (prisma) => {
        await prisma.transacaoPagos.create({
          data: {
            TelClientesId: carrinho.TelClientesId,
            ProdutoId: carrinho.ProdutoId,
            Quantidade: carrinho.Quantidade,
            Status: "Pago",
            DataTransacao: new Date(),
          },
        });

        await prisma.carrinho.delete({
          where: { IdCarrinho: carrinho.IdCarrinho },
        });
      },
      { maxWait: 15000, timeout: 15000 } // Ajuste o tempo conforme necessário
    );

    // Atualização de status fora da transação
    await atualizaProdutoComprado(carrinho.ProdutoId);

    console.log(`Carrinho ${carrinho.IdCarrinho} transferido para 'TransacaoPagos' e deletado.`);
  } catch (error) {
    console.error(`Erro ao transferir carrinho ${carrinho.IdCarrinho}:`, error);
    throw new Error(`Falha ao transferir carrinho ${carrinho.IdCarrinho}.`);
  }
}

// Função que limpa carrinhos expirados
export async function limparCarrinhosExpirados() {
  try {
    const agora = new Date(); // Data atual em UTC
    console.log(`Hora atual (UTC): ${agora.toISOString()}`);

    const carrinhosPendentes = await PrismaGlobal.carrinho.findMany({
      where: { Status: CarrinhoStatus.PagamentoPendente },
    });

    const carrinhosConfirmados = await PrismaGlobal.carrinho.findMany({
      where: { Status: CarrinhoStatus.PagamentoConfirmado },
    });

    // Processa carrinhos confirmados
    await Promise.all(
      carrinhosConfirmados.map(async (carrinho) => {
        await Transferencia(carrinho);
      })
    );

    // Processa carrinho pendentes
    await Promise.all(
      carrinhosPendentes.map(async (carrinho) => {
        try {
          console.log(`Processando carrinho ID: ${carrinho.IdCarrinho}`);
          const dataInicio = new Date(carrinho.DataHoraInicio); // UTC
          const tempoDecorrido = (agora.getTime() - dataInicio.getTime()) / 1000; // Tempo em segundos
          const expirou = tempoDecorrido >= 1 * 60; // 5 minutos
    
          console.log(`Carrinho ${carrinho.IdCarrinho} expirou: ${expirou}`);
    
          if (expirou) {
            await PrismaGlobal.carrinho.delete({
              where: { IdCarrinho: carrinho.IdCarrinho },
            });
            await atualizarStatusDisponivel(carrinho.ProdutoId);
    
            console.log(`Carrinho ${carrinho.IdCarrinho} deletado.`);
          }
        } catch (error) {
          console.error(`Erro ao processar carrinho ${carrinho.IdCarrinho}:`, error);
        }
      })
    );
  } catch (error) {
    console.error("Erro ao limpar carrinhos expirados:", error);
    throw new Error("Falha ao limpar carrinhos expirados.");
  }
}
