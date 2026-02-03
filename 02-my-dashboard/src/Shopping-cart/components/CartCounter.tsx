"use client";

import { useAppDispatch, useAppSelector } from "@/src/store";
import { subtractOne, addOne, initCounterState } from "@/src/store/counter/counterSlice";
import { useEffect } from "react";


interface CartCounterProps {
    value: number;
}



export const CartCounter = ({ value = 0 }: CartCounterProps) => {

    const count = useAppSelector((state) => state.counterReducer.count);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initCounterState(value));
    }, [value, dispatch]);




    return (
        <>

            <p className="text-2xl"><span className="text-8xl text-center font-bold">{count}</span></p>

            <div className="flex flex-row gap-2">




                <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all duration-300 cursor-pointer" onClick={() => dispatch(subtractOne())}>Decrementar</button>

                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-300 cursor-pointer" onClick={() => dispatch(addOne())}>Incrementar</button>
            </div>
        </>
    )
}
