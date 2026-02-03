import { Todo } from "@/src/generated/prisma/client";
import { IoMdSquareOutline } from "react-icons/io";
import { IoCheckboxOutline } from "react-icons/io5";

interface TodosItemsProps {
    todos: Todo;
    toggleTodo: (id: string, complete: boolean) => void;
}

const styleTodoDone = "line-through bg-green-50 rounded-lg shadow-sm p-5 border-dashed border border-green-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 cursor-pointer hover:bg-green-100";

const styleTodoPending = "bg-red-50 rounded-lg shadow-sm p-5 border-dashed border border-red-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 cursor-pointer hover:bg-red-100";






export const TodosItems = ({ todos, toggleTodo }: TodosItemsProps) => {
    return (


        <div onClick={() => toggleTodo(todos.id, !todos.complete)} className={todos.complete ? styleTodoDone : styleTodoPending + " flex items-center gap-2"}>

            {todos.complete ? (
                <IoCheckboxOutline size={30} className="text-green-500" />
            ) : (
                <IoMdSquareOutline size={30} className="text-blue-500" />
            )}

            <h3 className="text-lg font-bold">{todos.description}</h3>
            <p className="text-sm text-gray-500">{todos.createdAt.toLocaleDateString()}</p>

        </div>

    );
};
