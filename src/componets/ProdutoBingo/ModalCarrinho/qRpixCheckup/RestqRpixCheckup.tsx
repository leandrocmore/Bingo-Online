"use client"
import { RestLnkApi } from "../../../../lib/linkRotas/LinkAPI"





export const GetpixCarrinho = async (idCarrinho:string) => {
  try {
    const response = await RestLnkApi.get(`/users/rotaUser/carrinho?idCarrinho=${encodeURIComponent(idCarrinho)}` );
    if (response.data.mensagem === 'ok') {
      return response.data;
    } else {
      throw new Error(response.data.mensagem);
    }
  } catch (error) {
    console.error('Erro ao buscar carrinhoUsers:', error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};



