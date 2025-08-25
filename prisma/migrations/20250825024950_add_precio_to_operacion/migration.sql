/*
  Warnings:

  - You are about to drop the column `precio` on the `Referencia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Operacion" ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "public"."Referencia" DROP COLUMN "precio";
