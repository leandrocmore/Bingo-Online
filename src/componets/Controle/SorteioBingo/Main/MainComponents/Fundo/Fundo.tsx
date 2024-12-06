"use client"

import {ReactNode } from "react"
import "./cssFundo.css"
import MainSorte from "../../Main";




interface MainFundo {
  className?: string;
    children ?: ReactNode
   }
export default function FundoSort({children,className}:MainFundo){
 return(
  
<MainSorte>
 <div className={`fundo ${className}`.trim()}>
      {children}
    </div>  

</MainSorte>
   

 )
}