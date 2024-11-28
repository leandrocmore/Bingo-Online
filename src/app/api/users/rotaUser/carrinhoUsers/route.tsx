// esta rota  vai ser fechada por midewaer
// ela nao vai para o  front  crair uma rota fora da pasta V1  

import {  NextResponse } from "next/server";

import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";


export async function GET() {
  try {
    const UserClientes = await PrismaGlobal.userClientes.findMany({
      include: {
        CarrinhoId: true,
        TransacaoId: true,
      },
    });

    return NextResponse.json({ mensagem: "ok", UserClientes });
  } catch (error) {
    return NextResponse.json(
      { mensagem: "error", error },
      { status: 500 }
    );
  }
}
