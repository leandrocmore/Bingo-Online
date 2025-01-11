"use client"

import { RestLnkApi } from "../../../../lib/linkRotas/LinkAPI"

type UserClienteData = {
  Nome: string;
  Tel: string;
  // Outros campos que o usuário precisa enviar
};

type CarrinhoData = {
  TelClientesId: string;
  ProdutoId: number[];
  Quantidade: number;
  Status: string;
  DataHoraInicio: string;
  // Outros campos relevantes
};
type Ckeckup = {
  addressKey:string;
  description: string;
  value: number;
  expirationDate: string;
  externalReference:string; //id do carrinho aqui 
};



export const GetUserClientes = async (tel: string) => {
  try {
    const response = await RestLnkApi.get(`/users/rotaUser/user?Tel=${encodeURIComponent(tel)}`);
    if (response.data.mensagem === 'ok') {
      return response.data.userCliente;
    } else {
      throw new Error(response.data.mensagem);
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const PostUserClientes = async (Data: UserClienteData) => {
  try {
    const response = await RestLnkApi.post('/users/rotaUser/user', Data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar comprador:', error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const PostUsersCarrinho = async (Data: CarrinhoData) => {
  try {
    const response = await RestLnkApi.post('/users/rotaUser/carrinho', Data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar Carrinho:', error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};
export const PostCheckupAsaas = async (Data:Ckeckup) =>{
  try {
    const response = await RestLnkApi.post('/users/rotaUser/chekout', Data);
    return response.data;
  } catch (error) {
    console.error('Erro ao crir o chekout :', error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
}

