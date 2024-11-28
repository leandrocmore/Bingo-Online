"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
    GetJogoBingo,
    getMapWinJogoBingo,
    getSorteadorJogoBingo,
} from "./restJogoBingo";
import "./cssJogoBingo.css";
import Fundo from "@/componets/Main/MainComponents/Fundo/Fundo";

interface MapaDePosicao {
    mapWin: {
        positions: number[];
        letter: string;
    }[];
}

interface Produto {
    Id: number;
    Numero: number[];
    Status: string;
}

const JogoBingo: React.FC = () => {
    const [tables, setTables] = useState<(number | string)[][][]>([]);
    const [selected, setSelected] = useState<boolean[][][]>([]);
    const [mapaPosicao, setMapa] = useState<MapaDePosicao["mapWin"]>([]);
    const [sorteado, setSorteadosNumbers] = useState<Set<number>>(new Set());
    const [isGameWon, setIsGameWon] = useState(false);
    const [cartelas, setCartelas] = useState<Produto[]>([]);
    const searchParams = useSearchParams();
    const Bingo = searchParams.get("Bingo");

    // Inicializa o jogo e carrega dados
    useEffect(() => {
        const initializeGame = async () => {
            try {
                const cartelasApi = await GetJogoBingo(Bingo || "");
                if (!cartelasApi || cartelasApi.length === 0) {
                    console.error("Nenhuma cartela recebida.");
                    return;
                }

                setCartelas(cartelasApi);

                const generatedTables = cartelasApi.map((cartela) =>
                    Array.from({ length: 5 }, (_, rowIndex) =>
                        Array.from(
                            { length: 5 },
                            (_, colIndex) =>
                                cartela.Numero[rowIndex * 5 + colIndex] || ""
                        )
                    )
                );

                const initialSelected = cartelasApi.map(() =>
                    Array.from({ length: 5 }, () => Array(5).fill(false))
                );

                setTables(generatedTables);
                setSelected(initialSelected);

                const mapa = await getMapWinJogoBingo();
                setMapa(mapa || []);
            } catch (error) {
                console.error("Erro ao inicializar o jogo:", error);
            }
        };

        initializeGame();
    }, [Bingo]);

    // Atualiza números sorteados periodicamente
    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const numbers = await getSorteadorJogoBingo();
                if (Array.isArray(numbers)) {
                    setSorteadosNumbers((prevNumbers) => {
                        const newNumbers = new Set(prevNumbers);
                        numbers.forEach((number: number) => newNumbers.add(number));
                        return newNumbers;
                    });
                }
            } catch (error) {
                console.error("Erro ao obter números sorteados:", error);
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const handleCellClick = (tableIndex: number, rowIndex: number, colIndex: number) => {
        if (isGameWon || selected[tableIndex][rowIndex][colIndex]) return;

        const cellNumber = tables[tableIndex][rowIndex][colIndex] as number;
        if (!sorteado.has(cellNumber)) return;

        const index = rowIndex * 5 + colIndex;
        let letter: number | string = cellNumber;

        mapaPosicao.forEach(({ positions, letter: currentLetter }) => {
            if (positions.includes(index)) {
                letter = currentLetter;
            }
        });

        setTables((prevTables) =>
            prevTables.map((table, i) =>
                i === tableIndex
                    ? table.map((row, r) =>
                          row.map((cell, c) =>
                              r === rowIndex && c === colIndex ? letter : cell
                          )
                      )
                    : table
            )
        );

        setSelected((prevSelected) =>
            prevSelected.map((sel, i) =>
                i === tableIndex
                    ? sel.map((row, r) =>
                          row.map((col, c) =>
                              r === rowIndex && c === colIndex ? true : col
                          )
                      )
                    : sel
            )
        );

        if (checkVictory(selected[tableIndex])) {
            setIsGameWon(true);
            alert(`Você venceu na Tabela ${tableIndex + 1}!`);
        }
    };

    const checkVictory = (selected: boolean[][]): boolean => {
        for (let i = 0; i < 5; i++) {
            if (selected[i].every((val) => val) || selected.every((row) => row[i])) {
                return true;
            }
        }
        if (
            selected.every((row, idx) => row[idx]) ||
            selected.every((row, idx) => row[4 - idx])
        ) {
            return true;
        }
        return false;
    };

    return (
        <Fundo>
            <div>
                <h1>Bingo</h1>
                <div style={{ display: "flex", gap: "20px" }}>
                    {tables.map((table, tableIndex) => (
                        <div key={tableIndex}>
                            <h3>Tabela {cartelas[tableIndex]?.Id || "Desconhecido"}</h3>
                            <table className="produto-table">
                                <tbody>
                                    {table.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell, colIndex) => (
                                                <td
                                                    key={colIndex}
                                                    onClick={() =>
                                                        handleCellClick(
                                                            tableIndex,
                                                            rowIndex,
                                                            colIndex
                                                        )
                                                    }
                                                    className={
                                                        selected[tableIndex][rowIndex][colIndex]
                                                            ? "selected"
                                                            : ""
                                                    }
                                                    aria-label={`Célula ${rowIndex}-${colIndex}`}
                                                >
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
                <h3>Números sorteados: {Array.from(sorteado).join(", ")}</h3>
            </div>
        </Fundo>
    );
};

export default JogoBingo;
