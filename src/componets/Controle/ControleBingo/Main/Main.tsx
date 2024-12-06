"use client"
import { ReactNode } from "react"
import "./cssMain.css"

interface Main {
  children : ReactNode
 }



export default function MainCtr ( {children}:Main) {
    return( 
    
    <main> 
      
        <div className="fundo-controle-interno-cxVenda">
        {children}
        
        </div>

    </main>
    
    
    )
}