import { Todo } from "@/src/generated/prisma/client";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findUnique({
    where: { id: id },
  });
  if (!todo) {
    return null;
  }
  return todo;
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json({ error: "Todo no encontrado" }, { status: 404 });
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json({ error: "Todo no encontrado" }, { status: 404 });
  }

  try {
    const { description, complete } = await request.json();
    const validated = await putSchema.validate({ description, complete });
    const updatedTodo = await prisma.todo.update({
      where: { id: id },
      data: {
        description: validated.description ?? todo.description,
        complete: validated.complete ?? todo.complete,
      },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: (error as yup.ValidationError).message },
      { status: 400 }
    );
  }
}
