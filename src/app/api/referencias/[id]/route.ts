import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

// PUT → editar referencia
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const actualizada = await prisma.referencia.update({
    where: { id: Number(params.id) },
    data: {
      referencia: body.referencia,
      op: body.op,
      operaciones: body.operaciones,
      tiempo: body.tiempo
    }
  });
  return NextResponse.json(actualizada);
}

// DELETE → eliminar referencia
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.referencia.delete({
    where: { id: Number(params.id) }
  });
  return NextResponse.json({ message: "Referencia eliminada" });
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 params es una Promise
) {
  try {
    const body = await req.json();

    const { id } = await context.params; // 👈 aquí lo esperas
    const updated = await prisma.referencia.update({
      where: { id: Number(id) },
      data: { mostrar: body.mostrar },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error en PATCH:", error);
    return NextResponse.json(
      { error: "Error actualizando referencia" },
      { status: 500 }
    );
  }
}
