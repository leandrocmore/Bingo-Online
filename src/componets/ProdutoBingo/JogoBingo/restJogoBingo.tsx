"use client"
import { RestLnkApi } from "../../../lib/linkRotas/LinkAPI"

// Ajustando a interface ProdutoResponse para refletir a resposta correta
interface ProdutoResponse {
  mensagem: string;
  Produtos: {
    Id: number;
    Numeros: number[];
    Status: string;
  }[];
}


export const GetJogoBingo = async (Bingo: string) => {
  try {
    const response = await RestLnkApi.get<ProdutoResponse>(Bingo);

    // Garantindo que 'Produtos' seja um array e exista
    
      const produtosBingo = response.data.Produtos.map(item => ({
        Id: item.Id,
        Numero: item.Numeros,
        Status: item.Status,
      }));

      console.log('Produtos:', produtosBingo, response);
      return produtosBingo;
   
    
  } catch (error) {
    console.error('Erro ao buscar os produtos:', error);
    return [];
  }
};


// mapa para o bingo
export const getMapWinJogoBingo= async ()  => {
  try {
      const response = await RestLnkApi.get('/users/rotaUser/mapWin');

      // Exibe os produtos no console
      console.log('venho do get do mapaWin response', response); // Corrigido para 'produtosPreco'
      if(response.data.MapaWin.length > 0){
        console.log('venho do get do mapaWin mapa',response.data.MapaWin[0].MapWin )
        return response.data.MapaWin[0].MapWin
      }
      ;
      return []; // Retorna a lista de produtos
  } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
      return []; // Retorna um array vazio em caso de erro
  }
};

// get sorteador 
export const getSorteadorJogoBingo = async () => {
  try {
    const response = await RestLnkApi.get('/users/rotaUser/sorteados');
    console.log("veio sorteador:", response.data.Sorte);

    const sorteador = response.data.Sorte;

    // Verifica se `sorteador` existe, se tem ao menos um elemento e se `NumeroSorteados` é um array
    if (Array.isArray(sorteador) && sorteador.length > 0 && Array.isArray(sorteador[0].NumeroSorteados)) {
      // Retorna os números invertidos
      return sorteador[0].NumeroSorteados.reverse();
    } else {
      console.warn("Sorteador ou NumeroSorteados não é um array válido.");
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar os sorteados:', error);
    return []; // Retorna um array vazio em caso de erro
  }
};





/**export const getPaginaSorteio = async (): Promise<number[]> => {
    try {
      const response = await RestPaginaJogo.get<NumberSorteador>
      (
        "/users/modelSorteados"
      );
       
      const sorteadorBingo = response.data.sorteadorBingo;
  
      console.log("venho api sortador ", sorteadorBingo);
      if (sorteadorBingo.length > 0 && sorteadorBingo[0].numeros.length > 0) {
        return sorteadorBingo[0].numeros.reverse(); // Retorna o array de números revertido
      }
      return []; // Retorna um array vazio se não houver números
    } catch (error) {
      console.error("nao tem números:", error);
      return []; // Retorna um array vazio em caso de erro
    }
  }; */