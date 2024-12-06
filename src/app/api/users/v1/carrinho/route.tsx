import { NextRequest, NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";


/*// Regular expression to validate phone number (optional)
//const telefoneValido = /^\d{2}\d{9}$/; // Example: 15996982622

// Function to update the product status to "Indisponível"
async function atualizarStatusProdutoIndisponivel(produtoId: number[]) {
  try {
    const idsValidos = produtoId.flat();
    await PrismaGlobal.produto.updateMany({
      where: { Id: { in: idsValidos } },
      data: { Status: "Indisponivel" },
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Falha ao atualizar status do produto.");
  }
}

// POST - Create a cart and update the product status
export async function POST(req: NextRequest) {
  try {
    const { ProdutoId, DataHoraInicio, Quantidade, TelClientesId, Status } = await req.json();

    // Validate required fields
    if (!TelClientesId || !ProdutoId || !DataHoraInicio || !Quantidade || !Status) {
      return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    // Validate phone number (if necessary)
    //if (!telefoneValido.test(TelClientesId)) {
      //return NextResponse.json({ message: "Número de telefone inválido." }, { status: 400 });
    //}

    // Validate status
    const statusValues = ["EmProcessamento", "PagamentoPendente"];
    if (!statusValues.includes(Status)) {
      return NextResponse.json({ message: "Status inválido." }, { status: 400 });
    }

    // Create the cart
    const Carrinho = await PrismaGlobal.carrinho.create({
      data: {
        ProdutoId,
        DataHoraInicio,
        Quantidade,
        TelClientesId,
        Status,
      },
    });

    // Update the product status to "Indisponível"
    await atualizarStatusProdutoIndisponivel([ProdutoId]);

    return NextResponse.json({ message: "Carrinho criado com sucesso!",Carrinho }, { status: 201 });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { message: "Erro ao criar carrinho" },
      { status: 500 }
    );
  }
} */


//manter a put para teste do banco 
// PUT - Update an existing cart
export async function PUT(req: NextRequest) {
  try {
    const { CarrinhoId, Status } = await req.json();

    // Validate required fields
    if (!CarrinhoId || !Status) {
      return NextResponse.json({ message: "CarrinhoId e Status são obrigatórios." }, { status: 400 });
    }

    // Validate allowed status
    const statusPermitidos = ["PagamentoConfirmado"];
    if (!statusPermitidos.includes(Status)) {
      return NextResponse.json({ message: "Status inválido." }, { status: 400 });
    }

    // Update the existing cart
    const carrinhoAtualizado = await PrismaGlobal.carrinho.update({
      where: { IdCarrinho: CarrinhoId },
      data: { Status },
    });

    // If the cart is "Cancelado", release the products for sale again
    // (Implement this logic if needed)

    return NextResponse.json(
      { message: "Carrinho atualizado com sucesso!", carrinho: carrinhoAtualizado },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar carrinho", },
      { status: 500 }
    );
  }
}
