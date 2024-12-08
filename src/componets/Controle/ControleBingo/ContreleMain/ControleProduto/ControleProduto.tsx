"use client"

import { ChangeEvent, FormEvent, useState } from "react"

import "./CssControleProduto.css"
import { postControleProduto } from "./RestControleProduto";
  
interface Produto {
    Id: number;
    Numeros: number[]; 
    Status: string;
}

export default function ControleProduto(){
    const status = "Disponivel"
    const [dataPro, setProduto] = useState<Produto>({
        Id: 0,
        Numeros: [], 
        Status: status,
    })

    const Registro = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (name === 'Id') {
            setProduto((prevData) => ({
                ...prevData,
                Id: Number(value)
            }));
        } else if (name === 'Numeros') {
            const numerosArray = value.split(',').map(num => Number(num.trim())).filter(num => !isNaN(num));
            
            setProduto((prevData) => ({
                ...prevData,
                Numeros: numerosArray
            }));
        }
    };

    const ChamadaSubimit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const postData = {
            ...dataPro,
            Id: parseInt(dataPro.Id.toString()),
            Numeros: dataPro.Numeros.map(numero => parseInt(numero.toString())) // Conversão de cada número do array
        }

        try {
            const RestData = await postControleProduto(postData);
            console.log(RestData, "User Information");

           
        } catch (error) {
            console.error("There was an error!", error, dataPro);
        }
    }

    return(
        <form className="ControleProdutoForm" onSubmit={ChamadaSubimit}>
            <label htmlFor="produto">ID do Produto</label>
            <input 
                id="produto"
                type="number" 
                name="Id"
                value={dataPro.Id}
                onChange={Registro}
                placeholder="O Id do produto"
                required
            />
            
            <label htmlFor="numero">Números</label>
            <input 
                id="numero"
                type="text"
                name="Numeros"
                value={dataPro.Numeros.join(', ')}
                onChange={Registro}
                placeholder="Digite números separados por vírgula"
            />

            <button type="submit">Enviar</button>
        </form>
    )
}