"use client";

import Link from "next/link"
import { SimplePokemon } from "../interfaces/simple-pokemons";
import Image from "next/image";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/src/store";
import { toggleFavorite } from "@/src/store/pokemons/pokemons";


interface PokemonCardProps {
    pokemon: SimplePokemon;
}


export const PokemonCard = ({ pokemon }: PokemonCardProps) => {

    const { id, name } = pokemon;
    const isFavorite = useAppSelector((state) => !!state.pokemons.favorites[id])

    const dispatch = useAppDispatch();



    const onToggleFavorite = () => {
        dispatch(toggleFavorite(pokemon));
    }

    return (
        <div className="mx-auto right-0 mt-2 w-60">
            <div className="flex flex-col  bg-white rounded overflow-hidden shadow-lg">
                <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
                    <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                        alt={name}
                        width={150}
                        height={150}
                        quality={90}
                        sizes="150px"
                        priority={false}
                    />
                    <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{name}</p>
                    <p className="text-sm text-gray-100"># {id}</p>
                    <div className="mt-5">
                        <Link href={`/dashboard/pokemons/pokemon/${id}`} className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100">
                            Ver Pokemon
                        </Link>
                    </div>
                </div>
                <div >
                    <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={onToggleFavorite}>
                        <div className="text-red-600">

                            {isFavorite ? <IoHeart className="w-5 h-5" /> : <IoHeartOutline className="w-5 h-5" />}




                        </div>
                        <div className="pl-3">
                            <p className="text-sm font-medium text-gray-800 leading-none">
                                {isFavorite ? "Es favorito" : "No es favorito"}
                            </p>
                            <p className="text-xs text-gray-500">{isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
