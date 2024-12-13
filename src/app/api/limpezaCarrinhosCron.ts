import cron from 'node-cron';
import { limparCarrinhosExpirados } from '../../lib/controleApi/LimpezaAtualizador'; // Ajuste o caminho conforme necessário

// Agendar a execução da função de limpeza a cada minuto (ou qualquer intervalo desejado)
cron.schedule('*/1 * * * *', async () => {  // Isso executa a cada 1 minuto
  try {
    console.log("Iniciando limpeza de carrinhos expirados...");
    await limparCarrinhosExpirados();  // Chama a função de limpeza
    console.log("Limpeza de carrinhos concluída.");
  } catch (error) {
    console.error("Erro ao limpar carrinhos expirados:", error);
  }
});
