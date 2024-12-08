import { RestLnkApi } from "../../lib/linkRotas/LinkAPI"



export const GetRestHeader  = async (tel: string) => {
  try {
    const response = await  RestLnkApi .get( `/users/rotaUser/user?Tel=${encodeURIComponent(tel)}` );
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


