"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { postRestControlePreco } from "./RestControlePreco"
import "./CssControlePreco.css"
interface Preco {
    Id:number
    Preco:number
}

export default function ControlePreco (){
    const[dataPreco, setPreco] = useState< Preco>({
          Id:0,
          Preco:0
     })
     const Registro = (e: ChangeEvent<HTMLInputElement>) => {
        const { name , value } = e.target;
        setPreco((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const ChamadaSubimit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const postData = {
            ...dataPreco,
            Id: parseInt(dataPreco.Id.toString()),
            Preco:parseInt(dataPreco.Preco.toString()),
             // Conversão de cada número do array
        }
        console.error("venho de cath ", dataPreco);
        try {
            const RestData = await postRestControlePreco(postData);
            console.log(RestData, "User Information");

            
        } catch (error) {
            console.error("venho de cath ", error, dataPreco);
        }
    }
    return(
        <form className="ControlePrecoForm" onSubmit={ChamadaSubimit}>
        <label htmlFor="Idpreco">Id do Preço</label>
        <input 
            id="Idpreco" 
            type="number"
            name="Id"
            value={dataPreco.Id}
            onChange={Registro}
            placeholder="Id do produto"
            required
        />
        <label htmlFor="preco">O Preço do Produto</label>
        <input
            id="preco" 
            type="number"
            name="Preco"
            value={dataPreco.Preco}
            onChange={Registro}
            placeholder="Valor"
            required 
        />
        <button type="submit">Enviar</button>
    </form>
    )
}