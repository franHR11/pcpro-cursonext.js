

import { CartCounter } from "@/src/Shopping-cart/components";
import { Metadata } from "next";




export const metadata: Metadata = {
    title: 'Counter Page',
    description: 'Counter Page',
    keywords: ['counter', 'counter page', 'counter app'],
    authors: [{ name: 'John Doe' }],
    openGraph: {
        title: 'Counter Page',
        description: 'Counter Page',
        type: 'website',
    },
};

export default function CounterPage() {




    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-4xl font-bold">Productos en el carrito</h1>
            <p className="text-2xl">This is a counter page</p>


            <CartCounter value={0} />


        </div>
    );
}