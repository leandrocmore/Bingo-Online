"use client";
import { signOut } from "next-auth/react";

export default function LouguiOut () {
    return(
       <>
       <button onClick={()=>signOut()} >sair</button>
       </>

    )
}