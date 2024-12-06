"use client"



import ControleMain from "@/componets/Controle/ControleBingo/ContreleMain/ContreleMain"
import HeaderCtr from "@/componets/Controle/ControleBingo/Header/Header"


import { Suspense } from "react"

export default function Controle() {
    return(
        <>
        <HeaderCtr/>
        <Suspense fallback={<div>Carregando jogo...</div>}>
          <ControleMain/>
    </Suspense>
        </>
       
    )
}