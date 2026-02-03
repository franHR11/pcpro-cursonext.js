'use client'

import { Provider } from "react-redux"
import { store } from "./"
import { useEffect } from "react"
import { setFavorites } from "./pokemons/pokemons"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {

    useEffect(() => {
        const favorites = JSON.parse(
            localStorage.getItem("favoritePokemons") ?? "{}",
        );
        store.dispatch(setFavorites(favorites));
    }, []);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}


