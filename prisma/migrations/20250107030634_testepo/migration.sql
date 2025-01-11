/*
  Warnings:

  - The primary key for the `AssasCkeckup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ExternalReference` on the `AssasCkeckup` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AssasCkeckup_ExternalReference_key";

-- AlterTable
ALTER TABLE "AssasCkeckup" DROP CONSTRAINT "AssasCkeckup_pkey",
DROP COLUMN "ExternalReference",
ADD COLUMN     "IdAssasCkeckup" SERIAL NOT NULL,
ADD CONSTRAINT "AssasCkeckup_pkey" PRIMARY KEY ("IdAssasCkeckup");
