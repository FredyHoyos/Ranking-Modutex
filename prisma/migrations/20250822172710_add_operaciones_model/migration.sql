/*
  Warnings:

  - You are about to drop the column `operaciones` on the `Referencia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Referencia" DROP COLUMN "operaciones";

-- CreateTable
CREATE TABLE "public"."Operacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tiempo" DOUBLE PRECISION NOT NULL,
    "maquina" TEXT NOT NULL,
    "referenciaId" INTEGER NOT NULL,

    CONSTRAINT "Operacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Operacion" ADD CONSTRAINT "Operacion_referenciaId_fkey" FOREIGN KEY ("referenciaId") REFERENCES "public"."Referencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
