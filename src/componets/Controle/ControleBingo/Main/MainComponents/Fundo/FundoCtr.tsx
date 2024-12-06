"use client"

import {ReactNode } from "react"
import "./cssFundo.css"
import Main from "../../Main"



interface MainFundo {
  className?: string;
    children ?: ReactNode
   }
export default function FundoCtr({children,className}:MainFundo){
 return(
  
<Main>
    <div className={`fundo ${className}`.trim()}>
      {children}
    </div>  
</Main>
 )
}