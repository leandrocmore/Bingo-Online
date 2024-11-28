"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartProduto } from '../produtoType/Type';

// Definindo a interface do contexto
type CartContextProps = {
  cart: CartProduto[];
  addToCart: (product: CartProduto) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

// Criando o contexto
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Criando o provider do contexto
export const ProdutoBingoCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartProduto[]>([]); // Corrigido para lista de produtos

  const addToCart = (item: CartProduto) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
