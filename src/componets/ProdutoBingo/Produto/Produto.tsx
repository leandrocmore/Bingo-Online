// pages/Produto.tsx
"use client";

import { useEffect, useState } from "react";
import { getRestProduto, getRestProdutoPreco } from "./restProduto";
import "./cssProduto.css";
import Fundo from "@/componets/Main/MainComponents/Fundo/Fundo";
import { useCart } from "../context/CartContext";
import CarrinhoModal from "../ModalCarrinho/modalCarrinho";

interface Produto {
  Id: number;
  Status: string;
  Numero: number[];
}

interface ProdutoPreco {
  Id: number;
  Preco: string;
}

export default function Produto() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [produto, setProduto] = useState<Produto[]>([]);
  const [preco, setPreco] = useState<ProdutoPreco[]>([]);
  const [produtosBloqueados, setProdutosBloqueados] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const VendaProduto = async () => {
      try {
        const vendaProduto = await getRestProduto();
        setProduto(vendaProduto);
      } catch (error) {
        console.error("Erro ao inicializar o produto:", error);
      }
    };
    VendaProduto();
  }, []);

  useEffect(() => {
    const fetchProdutoPreco = async () => {
      try {
        const response = await getRestProdutoPreco();
        setPreco(response);
      } catch (err) {
        console.error("Erro na requisição:", err);
      }
    };
    fetchProdutoPreco();
  }, []);

  const precoUnico = preco.length > 0 ? parseFloat(preco[0].Preco) : 0;

  const handleAddToCart = (cartela: Produto) => {
    addToCart({
      id: cartela.Id,
      price: precoUnico,
      quantity: 1,
    });
    setProdutosBloqueados((prev) => [...prev, cartela.Id]);
  };

  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
    setProdutosBloqueados((prev) => prev.filter((itemId) => itemId !== id)); // Desbloqueia o produto
  };

  return (
    <Fundo>
      <div className="produto-main">
        {produto.map((cartela, index) => {
          const bloqueado = produtosBloqueados.includes(cartela.Id);

          return (
            <div
              key={cartela.Id}
              className={`produto-interno-cartela color-${index % 5} ${
                bloqueado ? "bloqueado" : ""
              }`}
            >
              <div className="produto-redondo-Id">
                <h3>Nº: {cartela.Id}</h3>
              </div>

              <table className="produto-table">
                <tbody>
                  {Array.from({ length: 5 }, (_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.from({ length: 5 }, (_, colIndex) => {
                        const cellIndex = rowIndex * 5 + colIndex;
                        return (
                          <td key={colIndex}>
                            {cartela.Numero[cellIndex] || ""}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr />

              <div className="produto-preco">
                <h4>Preço: R$ {precoUnico.toFixed(2)}</h4>
              </div>

              <div className="produto-carrinho-botton">
                <button
                  onClick={() => handleAddToCart(cartela)}
                  disabled={bloqueado}
                >
                  {bloqueado ? "Adicionado" : "Adicionar ao Carrinho"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button className="produto-abrir-carrinho" onClick={() => setShowModal(true)}>
        Ver Carrinho
      </button>

      {showModal && (
        <CarrinhoModal
          cart={cart}
          onClose={() => setShowModal(false)}
          removeFromCart={handleRemoveFromCart}
          clearCart={() => {
            clearCart();
            setProdutosBloqueados([]); // Desbloqueia todos os produtos ao limpar o carrinho
          }}
        />
      )}
    </Fundo>
  );
}
