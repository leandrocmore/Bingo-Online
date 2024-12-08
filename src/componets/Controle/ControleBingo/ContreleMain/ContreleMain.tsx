"use client"


import LouguiOut from "../../loguinOut/page"
import FundoCtr from "../Main/MainComponents/Fundo/FundoCtr"
import ControleMapa from "./ControleMapa/ControleMapa"
import ControlePreco from "./ControlePreco/ControlePreco"
import ControleProduto from "./ControleProduto/ControleProduto"
import "./CssContreleMain.css"



export default function ControleMain(){
    
    return(
        <FundoCtr>
<LouguiOut/>
     <div className="controleMain">

            
            <div className="controle Mapa">
                <h3>Mapa</h3>
                 <ControleMapa/>
            </div>
            <div className="controle Produto">
                <h3>Produto</h3>
                < ControleProduto/>
            </div>
             <div className="controle Preco">
                <h3>Preço</h3>
                 <ControlePreco/>
             </div>
             
    </div>
          
        </FundoCtr>
    )
}