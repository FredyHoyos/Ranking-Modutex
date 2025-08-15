-- CreateTable
CREATE TABLE "public"."Referencia" (
    "id" SERIAL NOT NULL,
    "referencia" INTEGER NOT NULL,
    "op" INTEGER NOT NULL,
    "operaciones" INTEGER NOT NULL,
    "tiempo" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referencia_pkey" PRIMARY KEY ("id")
);
