"use server";

import { Todo } from "@/src/generated/prisma/client";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export const sleep = async (ms: number = 0) => new Promise(resolve => setTimeout(resolve, ms * 1000));



export const toggleTodo = async (id: string, complete: boolean): Promise<{
    ok: boolean;
    message?: string;
    updatedTodo?: Todo;
}> => {


    await sleep(2);
    const todo = await prisma.todo.findUnique({
        where: {
            id,
        },
    });

    if (!todo) {
        return {
            ok: false,
            message: 'Todo no encontrado',
        };
    }

    const updatedTodo = await prisma.todo.update({
        where: {
            id,
        },
        data: {
            complete,
        },
    });

    revalidatePath('/dashboard/server-todos');

    return {
        ok: true,
        updatedTodo,
    };

}

export const createTodo = async (description: string) => {


try {

    const todo = await prisma.todo.create({
        data: {
            description,
        },
    });

    if (description.trim().length === 0) {
        return {
            ok: false,
            message: 'La descripción es requerida',
        };
    }

    revalidatePath('/dashboard/server-todos');

    return {
        ok: true,
        todo,
    };
}

 catch (error) {
    console.log(error);
    return {
        ok: false,
        message: 'Error al crear el todo',
    }
}
}


export const deleteTodo = async (): Promise<{
    ok: boolean;
    message?: string;
}> => {

    try {
        await prisma.todo.deleteMany({
            where: {
                complete: true,
            },
        });

        revalidatePath('/dashboard/server-todos');

        return {
            ok: true,
            message: 'Todos completados eliminados',
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error al eliminar los todos completados',
        };
    }
}
