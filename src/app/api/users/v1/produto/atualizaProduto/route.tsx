import { NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";

// Atualiza o status de todos os produtos para "Disponível"
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

// Rota GET que apenas chama a função para atualizar os produtos
export async function GET() {
  try {
    // Chama a função para atualizar todos os produtos
    const resultadoAtualizacao = await atualizarStatusProdutoDisponivel();

    return NextResponse.json({
      mensagem: "Status de todos os produtos atualizado para 'Disponível'",
      detalhes: resultadoAtualizacao,
    });
  } catch (error) {
    console.error("Erro ao atualizar status dos produtos:", error);

    // Trata o erro de forma segura
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";

    return NextResponse.json(
      {
        mensagem: "Erro ao atualizar status dos produtos",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
