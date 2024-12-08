"use client";

import { RestLnkApi } from "../../../../../lib/linkRotas/LinkAPI";

interface ProdutoData {
    Id: number;
    Numeros: number[];
    Status: string;
}

export const postControleProduto = async (data: ProdutoData): Promise<ProdutoData> => {
    const response = await RestLnkApi.post('/users/v1/produto', data);
    return response.data;
};

export const getControleProduto = async (): Promise<ProdutoData[]> => {
    const response = await RestLnkApi.get('/users/v1/produto');
    return response.data;
};
