import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { description: "Aprender Prisma", complete: false },
      { description: "Crear API con Next.js", complete: false },
      { description: "Desplegar en Vercel", complete: true },
      { description: "Crear un CRUD con Next.js", complete: false },
      { description: "Crear un CRUD con Prisma", complete: false },
      { description: "Crear un CRUD con Next.js y Prisma", complete: false },
      { description: "Crear un CRUD con Next.js y Prisma", complete: false },
    ],
  });

  return NextResponse.json(
    {
      message: "Seed ejecutado correctamente",
    },
    { status: 200 }
  );
}
