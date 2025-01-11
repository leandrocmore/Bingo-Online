import { NextResponse } from 'next/server';
import axios from 'axios';
import PrismaGlobal from "@/lib/PrismaGlobal/PrismaGlobal";

export async function POST(request: Request) {
  try {
    const url = 'https://sandbox.asaas.com/api/v3/pix/qrCodes/static';
    const access_token = process.env.ASAAS_API_KEY_SANDBOX;
    console.log('Acesso token:', access_token);

    // Verifique se a chave de API está definida
    if (!access_token) {
      
      return NextResponse.json(
        { error: 'Chave de API não encontrada' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Corpo da requisição:', body);
   
    const axiosConfig = {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        access_token,
      },
    };

    console.log('Configuração do Axios:', axiosConfig);
    

    const { data, status } = await axios.post(url, body, axiosConfig);
    // Atualiza o carrinho no banco de dados com os dados retornados
    if (status == 200) {
      await PrismaGlobal.assasCkeckup.create({
        //where: { IdCarrinho: data.externalReference }, // Ajuste o campo conforme necessário
        data: {

          EncodedImage: data.encodedImage,
          Payload:  data.payload,
          carrinhoId: data.externalReference 
         
        },
      });
    }
    console.log('Resposta da API:', data);
    console.log('Status da resposta:', status);

    return NextResponse.json(data, { status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro do Axios:', error.response?.data);
      console.error('Status do erro:', error.response?.status);
      console.error('Headers do erro:', error.response?.headers);
      return NextResponse.json(
        { error: error.response?.data || 'Erro na requisição ao Asaas' },
        { status: error.response?.status || 500 }
      );
    }

    console.error('Erro ao processar pagamento:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
