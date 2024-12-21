"use client";

import Fundo from "@/componets/Main/MainComponents/Fundo/Fundo";
import { useEffect, useState } from "react";
import { useSearchParams ,useRouter} from "next/navigation";
import { GetUserPagos } from "./RestUserPagos";

interface Transacao {
  Id: number;
  TelClientesId: string;
  ProdutoId: number[];
  Quantidade: number;
  Status: string;
  DataTransacao: string;
}
interface Carrinho{
  IdCarrinho:number
  ProdutoId: number[];
  DataHoraInicio:string     
  Quantidade:number
  TelClientesId:string;
  Status:string;   
}

interface UserData {
  Tel: string;
  Nome: string;
  CarrinhoId: Carrinho[];
  TransacaoId: Transacao[];
}

export default function UserPagos() {
  const searchParams = useSearchParams();
  const api = searchParams.get("api");
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (api) {
        try {
          const response = await GetUserPagos(api);
          if (response.userCliente) {
            setUserData(response.userCliente);
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
          setUserData(null);
        }
      }
    };

    fetchData();
  }, [api]);

//manda para  a pagina bingo  
  const bottonBingo = (IdBingo:number[] ) => {
    const idsParam = encodeURIComponent(IdBingo.join(","));
  router.push(`/Bingo?Bingo=users/rotaUser/produtoBingo?Id=${idsParam}`);
  }
 
  // Variáveis para renderização condicional
  let content;

  if (userData === null) {
    content = <p>Carregando...</p>;
  } else if (userData.CarrinhoId.length === 0 && userData.TransacaoId.length === 0) {
   
    content = (
      <div>
       
            
        <p><strong>Nome:</strong> {userData.Nome}</p>
            <p><strong>Telefone:</strong> {userData.Tel}</p>
             <p> vc ainda nao esta participando:</p>
          </div>
      
      
    
    );
    
  } else if (userData.TransacaoId.length > 0) {
    content = (
      <div>
        <p>Transações encontradas:</p>
        {userData.TransacaoId.map((transacao) => (
          <div key={transacao.Id} style={{ marginBottom: "1em", padding: "0.5em", border: "1px solid #ccc" }}>
            <p><strong>Telefone:</strong> {userData.Tel}</p>
            <p><strong>Nome:</strong> {userData.Nome}</p>
            <p><strong>Status:</strong> {transacao.Status}</p>
            <p><strong>Produto ID:</strong> {transacao.ProdutoId.join(", ")}</p>
            <p><strong>Quantidade:</strong> {transacao.Quantidade}</p>
            <button onClick={() => bottonBingo(transacao.ProdutoId)}>Ir para o Jogo</button>
          </div>
        ))}
        
      </div>
    );
  } else if (userData.CarrinhoId.length > 0) {
  
    content = (
      <div>
        <p>esperando pagamento</p>
        {userData.CarrinhoId.map((carrinho) => (
          <div key={carrinho.IdCarrinho} style={{ marginBottom: "1em", padding: "0.5em", border: "1px solid #ccc" }}>
            <p><strong>Telefone:</strong> {userData.Tel}</p>
            <p><strong>Nome:</strong> {userData.Nome}</p>
            <p><strong>Status:</strong> {carrinho.Status}</p>
            <p><strong>Produto ID:</strong> {carrinho.ProdutoId.join(", ")}</p>
            <p><strong>Quantidade:</strong> {carrinho.Quantidade}</p>
          </div>
        ))}
      </div>
    );

  }

  return (
    <Fundo>
     
      {content}
    </Fundo>
  );
}
