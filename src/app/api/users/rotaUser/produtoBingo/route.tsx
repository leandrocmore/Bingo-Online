// app/api/users/RotaUser/ProdutoBingo.tsx
import { NextRequest, NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";




// Rota GET para buscar produtos com base em múltiplos IDs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const IdsBingo = searchParams.get("Id"); // Múltiplos IDs separados por vírgula
    console.log("IDs recebidos:", IdsBingo);

    // Verifica se os IDs foram fornecidos
    if (!IdsBingo) {
      return NextResponse.json(
        { mensagem: "IDs do produto não fornecidos" },
        { status: 400 }
      );
    }

    // Converte a string de IDs em um array de números
    const idsArray = IdsBingo.split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));

    // Verifica se o array de IDs é válido
    if (idsArray.length === 0) {
      return NextResponse.json({ mensagem: "IDs inválidos" }, { status: 400 });
    }

    // Consulta ao banco de dados usando Prisma
    const Produtos = await PrismaGlobal.produto.findMany({
      where: {
        Id: { in: idsArray },
        Status: "Comprado",
      },
    });

    return NextResponse.json({ mensagem: "ok", Produtos });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { mensagem: "Erro ao processar a solicitação", error},
      { status: 500 }
    );
  }
}
