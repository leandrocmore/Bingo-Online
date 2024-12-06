"use client"
import axios from 'axios';

interface MapWinData {
    MapWinId: number;
    MapWin: Array<{ positions: number[]; letter: string }>;
}


const RestContreleMapa = axios.create({
    baseURL: 'http://192.168.5.7:3000/api', // Ajuste o baseURL conforme necessário
    headers: {
        'Content-Type': 'application/json',
    },
});

// Função para POST
export const postRestContreleMapa = async (data: MapWinData): Promise<MapWinData> => {
    const response = await RestContreleMapa.post('/users/v1/mapWin', data);
    return response.data;
};

// Função para GET
export const getRestContreleMapa = async (): Promise<MapWinData[]> => {
    const response = await RestContreleMapa.get('/users/v1/mapWin');
    return response.data; // Retorna um array de MapWinData
};

export default RestContreleMapa;