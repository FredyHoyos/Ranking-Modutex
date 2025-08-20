import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// ✅ PUT → editar operario completo (y su User asociado)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const actualizado = await prisma.operario.update({
      where: { id: Number(params.id) },
      data: {
        numeroId: body.numeroId,
        porcentaje: body.porcentaje,
        user: {
          update: {
            name: body.nombre,
            username: body.username,
            password: body.password, // plano
          },
        },
      },
      include: { user: true }, // devuelve datos completos
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

// ✅ DELETE → eliminar operario y su User asociado
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const eliminado = await prisma.operario.delete({
      where: { id: Number(params.id) },
      include: { user: true },
    });

    // También eliminamos el User asociado
    await prisma.user.delete({
      where: { id: eliminado.userId },
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

// ✅ PATCH → actualizar parcialmente (ej. solo porcentaje)
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id } = await context.params;

    const updated = await prisma.operario.update({
      where: { id: Number(id) },
      data: {
        ...(body.numeroId && { numeroId: body.numeroId }),
        ...(body.porcentaje && { porcentaje: body.porcentaje }),
        ...(body.user && {
          user: {
            update: {
              ...(body.user.name && { name: body.user.name }),
              ...(body.user.username && { username: body.user.username }),
              ...(body.user.password && { password: body.user.password }),
            },
          },
        }),
      },
      include: { user: true },
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
