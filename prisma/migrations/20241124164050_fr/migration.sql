-- CreateEnum
CREATE TYPE "CarrinhoStatus" AS ENUM ('EmProcessamento', 'PagamentoPendente', 'PagamentoConfirmado', 'Cancelado');

-- CreateEnum
CREATE TYPE "ProdutoStatus" AS ENUM ('Indisponivel', 'Disponivel', 'Comprado');

-- CreateTable
CREATE TABLE "UserClientes" (
    "Tel" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,

    CONSTRAINT "UserClientes_pkey" PRIMARY KEY ("Tel")
);

-- CreateTable
CREATE TABLE "Carrinho" (
    "IdCarrinho" SERIAL NOT NULL,
    "ProdutoId" INTEGER[],
    "DataHoraInicio" TIMESTAMP(3) NOT NULL,
    "Quantidade" INTEGER NOT NULL DEFAULT 1,
    "TelClientesId" TEXT NOT NULL,
    "Status" "CarrinhoStatus" NOT NULL DEFAULT 'EmProcessamento',

    CONSTRAINT "Carrinho_pkey" PRIMARY KEY ("IdCarrinho")
);

-- CreateTable
CREATE TABLE "Produto" (
    "Id" INTEGER NOT NULL,
    "Numeros" INTEGER[],
    "Status" "ProdutoStatus" NOT NULL DEFAULT 'Disponivel',

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "TransacaoPagos" (
    "Id" SERIAL NOT NULL,
    "TelClientesId" TEXT NOT NULL,
    "ProdutoId" INTEGER[],
    "Quantidade" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "DataTransacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransacaoPagos_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ProdutoPreco" (
    "Id" SERIAL NOT NULL,
    "Preco" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "ProdutoPreco_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "BingoMapWin" (
    "MapWinId" INTEGER NOT NULL,
    "MapWin" JSONB NOT NULL,

    CONSTRAINT "BingoMapWin_pkey" PRIMARY KEY ("MapWinId")
);

-- CreateTable
CREATE TABLE "Sorteador" (
    "SorteadorId" INTEGER NOT NULL,
    "NumeroSorteados" INTEGER[],

    CONSTRAINT "Sorteador_pkey" PRIMARY KEY ("SorteadorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserClientes_Tel_key" ON "UserClientes"("Tel");

-- AddForeignKey
ALTER TABLE "Carrinho" ADD CONSTRAINT "Carrinho_TelClientesId_fkey" FOREIGN KEY ("TelClientesId") REFERENCES "UserClientes"("Tel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransacaoPagos" ADD CONSTRAINT "TransacaoPagos_TelClientesId_fkey" FOREIGN KEY ("TelClientesId") REFERENCES "UserClientes"("Tel") ON DELETE RESTRICT ON UPDATE CASCADE;
