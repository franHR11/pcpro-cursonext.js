import Link from 'next/link';
import { EvolutionCard } from './EvolutionCard';

interface EvolutionChainProps {
    evolutions: {
        name: string;
        id: string;
        sprite?: string;
        canEvolve: boolean;
        evolutionLevel: number | null;
    }[];
    currentPokemonId: string;
}

export function EvolutionChain({ evolutions, currentPokemonId }: EvolutionChainProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-700 mb-4">Cadena de evolucion</h3>
            <div className="flex items-center justify-center flex-wrap gap-4">
                {evolutions.map((evo, index) => (
                    <div key={evo.id} className="flex items-center">
                        <Link
                            href={`/dashboard/pokemons/pokemon/${evo.id}`}
                            className="hover:opacity-80 transition"
                            aria-label={`Ir a ${evo.name}`}
                        >
                            <EvolutionCard
                                name={evo.name}
                                id={evo.id}
                                sprite={evo.sprite}
                                isCurrent={evo.id === currentPokemonId}
                                canEvolve={evo.canEvolve}
                                evolutionLevel={evo.evolutionLevel}
                            />
                        </Link>
                        {index < evolutions.length - 1 && (
                            <div className="mx-4 text-2xl text-gray-300">→</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
