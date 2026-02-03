"use client";

import { useAppSelector } from "@/src/store";
import { PokemonGrid } from "./PokemonGrid";
import { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";

export const FavoritePokemons = () => {

    const favoritePokemons = useAppSelector(state => Object.values(state.pokemons.favorites));







    return (

        <>
            {
                favoritePokemons.length === 0 ? (
                    <NoFavorites />
                ) : (
                    <PokemonGrid pokemons={favoritePokemons} />
                )
            }



        </>

    );




};

export const NoFavorites = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <IoHeartOutline size={100} className="text-red-500" />
            <h1 className="text-4xl font-bold">No hay favoritos</h1>
        </div>
    );
}
