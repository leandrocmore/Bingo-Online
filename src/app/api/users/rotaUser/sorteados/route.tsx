import { NextRequest, NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";

// GET para buscar produtos - limitando a seis para o frontend
export async function GET() {
    console.log(NextRequest,"venho de request")
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

