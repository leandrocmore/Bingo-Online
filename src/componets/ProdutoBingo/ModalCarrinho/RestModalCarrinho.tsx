"use client"
import axios from "axios";

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

const RestaddUserClientes = axios.create({
  baseURL: 'https://bingo-online-nu.vercel.app/api',  // Certifique-se de que este é o caminho correto
  headers: {
    'Content-Type': 'application/json',
  },
});

export const GetUserClientes = async (tel: string) => {
  try {
    const response = await RestaddUserClientes.get(`/users/rotaUser/user?Tel=${encodeURIComponent(tel)}`);
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
    const response = await RestaddUserClientes.post('/users/rotaUser/user', Data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar comprador:', error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const PostUsersCarrinho = async (Data: CarrinhoData) => {
  try {
    const response = await RestaddUserClientes.post('/users/rotaUser/carrinho', Data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar Carrinho:', error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export default RestaddUserClientes;
