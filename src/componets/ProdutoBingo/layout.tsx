"use client"

import React, { ReactNode } from 'react';
import { ProdutoBingoCartProvider } from './context/CartContext';

interface Filho{
    children : ReactNode
}

export default function FilhoProdutoBingoCartProvider ({children}:Filho){
    return(
   <ProdutoBingoCartProvider>
      { children}
   </ProdutoBingoCartProvider>
    )
} 