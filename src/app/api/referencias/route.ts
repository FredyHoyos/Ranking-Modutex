import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

// GET → listar todas las referencias
export async function GET() {
  const referencias = await prisma.referencia.findMany({
    orderBy: { createdAt: "desc" }
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
      operaciones: body.operaciones,
      tiempo: body.tiempo
    }
  });
  return NextResponse.json(nueva);
}
