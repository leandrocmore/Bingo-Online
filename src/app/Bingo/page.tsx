"use client";

import Header from "@/componets/Header/Header";
import JogoBingo from "@/componets/ProdutoBingo/JogoBingo/JogoBingo";
import React, { Suspense } from "react";





export const dynamic = "force-dynamic";

export default function Bingo() {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Carregando jogo...</div>}>
                <JogoBingo/>
            </Suspense>
        </>
    );
}
