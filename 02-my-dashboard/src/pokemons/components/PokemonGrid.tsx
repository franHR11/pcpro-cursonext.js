import { SimplePokemon } from "../interfaces/simple-pokemons";
import { PokemonCard } from "./PokemonCard";


interface PokemonGridProps {
    pokemons: SimplePokemon[];
}


export const PokemonGrid = ({ pokemons }: PokemonGridProps) => {
    return (
        <>
            {
                pokemons.map((pokemon) => (
                    <div key={pokemon.id} className=" p-2 rounded-md">
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    </div>
                ))
            }
        </>
    )
}
