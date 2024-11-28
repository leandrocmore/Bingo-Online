import { NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";

// get de todos os produtos sera so seis para o front End  

export async function GET() {
    try {
        const Produto = await PrismaGlobal.produto.findMany({
            take: 6, // Ajustar de acordo com o comentário
            where: { Status: "Disponivel"}, // Filtra produtos disponíveis (opcional)
        });

        return NextResponse.json({ mensagem: "ok", Produto });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return NextResponse.json({
            messagen: "error",
            error,
        }, {
            status: 500,
        });
    }
}


