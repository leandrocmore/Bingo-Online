
import { NextResponse } from "next/server";
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
        console.error("Erro ao criar preco:", error);
        return NextResponse.json(
            {
                message: "error",
               
            },
            { status: 500 }
        );
    }
}