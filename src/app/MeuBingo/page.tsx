"use client"



import Header from "@/componets/Header/Header";
import UserPagos from "@/componets/ProdutoBingo/UserPagos/userPagos";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default function MeusNumeros (){
    return(
        <>
        <Header/>

        <Suspense fallback={<div>Carregando jogo...</div>}>
                <UserPagos/>
            </Suspense>
        
        </>
    )
}