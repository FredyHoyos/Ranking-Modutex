import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

// ✅ PUT → editar operario completo
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const actualizado = await prisma.operario.update({
      where: { id: Number(params.id) },
      data: {
        nombre: body.nombre,
        numeroId: body.numeroId,
        porcentaje: body.porcentaje,
        username: body.username,
        password: body.password, // ⚠️ plano
      },
    });
    return NextResponse.json(actualizado);
  } catch (error) {
    console.error("Error en PUT /operarios/[id]:", error);
    return NextResponse.json(
      { error: "Error actualizando operario" },
      { status: 500 }
    );
  }
}

// ✅ DELETE → eliminar operario
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.operario.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Operario eliminado" });
  } catch (error) {
    console.error("Error en DELETE /operarios/[id]:", error);
    return NextResponse.json(
      { error: "Error eliminando operario" },
      { status: 500 }
    );
  }
}

// ✅ PATCH → actualizar parcialmente (ej. porcentaje)
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 params es una Promise en Next 13+
) {
  try {
    const body = await req.json();
    const { id } = await context.params;

    const updated = await prisma.operario.update({
      where: { id: Number(id) },
      data: body, // 🔹 solo lo que le mandes
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error en PATCH /operarios/[id]:", error);
    return NextResponse.json(
      { error: "Error actualizando operario" },
      { status: 500 }
    );
  }
}
