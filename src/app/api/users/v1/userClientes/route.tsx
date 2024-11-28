import { NextRequest, NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";

// get de todas as camapanhas 

export async function GET () {
    console.log(NextRequest,"venho de request")
    try {
        const UserClientes = await PrismaGlobal.userClientes.findMany();
        return Response.json({messagem:"ok", UserClientes })
    } catch (error) {
        return NextResponse.json({
            messagen: "error",
            error,
        },
        {
            status:500,
        }
        
      );
    }
};
// post mmetodo

export async function POST(req: NextRequest) {
    try {
        const { Nome, Tel  } = await req.json();

        // Validação de dados obrigatórios
        if (!Nome || !Tel ) {
            return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
        }

        

        // Criando o produto
        const produto = await PrismaGlobal.userClientes.create({
            data: {
               Nome,
               Tel
            
            },
        });

        return NextResponse.json({ message: "  Ususario cadastrado com sucesso!", produto }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar Ususario:", error);
        return NextResponse.json(
            { message: "Erro ao criar Ususario", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}