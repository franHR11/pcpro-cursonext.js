'use client';

import { IoTrashOutline } from "react-icons/io5";
import { createTodo } from "../helpers/todos";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteTodo } from "../helpers/todos";


export const NewTodo = () => {
    const [description, setDescription] = useState('');
    const router = useRouter();
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (description.trim() === '') return;
        await createTodo(description);
        setDescription('');

        router.refresh();

    }


    const deleteCompleted = async () => {
        await deleteTodo();
        router.refresh();
    }

    return (
        <form onSubmit={onSubmit} className='flex w-full bg-white p-4 rounded-lg shadow-sm'>
            <input type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                className="w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all ml-5 "
                placeholder="¿Qué necesita ser hecho?" />

            <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
                Crear
            </button>

            <span className='flex flex-1'></span>

            <button
                onClick={() => deleteCompleted()}
                type="button" className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all gap-2">
                <IoTrashOutline />
                Delete
            </button>


        </form>
    )
}