import { NextRequest, NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";

// Em seu arquivo principal (por exemplo, server.js ou index.js)
//import "../../../../../lib/controleApi/limpezaCarrinhosCron";
import { limparCarrinhosExpirados } from "@/lib/controleApi/LimpezaAtualizador";
// Garantindo que o cron job seja iniciado

//import { limparCarrinhosExpirados} from "../../../../../lib/controleApi/" 

// Iniciar limpeza automática de carrinhos expirados
setInterval(limparCarrinhosExpirados , 1000)

//Validação do número de telefone (opcional)
//const telefoneValido = /^\d{2}\d{9}$/; // Exemplo: 15996982622

// Função para atualizar o status do produto para "Indisponível"
async function atualizarStatusProdutoIndisponivel(produtoIds: number[]) {
  console.log(produtoIds,"teste produto")
  try {
    await PrismaGlobal.produto.updateMany({
      where: { Id: { in: produtoIds } },
      data: { Status: "Indisponivel" },
    });
  } catch (error) {
    console.error("Erro ao criar atulizador:", error);
    throw new Error("Falha ao atualizar status do produto.");
  }
}

// POST - Criar um carrinho e atualizar o status dos produtos
export async function POST(req: NextRequest) {

  try {
    const { ProdutoId, DataHoraInicio, Quantidade, TelClientesId, Status } = await req.json();

    // Validação de campos obrigatórios
    if (!TelClientesId || !ProdutoId || !DataHoraInicio || !Quantidade || !Status) {
      return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    // Validação do número de telefone (caso necessário)
   //if (!telefoneValido.test(TelClientesId)) {
    // return NextResponse.json({ message: "Número de telefone inválido." }, { status: 400 });
    //}

    // Validação do status
    const statusValues = ["EmProcessamento", "PagamentoPendente"];
    if (!statusValues.includes(Status)) {
      return NextResponse.json({ message: "Status inválido." }, { status: 400 });
    }

    // Criar o carrinho
    const Carrinho = await PrismaGlobal.carrinho.create({
      data: {
        ProdutoId,
        DataHoraInicio,
        Quantidade,
        TelClientesId,
        Status,
      },
    });

    // Atualizar o status do produto para "Indisponível"
    await atualizarStatusProdutoIndisponivel(ProdutoId);

    return NextResponse.json({ message: "Carrinho criado com sucesso!", Carrinho }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar carrinho:", error);
    return NextResponse.json(
      { message: "Erro ao criar carrinho", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
