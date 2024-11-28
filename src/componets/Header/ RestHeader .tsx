import axios from "axios";

const  RestHeader = axios.create({
  baseURL: 'http://192.168.5.7:3000/api',  // Certifique-se de que este é o caminho correto
  headers: {
    'Content-Type': 'application/json',
  },
});

export const GetRestHeader  = async (tel: string) => {
  try {
    const response = await  RestHeader .get( `/users/rotaUser/user?Tel=${encodeURIComponent(tel)}` );
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

export default  RestHeader ;
