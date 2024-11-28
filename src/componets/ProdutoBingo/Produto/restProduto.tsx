"use client"
import axios from "axios";

interface Produto {
    Id: number;
    Status: string;
    Numero: number[];
}

interface ProdutoResponse {
    messagem: string;
    Produto: {
        Id: number;
        Numeros: number[];
        Status: string;
    }[];
}

const RestProduto = axios.create({
    baseURL: 'https://bingo-online-nu.vercel.app/api',  // Certifique-se de que este é o caminho correto
    headers: {
        'Content-Type': 'application/json',
    },
});

// Função para buscar produtos preco
export const getRestProduto = async (): Promise<Produto[]> => {
    try {
        const response = await RestProduto.get<ProdutoResponse>('/users/rotaUser/produto');

        if(response.data && Array.isArray(response.data.Produto) ){
            return  response.data.Produto.map(item => ({
            Id: item.Id,
            Numero: item.Numeros,
            Status: item.Status,
        }));
        }else{
            console.log('Produtos Preco :', response.data.Produto); // Exibe os produtos no console
            return []; // Retorna um array vazio caso a estrutura esteja incorreta
        }
       
    } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
        return [];
    }
};

/// get preco do produto 
// Define a interface para o preço do produto
interface ProdutoPreco {
    Id: number;
    Preco: string; // Preço como string, conforme o exemplo que você deu
}

// Define a interface para a resposta da API
interface ProdutoPrecoResponse {
    message: string;  // Corrigido para 'message' (era 'messagem')
    produtosPreco: ProdutoPreco[]; // O nome da propriedade deve ser 'produtosPreco'
}

// Função para buscar produtos
export const getRestProdutoPreco = async (): Promise<ProdutoPreco[]> => {
    try {
        const response = await RestProduto.get<ProdutoPrecoResponse>('/users/rotaUser/preco');

        // Verifica se a resposta contém produtosPreco como array
        if (response.data && Array.isArray(response.data.produtosPreco)) {
            return response.data.produtosPreco; // Retorna a lista de produtos
        } else {
            console.log('Produtos Preco :', response.data.produtosPreco); // Exibe os produtos no console
            return []; // Retorna um array vazio caso a estrutura esteja incorreta
        }
    } catch (error) {
        console.error('Erro ao buscar os preco', error);
        return []; // Retorna um array vazio em caso de erro
    }
};




export default RestProduto;
