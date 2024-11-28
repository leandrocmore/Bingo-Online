import axios from "axios";

const RestUserPagos = axios.create({
  baseURL: 'https://bingo-online-nu.vercel.app/', // Certifique-se de que este é o caminho correto
  headers: {
    'Content-Type': 'application/json',
  },
});

export const GetUserPagos = async (api: string) => {
  try {
    const response = await RestUserPagos.get(api);
    return response.data;  // Retorna apenas os dados da resposta
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;  // Retorna null em caso de erro
  }
};

export default RestUserPagos;
