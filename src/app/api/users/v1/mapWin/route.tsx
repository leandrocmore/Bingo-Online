// esta rota vai ser fechada por midewaer 
// criar outra para o front end   

import { NextRequest, NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";

// get de todos os produtos sera so seis para o front End  

export async function GET() {
    try {
        const MapaWin = await PrismaGlobal.bingoMapWin.findMany({
            //take: 6, // Ajustar de acordo com o comentário
            //where: { Status: "Disponivel"}, // Filtra produtos disponíveis (opcional)
        });

        return NextResponse.json({ mensagem: "ok", MapaWin });
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
// post mmetodo

export async function POST(req: NextRequest) {
    try {
        const {  MapWinId,  MapWin  } = await req.json();

        // Validação de dados obrigatórios
        if (!MapWin || !MapWin) {
            return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
        }
       

        // Criando o produto
        const MapaWin = await PrismaGlobal.bingoMapWin.create({
            data: {
                MapWinId,
                MapWin
            },
        });

        return NextResponse.json({ message: "Produto criado com sucesso!", MapaWin }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return NextResponse.json(
            { message: "Erro ao criar produto", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}