// esta rota vai ser fechada por midewaer 
/// sera feita uma outra so  Get para o front end

import { NextRequest, NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";


// get de todas as camapanhas 

export async function GET() {
    try {
        const allowedIds = [1]; // Defina os IDs permitidos
        const produtoPrecoPromises = allowedIds.map(id => 
            PrismaGlobal.produtoPreco.findMany({ where: { Id: id } })

        );

        const produtosPrecos = await Promise.all(produtoPrecoPromises);
        
        
        // Combine todos os resultados em um único array
        const allProdutosPreco = produtosPrecos.flat();

        if (allProdutosPreco.length === 0) {
            return NextResponse.json(
                { message: "Nenhum Preco encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "ok", produtosPreco: allProdutosPreco });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return NextResponse.json(
            {
                message: "error",
                
            },
            { status: 500 }
        );
    }
}
// post mmetodo

export async function POST(req: NextRequest) {
    try {
        const { Preco } = await req.json();

        if (typeof Preco !== "number" || isNaN(Preco)) {
            return NextResponse.json({ message: "Preço inválido." }, { status: 400 });
        }

        // Arredondar para 2 casas decimais
        const precoFormatado = parseFloat(Preco.toFixed(2));

        const produto = await PrismaGlobal.produtoPreco.create({
            data: {
                Preco: precoFormatado, // Use o preço formatado
            },
        });

        return NextResponse.json({ message: "Produto criado com sucesso!", produto }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return NextResponse.json(
            { message: "Erro ao criar produto", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}