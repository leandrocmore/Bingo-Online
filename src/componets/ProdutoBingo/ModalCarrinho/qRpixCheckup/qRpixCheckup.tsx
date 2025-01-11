import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./cssQrPixCheckup.css";
import Fundo from "@/componets/Main/MainComponents/Fundo/Fundo";
import { GetpixCarrinho } from "./RestqRpixCheckup";

interface AssasCkeckup {
  EncodedImage: string;
  Payload: string;
  carrinhoId: string;
}

interface Carrinho {
  IdCarrinho: string;
  ProdutoId: number[];
  DataHoraInicio: string;
  Quantidade: number;
  TelClientesId: string;
  Status: string;
  AssasCkeckup: AssasCkeckup[];
}

interface ApiResponse {
  mensagem: string;
  Carrinho: Carrinho[];
}

interface qRpixCheckupProps {
  idGerado: string;
  onClose: () => void;
}

const QRpixCheckup: React.FC<qRpixCheckupProps> = ({ idGerado, onClose }) => {
  const [piXdata, setPixData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchpix = async () => {
      try {
        const dadosCarrinho = await GetpixCarrinho(idGerado);
        console.log("Dados do Carrinho:", dadosCarrinho);
        setPixData(dadosCarrinho);
      } catch (erro) {
        console.error("Erro em CarrinhoModal:", erro);
      } finally {
        setLoading(false);
      }
    };

    fetchpix();
  }, [idGerado]);

  const copiarPayload = async (payload: string) => {
    try {
      await navigator.clipboard.writeText(payload);
      alert("Chave Pix copiada!");
    } catch (err) {
      console.error("Erro ao copiar o Pix:", err);
      alert("Erro ao copiar a chave Pix. Copie manualmente.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!piXdata || piXdata.Carrinho.length === 0) return <p>Não há dados disponíveis para este carrinho.</p>;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Fundo>
          <h2>Pagamento</h2>
          {piXdata.Carrinho.map((pix, index) => (
            <div key={index}>
              <p><strong>Tel Cliente:</strong> {pix.TelClientesId}</p>
              <p><strong>Status:</strong> {pix.Status}</p>
              <p><strong>Quantidade:</strong> {pix.Quantidade}</p>
              <p><strong>Imagem do Pix</strong></p>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Image
                  src={`data:image/png;base64,${pix.AssasCkeckup[0].EncodedImage}`}
                  alt="Pix QR Code"
                  width={200}
                  height={200}
                />
              </div>

              <p><strong>Chave Pix (Copia e Cola):</strong></p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={pix.AssasCkeckup[0].Payload}
                  readOnly
                  style={{ width: "100%", marginRight: "10px" }}
                />
                <button onClick={() => copiarPayload(pix.AssasCkeckup[0].Payload)}>
                  Copiar
                </button>
              </div>
            </div>
          ))}
          <button onClick={onClose}>Fechar</button>
        </Fundo>
      </div>
    </div>
  );
};

export default QRpixCheckup;
