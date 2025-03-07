"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import "./cssHeader.css";
import Link from "next/link";
import { useRouter } from "next/navigation";  // Import do hook para navegação
import { GetRestHeader } from "./ RestHeader ";

interface User {
  Tel: string;
}

export default function Header() {
  const [busca, setBusca] = useState<User>({ Tel: "" });
  const router = useRouter();

  const buscaUsuario = async (tel: string) => {
    if (tel) {
      try {
        const usuarioExistente = await GetRestHeader(tel);
        if (usuarioExistente) {
          setBusca({ Tel: usuarioExistente.Tel });
          router.push(`/MeuBingo?api=/users/rotaUser/user?Tel=${encodeURIComponent(usuarioExistente.Tel)}`); // Redireciona para a rota desejada
        }
      } catch (error) {
        console.error("Usuário não encontrado:", error);
      }
    }
  };

  const Registro = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusca((prevData) => ({ ...prevData, [name]: value }));
  };

  const ChamadaSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
    await buscaUsuario(busca.Tel); // Chama a função de busca após o clique no botão
  };

  return (
    <div className="fundo-Image" >
     { /*<Image 
      src="/fundoBingo2.png" 
      alt="Fundo do Bingo" 
      
    /> */}
     
    <header className="header-main">
     
    <div className="container-bingo">
        <h2 className="bingo-3d bingo">Live</h2>
        <h1 className="bingo-3d live">Bingo</h1>
    </div>
    <nav>
      <ul>
       
        <li>
          <form onSubmit={ChamadaSubmit}>
            
             <Link className="Link-Home" href="/">Home</Link>
            
            <input
              type="text"
              name="Tel"
              value={busca.Tel}
              onChange={Registro}
              placeholder="Seu Telefone"
            />
            <button type="submit">Buscar Bingo</button>
          </form>
        </li> 
      </ul>
    </nav>
   
  </header>
  </div>
  
  );
}
