"use client"
import axios from 'axios';

interface ProdutoData {
    Id: number;
    Numeros: number[]; 
    Status: string;
}


// Configuração do cliente Axios
const RestControleProduto = axios.create({
    baseURL: 'http://192.168.5.7:3000/api', // Ajuste conforme necessário
    headers: {
        'Content-Type': 'application/json',
    },
});

// Função para POST
export const postControleProduto = async (data: ProdutoData): Promise<ProdutoData> => {
    const response = await RestControleProduto.post('/users/v1/produto', data);
    return response.data;
};

// Função para GET
export const getControleProduto = async (): Promise<ProdutoData[]> => {
    const response = await RestControleProduto.get('/users/v1/produto');
    return response.data; // Retorna uma lista de ProdutoData
};

export default RestControleProduto;
