"use client"
import { RestLnkApi } from "../../../../../lib/linkRotas/LinkAPI";
interface PrecoData {
    Id:number
    Preco:number
}
// Função para POST
export const postRestControlePreco = async (data: PrecoData): Promise<PrecoData> => {
    const response = await RestLnkApi.post('/users/v1/produtoPreco', data);
    return response.data;
};

// Função para GET
export const getRestControlePreco = async (): Promise<PrecoData[]> => {
    const response = await RestLnkApi.get('/users/v1/preco');
    return response.data; // Retorna uma lista de PrecoData
};

