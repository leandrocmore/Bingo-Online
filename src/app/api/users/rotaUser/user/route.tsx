 //esta rota esta em corporada as rota get de chamada de usuario  para o fronte ent 
//com dastramento tando do usuario ea montagem do carrinho juntos 



import { NextRequest, NextResponse } from "next/server";
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";  // Assumindo que PrismaGlobal está configurado corretamente


/**const rateLimitOptions = {
  max: 5, // Número máximo de requisições permitidas por intervalo
  ttl: 60 * 1000, // Intervalo de tempo em milissegundos (1 minuto)
};

// Cria o cache LRU para controlar a contagem de requisições por IP
const rateLimitCache = new LRU<string, number>(rateLimitOptions);

// Função de middleware para verificar o limite de taxa
function checkRateLimit(ip: string): boolean {
  const count = rateLimitCache.get(ip) || 0;

  if (count >= rateLimitOptions.max) {
    return false;
  }
  
  rateLimitCache.set(ip, count + 1);
  return true;
}; */



/// Validação do número de telefone (opcional)
const telefoneValido = /^\d{2}\d{9}$/; // Exemplo: 15996982622

export async function GET(req: NextRequest) {
// controle de acesso das rotas  limite de 100 
//const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";

// Verifica o limite de requisições
//if (!checkRateLimit(ip)) {
  //return NextResponse.json(
    //{ mensagem: "Muitas requisições. Tente novamente mais tarde." },
    //{ status: 429 }
  //);
//}
 

  try {
    // Obtendo o parâmetro 'tel' da URL
    const { searchParams } = new URL(req.url);
    const tel = searchParams.get('Tel');

    // Verifica se o parâmetro 'tel' foi fornecido
    if (!tel) {
      return NextResponse.json({ mensagem: "Número de telefone não fornecido" }, { status: 400 });
    }

    // Valida se o número de telefone é válido
    if (!telefoneValido.test(tel)) {
      return NextResponse.json({ mensagem: "Número de telefone inválido." }, { status: 400 });
    }

    // Busca um único registro com base no número de telefone
    const userCliente = await PrismaGlobal.userClientes.findUnique({
     
      where: { Tel: tel },
      include: {
        CarrinhoId: true,
        TransacaoId: true,
      },
    });

    // Verifica se o usuário foi encontrado
    if (!userCliente) {
      return NextResponse.json({ mensagem: "Usuário não encontrado" }, { status: 404 });
    }

    // Retorna o usuário encontrado
    return NextResponse.json({ mensagem: "ok", userCliente });
  } catch (error) {
    return NextResponse.json(
      { mensagem: "error", error },
      { status: 500 }
    );
  }
}

  

// POST - Criar usuário 
// POST - Criar usuário
export async function POST(req: NextRequest) {
  try {
      const { Nome, Tel } = await req.json();

      // Validação de dados obrigatórios
      if (!Nome || !Tel) {
          return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
      }
      
      // Validação do número de telefone
      if (!telefoneValido.test(Tel)) {
        return NextResponse.json({ message: "Número de telefone inválido." }, { status: 400 });
      }

      // Verifica se o usuário já existe
      const userClienteExistente = await PrismaGlobal.userClientes.findUnique({
        where: { Tel },
      });

      if (userClienteExistente) {
          return NextResponse.json(
            { message: "Usuário já existe. Nenhuma atualização permitida." },
            { status: 200 }
          );
      }

      // Criação de usuário sem carrinho
      const novoUsuario = await PrismaGlobal.userClientes.create({
          data: {
             Nome,
             Tel
          },
      });

      return NextResponse.json({ message: "Usuário cadastrado com sucesso!", usuario: novoUsuario }, { status: 201 });
  } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return NextResponse.json(
          { message: "Erro ao criar usuário", error: error instanceof Error ? error.message : "Unknown error" },
          { status: 500 }
      );
  }
}

