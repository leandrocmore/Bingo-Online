"use client"
import axios from 'axios';
interface PrecoData {
    Id:number
    Preco:number
}




const RestControlePreco = axios.create({
    baseURL: 'http://192.168.5.7:3000/api', // Ajuste conforme necessário
    headers: {
        'Content-Type': 'application/json',
    },
});

// Função para POST
export const postRestControlePreco = async (data: PrecoData): Promise<PrecoData> => {
    const response = await RestControlePreco.post('/users/v1/produtoPreco', data);
    return response.data;
};

// Função para GET
export const getRestControlePreco = async (): Promise<PrecoData[]> => {
    const response = await RestControlePreco.get('/users/v1/preco');
    return response.data; // Retorna uma lista de PrecoData
};

export default RestControlePreco;