import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = searchParams.get("take") ?? "10";
  const skip = searchParams.get("skip") ?? "0";

  if (isNaN(parseInt(take)) || isNaN(parseInt(skip))) {
    return NextResponse.json(
      { error: "take y skip deben ser números" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take: parseInt(take),
    skip: parseInt(skip),
  });
  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = await postSchema.validate(body);
    const todo = await prisma.todo.create({
      data: {
        description: validated.description,
        complete: validated.complete,
      },
    });
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: (error as yup.ValidationError).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });
    return NextResponse.json(
      { message: "Todos eliminados correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as yup.ValidationError).message },
      { status: 500 }
    );
  }
}
