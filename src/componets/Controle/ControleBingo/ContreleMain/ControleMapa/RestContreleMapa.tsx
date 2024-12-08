"use client"
import { RestLnkApi } from "../../../../../lib/linkRotas/LinkAPI";

interface MapWinData {
    MapWinId: number;
    MapWin: Array<{ positions: number[]; letter: string }>;
}


// Função para POST
export const postRestContreleMapa = async (data: MapWinData): Promise<MapWinData> => {
    const response = await RestLnkApi.post('/users/v1/mapWin', data);
    return response.data;
};

// Função para GET
export const getRestContreleMapa = async (): Promise<MapWinData[]> => {
    const response = await RestLnkApi.get('/users/v1/mapWin');
    return response.data; // Retorna um array de MapWinData
};

