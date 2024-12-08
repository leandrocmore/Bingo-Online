import axios from "axios";

export const RestLnkApi = axios.create({
    baseURL: 'https://bingo-online-nu.vercel.app/api', // Ajuste conforme necessário
    headers: {
        'Content-Type': 'application/json',
    },
});
export default RestLnkApi