import { NextRequest, NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";

// GET para buscar produtos - limitando a seis para o frontend
export async function GET() {
   
    try {
        const Sorte = await PrismaGlobal.sorteador.findMany({
            
        });

        return NextResponse.json({ message: "ok", Sorte });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return NextResponse.json(
            { message: "Erro ao buscar produtos", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}

// POST para criação de um produto
export async function POST(req: NextRequest) {
    try {
        const { SorteadorId, NumeroSorteados } = await req.json();

        // Validação de dados obrigatórios
        if (!SorteadorId || !NumeroSorteados) {
            return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
        }

        // Criação do produto
        const Sorte = await PrismaGlobal.sorteador.create({
            data: {
                SorteadorId,
                NumeroSorteados,
            },
        });

        return NextResponse.json({ message: "Produto criado com sucesso!", Sorte }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return NextResponse.json(
            { message: "Erro ao criar produto", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
//put


export async function PUT(req: NextRequest) {
    try {
        // Extrai os dados do corpo da requisição
        const { SorteadorId, NumeroSorteados } = await req.json();

        // Validação de dados obrigatórios
        if (!SorteadorId || !Array.isArray(NumeroSorteados)) {
            return NextResponse.json(
                { message: "SorteadorId e um array de números são obrigatórios." },
                { status: 400 }
            );
        }

        // Verifica se o sorteador já existe no banco
        const existingUser = await PrismaGlobal.sorteador.findUnique({
            where: { SorteadorId: SorteadorId },
        });

        if (existingUser) {
            // Combina os números novos com os existentes, garantindo que os novos números fiquem no início
            const updatedNumeros = [...NumeroSorteados, ...existingUser.NumeroSorteados];

            // Atualiza o registro no banco
            const updatedUser = await PrismaGlobal.sorteador.update({
                where: { SorteadorId: SorteadorId },
                data: {
                    NumeroSorteados: updatedNumeros,
                },
            });

            return NextResponse.json(
                { message: "Números inseridos no início com sucesso!", updatedUser },
                { status: 200 }
            );
        } else {
            // Se o usuário não existe, cria um novo registro com os números fornecidos
            const newUser = await PrismaGlobal.sorteador.create({
                data: {
                    SorteadorId: SorteadorId,
                    NumeroSorteados,
                },
            });

            return NextResponse.json(
                { message: "Novo sorteador criado com sucesso!", newUser },
                { status: 201 }
            );
        }
    } catch (error) {
        console.error("Erro ao atualizar números sorteados:", error);

        // Resposta de erro
        return NextResponse.json(
            {
                message: "Erro ao atualizar números sorteados",
                error: error instanceof Error ? error.message : "Erro desconhecido",
            },
            { status: 500 }
        );
    }
}
