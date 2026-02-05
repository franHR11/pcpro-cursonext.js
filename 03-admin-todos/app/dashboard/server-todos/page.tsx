import { prisma } from "@/src/lib/prisma";
import { NewTodo, TodosGrid } from "@/src/todos";

export const metadata = {
    title: 'Server Actions Todos',
    description: 'Server Actions Todos',
    keywords: ['server actions todos', 'server actions todos page', 'server actions todos app'],
    authors: [{ name: 'franHR' }],
};


export default async function ServerTodosPage() {






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


            <h1 className="text-2xl font-bold mb-6">Server Actions Todos</h1>
            <TodosGrid todos={todos} />
        </div>
    );
}