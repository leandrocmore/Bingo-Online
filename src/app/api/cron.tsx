import { limparCarrinhosExpirados } from "@/lib/controleApi/LimpezaAtualizador"; 


export default async function handler() {
  try {
    await limparCarrinhosExpirados();
   
  } catch (error) {
    console.error("Erro ao processar carrinhos expirados.", error);
    throw new Error("Erro ao processar carrinhos expirados.");
  
  }
}