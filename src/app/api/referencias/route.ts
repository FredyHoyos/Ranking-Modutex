import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

// GET → listar todas las referencias
export async function GET() {
  const referencias = await prisma.referencia.findMany({
    orderBy: { createdAt: "desc" },
    include: { operaciones: true },
  });
  return NextResponse.json(referencias);
}

// POST → agregar referencia
export async function POST(req: Request) {
  const body = await req.json();
  const nueva = await prisma.referencia.create({
    data: {
      referencia: body.referencia,
      op: body.op,
      tiempo: body.tiempo, // tiempo de la referencia
      operaciones: {
        create: body.operaciones.map((op: any) => ({
          nombre: op.nombre,
          tiempo: op.tiempo,   // tiempo de la operación
          precio: op.precio,   // precio de la operación
          maquina: op.maquina,
        })),
      },
    },
    include: { operaciones: true },
  });
  return NextResponse.json(nueva);
}

