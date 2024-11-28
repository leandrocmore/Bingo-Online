import Header from "@/componets/Header/Header";
import FilhoProdutoBingoCartProvider from "@/componets/ProdutoBingo/layout";
import Produto from "@/componets/ProdutoBingo/Produto/Produto";

export default function Home() {
  return (
    <FilhoProdutoBingoCartProvider>
<Header/>
   <Produto/>

    </FilhoProdutoBingoCartProvider> 
  );
}
