import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

// PUT → editar referencia y operaciones
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const actualizada = await prisma.referencia.update({
      where: { id: Number(params.id) },
      data: {
        referencia: body.referencia,
        op: body.op,
        tiempo: body.tiempo,
        operaciones: {
          deleteMany: {}, // 👈 elimina todas las operaciones anteriores
          create: body.operaciones.map((op: any) => ({
            nombre: op.nombre,
            tiempo: op.tiempo,
            maquina: op.maquina,
          })),
        },
      },
      include: { operaciones: true }, // 👈 devuelve también las operaciones
    });

    return NextResponse.json(actualizada);
  } catch (error) {
    console.error("Error en PUT:", error);
    return NextResponse.json(
      { error: "Error actualizando referencia" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 👈 resolver params con await

    await prisma.referencia.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Referencia eliminada" });
  } catch (error) {
    console.error("Error en DELETE:", error);
    return NextResponse.json(
      { error: "Error eliminando referencia" },
      { status: 500 }
    );
  }
}
// PATCH → actualizar solo el campo "mostrar"
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updated = await prisma.referencia.update({
      where: { id: Number(params.id) },
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


// GET → obtener referencia por id
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const referencia = await prisma.referencia.findUnique({
      where: { id: Number(params.id) },
      include: { operaciones: true },
    });

    if (!referencia) {
      return NextResponse.json(
        { error: "Referencia no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(referencia);
  } catch (error) {
    console.error("Error en GET:", error);
    return NextResponse.json(
      { error: "Error obteniendo referencia" },
      { status: 500 }
    );
  }
}
