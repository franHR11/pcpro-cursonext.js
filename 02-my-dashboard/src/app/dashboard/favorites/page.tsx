import { PokemonsResponse } from "@/src/pokemons/interfaces/pokemons-response";
import { SimplePokemon } from "@/src/pokemons/interfaces/simple-pokemons";
import { Metadata } from "next";
import { FavoritePokemons } from "@/src/pokemons";



export const metadata: Metadata = {
    title: 'Favoritos',
    description: 'Favoritos',
    keywords: ['favoritos', 'favoritos page', 'favoritos app'],
    authors: [{ name: 'franHR' }],
};





const getPokemons = async (limit: number = 20, offset: number = 0): Promise<SimplePokemon[]> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data: PokemonsResponse = await res.json();

    const pokemons = data.results.map((pokemon) => {
        return {
            id: pokemon.url.split('/').at(-2) || '',
            name: pokemon.name,
        }
    });

    /* throw new Error('Error al obtener los pokemons'); */

    return pokemons;
}




export default async function PokemonPage() {

    return (



        <div className="flex flex-col items-center justify-center  gap-2">



            <h1 className="text-4xl font-bold">Listado de Favoritos</h1>

            <div className="flex flex-wrap gap-2">

                <FavoritePokemons />

            </div>
        </div>
    );

}












