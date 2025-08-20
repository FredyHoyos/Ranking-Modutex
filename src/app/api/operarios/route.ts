import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


// ✅ GET → listar todos los operarios (incluye los datos del usuario asociado)
export async function GET() {
  try {
    const operarios = await prisma.operario.findMany({
      include: {
        user: true, 
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(operarios);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener operarios" }, { status: 500 });
  }
}

// ✅ POST → crear un nuevo operario con su usuario asociado
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const hashedPassword = await bcrypt.hash(body.password, 10);


    const nuevoOperario = await prisma.operario.create({
      data: {
        numeroId: body.numeroId,
        porcentaje: body.porcentaje ?? 0,

        // 👇 Crea el User asociado
        user: {
          create: {
            name: body.nombre,
            username: body.username,
            password: hashedPassword, // 🔑 sin encriptar
            role: "USER", // siempre será USER
          },
        },
      },
      include: {
        user: true, // 👈 devolver también los datos del user
      },
    });

    return NextResponse.json(nuevoOperario);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear operario" }, { status: 500 });
  }
}
