import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Fundo from "@/componets/Main/MainComponents/Fundo/Fundo";
import "./cssModalCarrinho.css";
import { GetUserClientes, PostUserClientes, PostUsersCarrinho } from "./RestModalCarrinho";

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
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CarrinhoModal: React.FC<CarrinhoModalProps> = ({
  cart,
  onClose,
  removeFromCart,
  clearCart,
}) => {
  const [dataPost, setDataPost] = useState<User>({
    Nome: "",
    Tel: ""
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Função para preencher automaticamente o usuário ao digitar no campo de telefone
  const buscaUsuario = async (tel: string) => {
    if (tel) {
      try {
        const usuarioExistente = await GetUserClientes(tel);
        if (usuarioExistente) {
          setDataPost({
            Nome: usuarioExistente.Nome,
            Tel: usuarioExistente.Tel
          });
          console.log("Usuário encontrado:", usuarioExistente);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      buscaUsuario(dataPost.Tel);
    }, 500); // Ajuste o tempo de debounce conforme necessário

    return () => clearTimeout(debounceTimeout);
  }, [dataPost.Tel]);

  const ChamadaSubimit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      
      
         await PostUserClientes(dataPost);
        // Configuração dos dados do carrinho
        
        const DataStatus = "PagamentoPendente";
        const dataISOCorreta = new Date().toISOString();
        const carrinhoData = {
            TelClientesId: dataPost.Tel,
            ProdutoId: cart.map((item) => item.id),
            Quantidade: cart.reduce((acc, item) => acc + item.quantity, 0),
            Status: DataStatus,
            DataHoraInicio: dataISOCorreta,
        };

        // Tenta cadastrar o carrinho
         await PostUsersCarrinho(carrinhoData);
       
        
        //nao  funciona 
        //
        //console.log("Usuário cadastrado:", RestCliente);

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
          <h2>Carrinho</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  Produto ID: {item.id} | Preço: R${" "}
                  {(item.price * item.quantity).toFixed(2)}
                  <button onClick={() => removeFromCart(item.id)}>Remover</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Seu carrinho está vazio.</p>
          )}
          <p>Total: R$ {total.toFixed(2)}</p>
          <form onSubmit={ChamadaSubimit}>
            <input
              type="text"
              name="Nome"
              value={dataPost.Nome}
              onChange={Registro}
              placeholder="Nome"
              required
            />
            <input
              type="text"
              name="Tel"
              value={dataPost.Tel}
              onChange={Registro}
              placeholder="Telefone"
              required
            />
            <button type="submit">Pagar</button>
          </form>
          <button onClick={clearCart}>Limpar Carrinho</button>
          <button onClick={onClose}>Fechar</button>
        </Fundo>
      </div>
    </div>
  );
};

export default CarrinhoModal;
