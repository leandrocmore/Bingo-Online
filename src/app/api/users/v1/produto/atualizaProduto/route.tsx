import { NextResponse } from "next/server";

import { atualizarStatusProdutoDisponivel } from "@/lib/atualizarStatusProduto/atualizarStatusProdutoDisponivel";

// Atualiza o status de todos os produtos para "Disponível"


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
