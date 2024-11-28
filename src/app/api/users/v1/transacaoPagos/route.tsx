// esta rota vai ser fechada por midewaer 

import { NextResponse } from "next/server";

import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";


export async function GET() {
  try {
    const TransacaoPagos = await PrismaGlobal.transacaoPagos.findMany();

    return NextResponse.json({ mensagem: "ok", TransacaoPagos });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json(
      { mensagem: "error", error:errorMessage },
      { status: 500 }
    );
  }
}
