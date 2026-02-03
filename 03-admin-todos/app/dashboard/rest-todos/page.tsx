import { prisma } from "@/src/lib/prisma";
import { NewTodo, TodosGrid } from "@/src/todos";

export const metadata = {
    title: 'Listado de Todos',
    description: 'Listado de Todos',
    keywords: ['todos', 'todos page', 'todos app'],
    authors: [{ name: 'franHR' }],
};


export default async function RestTodosPage() {






    const todos = await prisma.todo.findMany({
        orderBy: {
            description: 'asc',
        },
    });

    return (
        <div>
            <div className="mb-6 w-full">
                <NewTodo />

            </div>


            <h1 className="text-2xl font-bold mb-6">Listado de Todos</h1>
            <TodosGrid todos={todos} />
        </div>
    );
}