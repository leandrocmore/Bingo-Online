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
          router.push(`/MeuBingo?api=/api/users/rotaUser/user?Tel=${encodeURIComponent(usuarioExistente.Tel)}`); // Redireciona para a rota desejada
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
    <header>
      <h1>Minha Página</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <form onSubmit={ChamadaSubmit}>
              <button type="submit">Meu Bingo</button>
              <input
                type="text"
                name="Tel"
                value={busca.Tel}
                onChange={Registro}
                placeholder="Seu Telefone"
              />
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}
