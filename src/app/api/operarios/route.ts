import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

// ✅ GET → listar todos los operarios
export async function GET() {
  try {
    const operarios = await prisma.operario.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(operarios);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener operarios" }, { status: 500 });
  }
}

// ✅ POST → crear un nuevo operario
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nuevoOperario = await prisma.operario.create({
      data: {
        nombre: body.nombre,
        numeroId: body.numeroId,
        porcentaje: body.porcentaje,
        username: body.username,
        password: body.password, // 🔑 sin encriptar como dijiste
      },
    });
    return NextResponse.json(nuevoOperario);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear operario" }, { status: 500 });
  }
}
