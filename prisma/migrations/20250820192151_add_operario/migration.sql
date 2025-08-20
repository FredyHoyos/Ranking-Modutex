-- CreateTable
CREATE TABLE "public"."Operario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "numeroId" TEXT NOT NULL,
    "porcentaje" INTEGER NOT NULL DEFAULT 0,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Operario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operario_numeroId_key" ON "public"."Operario"("numeroId");

-- CreateIndex
CREATE UNIQUE INDEX "Operario_username_key" ON "public"."Operario"("username");
