import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Fundo from "@/componets/Main/MainComponents/Fundo/Fundo";
import "./cssModalCarrinho.css";
import { 
  GetUserClientes, 
  PostCheckupAsaas, 
  PostUserClientes, 
  PostUsersCarrinho 
} from "./RestModalCarrinho";


type CartItem = {
  id: number;
  price: number;
  quantity: number;
};

interface User {
  Nome: string;
  Tel: string;
}

interface CarrinhoModalProps {
  cart: CartItem[];
  onClose: () => void;
  onClick: () => void;
  removeFromCart: (id: number) => void;
  onIdGenerated: (id: string) => void; // Nova prop
  }

// Função utilitária para formatar datas no padrão `YYYY-MM-DD HH:mm:ss`
const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const CarrinhoModal: React.FC<CarrinhoModalProps> = ({
  cart,
  onClose,
  onClick,
  removeFromCart,
  onIdGenerated
}) => {
  const [dataPost, setDataPost] = useState<User>({
    Nome: "",
    Tel: ""
  });
  const [idGerado, setIdGerado] = useState("");

  // Função para gerar ID aleatório
  const gerarIdAleatorio = (tamanho: number): string => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < tamanho; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      id += caracteres[indiceAleatorio];
    }
    return id;
  };

  useEffect(() => {
    const novoId = gerarIdAleatorio(10);
    setIdGerado(novoId);
    onIdGenerated(novoId)
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Função para buscar usuário por telefone
  const buscaUsuario = async (tel: string) => {
    if (tel) {
      try {
        const usuarioExistente = await GetUserClientes(tel);
        if (usuarioExistente) {
          setDataPost({
            Nome: usuarioExistente.Nome,
            Tel: usuarioExistente.Tel
          });
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      buscaUsuario(dataPost.Tel);
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [dataPost.Tel]);

  const ChamadaSubimit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await PostUserClientes(dataPost);

      // Configuração dos dados do carrinho
      const DataStatus = "PagamentoPendente";
      const produto = cart.map((item) => item.id);
      const quantidade = cart.reduce((acc, item) => acc + item.quantity, 0);
      const dataISOCorreta = new Date().toISOString();
      const dataAtual = new Date();
      const dataComMais30Minutos = new Date(dataAtual.getTime() + 30 * 60000);
      const expirationDateFormatted = formatDateTime(dataComMais30Minutos);

      const carrinhoData = {
        IdCarrinho: idGerado,
        TelClientesId: dataPost.Tel,
        ProdutoId: produto,
        Quantidade: quantidade,
        Status: DataStatus,
        DataHoraInicio: dataISOCorreta,
      };

      await PostUsersCarrinho(carrinhoData);
      const pix = "4f8c27a0-4dea-4766-920b-bff8f2e7712a";

      const checkupAsaas = {
        addressKey: pix,
        description: `Qtd:${quantidade}`,
        value: total,
        expirationDate: expirationDateFormatted,
        externalReference: idGerado,
      };

      await PostCheckupAsaas(checkupAsaas);
    } catch (error) {
      console.error("Erro em CarrinhoModal:", error);
    }
  };

  const Registro = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Fundo className="carrinho-fundo">
          <h2>Checkup Bingo</h2>
          {cart.length > 0 ? (
            <ul className="revisao-ul">
              {cart.map((item) => (
                <li key={item.id}>
                  <p>
                    Bingo Nº: {item.id} = R${" "}
                    {(item.price * item.quantity).toFixed(2)}
                    <button onClick={() => removeFromCart(item.id)}>Remover</button>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Você não adicionou jogo.</p>
          )}
          <p>Total: R$ {total.toFixed(2)}</p>
          <form className="cadastro" onSubmit={ChamadaSubimit}>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="Nome"
                value={dataPost.Nome}
                onChange={Registro}
                placeholder="Digite seu nome"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tel">Telefone</label>
              <input
                type="text"
                id="tel"
                name="Tel"
                value={dataPost.Tel}
                onChange={Registro}
                placeholder="00111119999"
                required
              />
            </div>
            <button onClick={onClick} type="submit">Pagar</button>
          </form>
          <button onClick={onClose}>Fechar</button>
        </Fundo>
      </div>
    </div>
  );
};

export default CarrinhoModal;
