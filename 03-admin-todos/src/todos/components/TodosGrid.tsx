"use client"

import { Todo } from "@/src/generated/prisma/client";
import { TodosItems } from "./TodosItems";


/* import * as api from "@/src/todos/helpers/todos"; */
/* import { useRouter } from "next/navigation"; */
import { toggleTodo } from "../actions/todo-actions";

interface TodosGridProps {
    todos: Todo[];
}



export const TodosGrid = ({ todos = [] }: TodosGridProps) => {

    /* const router = useRouter(); */


/*     const toggleTodo = async (id: string, complete: boolean) => {
        await api.updateTodo(id, complete);
        router.refresh();
    } */




    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                todos.map((todo) => (
                    <TodosItems key={todo.id} todos={todo} toggleTodo={toggleTodo} />
                ))
            }
        </div>
    );
};
