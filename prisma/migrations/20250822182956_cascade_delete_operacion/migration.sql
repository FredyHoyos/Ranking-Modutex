-- DropForeignKey
ALTER TABLE "public"."Operacion" DROP CONSTRAINT "Operacion_referenciaId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Operacion" ADD CONSTRAINT "Operacion_referenciaId_fkey" FOREIGN KEY ("referenciaId") REFERENCES "public"."Referencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
