"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { postRestContreleMapa } from "./RestContreleMapa";
import "./ControleMapa.css";

interface Mapwin {
  MapWinId: number;
  MapWin: Array<{ positions: number[]; letter: string }>;
}

export default function ControleMapa() {
  const [error, setError] = useState<string>("");
  const [dataMap, setMap] = useState<Mapwin>({
    MapWinId: 0,
    MapWin: [],
  });
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Registro do ID do Mapa
  const Registro = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMap((prev) => ({
      ...prev,
      MapWinId: parseInt(value, 10), // Corrigido para base 10
    }));
  };

  // Registro e validação do JSON inserido
  const RegistroJson = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    try {
      const parsedJson = JSON.parse(value) as Array<{ positions: number[]; letter: string }>;

      // Verificação básica do formato do JSON
      if (
        Array.isArray(parsedJson) &&
        parsedJson.every(
          (item) =>
            Array.isArray(item.positions) &&
            item.positions.every((pos) => typeof pos === "number") &&
            typeof item.letter === "string"
        )
      ) {
        setMap((prev) => ({
          ...prev,
          MapWin: parsedJson,
        }));
        setError("");
      } else {
        throw new Error("Formato JSON inválido.");
      }
    } catch (err) {
      setError("Erro no JSON: " + (err as Error).message);
    }
  };

  // Envio do Formulário
  const ChamadaSubimit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Enviar o JSON completo
    try {
      const mapData = {
        MapWinId: dataMap.MapWinId,
        MapWin: dataMap.MapWin,
      };

      const RestData = await postRestContreleMapa(mapData);
      console.log(RestData, "Mapa Enviado com Sucesso");

      // Ação pós envio (como limpar os campos ou exibir mensagem de sucesso)
      setSuccessMessage("Mapa enviado com sucesso!");
      setMap({ MapWinId: 0, MapWin: [] });
      setError("");
    } catch (error) {
      console.error("Ocorreu um erro!", error);
      setError("Ocorreu um erro ao enviar o mapa.");
    }
  };

  return (
    <form className="ControleMapaForm" onSubmit={ChamadaSubimit}>
      <label htmlFor="MapWinId">ID do Mapa do Bingo</label>
      <input
        id="MapWinId"
        type="number"
        name="MapWinId"
        value={dataMap.MapWinId}
        onChange={Registro}
        placeholder="ID do Mapa"
        required
      />

      <label htmlFor="MapWinJson">Insira o JSON do Mapa</label>
      <textarea
        id="MapWinJson"
        rows={10}
        value={JSON.stringify(dataMap.MapWin, null, 2)} // Exibe o estado atual do JSON
        onChange={RegistroJson}
        placeholder='Exemplo: [{"positions":[0,1,2],"letter":"B"}]'
      />

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button type="submit">Enviar Mapa</button>
    </form>
  );
}
