import { RestLnkApi } from "../../../lib/linkRotas/LinkAPI"



export const GetUserPagos = async (api: string) => {
  try {
    const response = await RestLnkApi.get(api);
    return response.data;  // Retorna apenas os dados da resposta
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;  // Retorna null em caso de erro
  }
};


