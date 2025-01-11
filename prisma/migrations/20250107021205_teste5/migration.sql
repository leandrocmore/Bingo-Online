/*
  Warnings:

  - You are about to drop the column `encodedImage` on the `Carrinho` table. All the data in the column will be lost.
  - You are about to drop the column `payload` on the `Carrinho` table. All the data in the column will be lost.
  - Added the required column `assasCkeckup` to the `Carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carrinho" DROP COLUMN "encodedImage",
DROP COLUMN "payload",
ADD COLUMN     "assasCkeckup" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AssasCkeckup" (
    "ExternalReference" TEXT NOT NULL,
    "EncodedImage" TEXT NOT NULL,
    "Payload" TEXT NOT NULL,

    CONSTRAINT "AssasCkeckup_pkey" PRIMARY KEY ("ExternalReference")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssasCkeckup_ExternalReference_key" ON "AssasCkeckup"("ExternalReference");

-- AddForeignKey
ALTER TABLE "Carrinho" ADD CONSTRAINT "Carrinho_assasCkeckup_fkey" FOREIGN KEY ("assasCkeckup") REFERENCES "AssasCkeckup"("ExternalReference") ON DELETE RESTRICT ON UPDATE CASCADE;
