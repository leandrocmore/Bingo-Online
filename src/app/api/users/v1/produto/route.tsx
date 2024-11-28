// esta rota vai ser fechada por midewaer 
// criar outra para o front end   

import { NextRequest, NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";

// get de todos os produtos sera so seis para o front End  

export async function GET() {
    try {
        const Produto = await PrismaGlobal.produto.findMany({
            //take: 6, // Ajustar de acordo com o comentário
            //where: { Status: "Disponivel"}, // Filtra produtos disponíveis (opcional)
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
// post mmetodo

export async function POST(req: NextRequest) {
    try {
        const { Id,  Numeros, Status } = await req.json();

        // Validação de dados obrigatórios
        if (!Id || !Array.isArray(Numeros) || Numeros.length === 0 || !Status) {
            return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
        }

        // Verificar se o Status é válido
        const statusValues = ["Disponivel"];
        if (!statusValues.includes(Status)) {
            return NextResponse.json({ message: "Status inválido." }, { status: 400 });
        }

        // Criando o produto
        const Produto = await PrismaGlobal.produto.create({
            data: {
                Id,
                Numeros, // Array de números já é esperado, não precisa de conversão
                Status, // O valor de Status deve ser uma string correspondente ao enum
            },
        });

        return NextResponse.json({ message: "Produto criado com sucesso!", Produto }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return NextResponse.json(
            { message: "Erro ao criar produto", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}