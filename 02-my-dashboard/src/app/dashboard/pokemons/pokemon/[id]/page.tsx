import { Pokemon } from "@/src/pokemons";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    getPokemonSpecies,
    getEvolutionChain,
    extractEvolutionChainId,
    getPokemonDescription,
    getEvolutionChainList,
    getPokemonSprite
} from "@/src/pokemons/utils/pokemon-api";
import { EvolutionChain } from "@/src/pokemons/components/EvolutionChain";
import { AbilityDisplay, EvolutionMoveData, EvolutionMoveDisplay, PokemonMove, PokemonPageProps, PokemonStat } from "@/src/pokemons/interfaces/pokemon";









export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {


    try {
        const { id } = await params;
        const pokemon = await getPokemon(id);
        const { name, sprites } = pokemon;
        return {
            title: ` #${id} - Pokemon ${name}`,
            description: `Pokemon ${name} - #${id}`,
            keywords: [name, 'pokemon', 'pagina de pokemon', 'app de pokemon'],
            authors: [{ name: 'franHR' }],
            openGraph: {
                title: ` #${id} - Pokemon ${name}`,
                description: `Pokemon ${name} - #${id}`,
                images: [sprites.front_default],
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: ` #${id} - Pokemon ${name}`,
                description: `Pokemon ${name} - #${id}`,
                images: [sprites.front_default],
            },
        };
    } catch {
        return {
            title: 'Pokemon no encontrado',
            description: 'El pokemon que buscas no existe.',
        };
    }
}


const getPokemon = async (id: string): Promise<Pokemon> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) {
        notFound();
    }
    const data = await res.json();
    return data;
}


export async function generateStaticParams() {
    return Array.from({ length: 151 }, (_, index) => ({
        id: (index + 1).toString(),
    }));
}


export default async function PokemonPage({ params }: PokemonPageProps) {

    const { id } = await params;
    const pokemon = await getPokemon(id);

    const getStatLabel = (statName: string) => {
        const map: Record<string, string> = {
            hp: 'PS',
            attack: 'Ataque',
            defense: 'Defensa',
            'special-attack': 'Ataque Especial',
            'special-defense': 'Defensa Especial',
            speed: 'Velocidad'
        };

        return map[statName] ?? statName.replace(/-/g, ' ');
    };

    // Obtener información adicional
    const species = await getPokemonSpecies(id);
    const description = getPokemonDescription(species);

    // Obtener cadena de evolución
    const evolutionChainId = extractEvolutionChainId(species.evolution_chain.url);
    const evolutionChain = await getEvolutionChain(evolutionChainId);
    const evolutions = getEvolutionChainList(evolutionChain.chain);
    const uniqueEvolutions = evolutions.filter((evo, index, list) => (
        list.findIndex(item => item.id === evo.id && item.name === evo.name) === index
    ));

    // Obtener sprites de evoluciones
    const evolutionsWithSprites = await Promise.all(
        uniqueEvolutions.map(async (evo) => ({
            ...evo,
            sprite: await getPokemonSprite(evo.name)
        }))
    );

    // Obtener movimientos de cada etapa de evolución
    const getEvolutionStageMoves = async (evolutionId: string): Promise<PokemonMove[]> => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionId}`);
            if (!res.ok) return [];
            const data = await res.json();

            // Filtrar movimientos que se aprenden por nivel
            return (data.moves as PokemonMove[])
                .filter(move =>
                    move.version_group_details.some(
                        detail =>
                            detail.move_learn_method.name === 'level-up'
                    )
                )
                .slice(0, 8); // Mostrar los primeros 8 movimientos
        } catch {
            return [];
        }
    };

    // Obtener movimientos de todas las evoluciones
    const evolutionMoves: EvolutionMoveData[] = await Promise.all(
        uniqueEvolutions.map(async (evo) => ({
            name: evo.name,
            id: evo.id,
            moves: await getEvolutionStageMoves(evo.id)
        }))
    );

    // Traducir nombres de movimientos a espanol
    const moveNameCache = new Map<string, string>();
    const getMoveNameEs = async (moveName: string): Promise<string> => {
        if (moveNameCache.has(moveName)) {
            return moveNameCache.get(moveName) as string;
        }

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
            if (!res.ok) {
                const fallback = moveName.replace(/-/g, ' ');
                moveNameCache.set(moveName, fallback);
                return fallback;
            }
            const data = await res.json();
            const spanish = data.names?.find((entry: { language: { name: string } }) => entry.language.name === 'es');
            const english = data.names?.find((entry: { language: { name: string } }) => entry.language.name === 'en');
            const translated = spanish?.name || english?.name || moveName.replace(/-/g, ' ');
            moveNameCache.set(moveName, translated);
            return translated;
        } catch {
            const fallback = moveName.replace(/-/g, ' ');
            moveNameCache.set(moveName, fallback);
            return fallback;
        }
    };

    const evolutionMovesDisplay: EvolutionMoveDisplay[] = await Promise.all(
        evolutionMoves.map(async (evo) => ({
            name: evo.name,
            id: evo.id,
            moves: await Promise.all(
                evo.moves.map(async (move) => getMoveNameEs(move.move.name))
            )
        }))
    );

    // Traducir nombres de habilidades a espanol
    const abilityNameCache = new Map<string, string>();
    const getAbilityNameEs = async (abilityName: string): Promise<string> => {
        if (abilityNameCache.has(abilityName)) {
            return abilityNameCache.get(abilityName) as string;
        }

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
            if (!res.ok) {
                const fallback = abilityName.replace(/-/g, ' ');
                abilityNameCache.set(abilityName, fallback);
                return fallback;
            }
            const data = await res.json();
            const spanish = data.names?.find((entry: { language: { name: string } }) => entry.language.name === 'es');
            const english = data.names?.find((entry: { language: { name: string } }) => entry.language.name === 'en');
            const translated = spanish?.name || english?.name || abilityName.replace(/-/g, ' ');
            abilityNameCache.set(abilityName, translated);
            return translated;
        } catch {
            const fallback = abilityName.replace(/-/g, ' ');
            abilityNameCache.set(abilityName, fallback);
            return fallback;
        }
    };

    const abilitiesDisplay: AbilityDisplay[] = await Promise.all(
        pokemon.abilities.map(async (ability) => ({
            name: await getAbilityNameEs(ability.ability?.name ?? ''),
            isHidden: ability.is_hidden
        }))
    );

    return (
        <div className="flex mt-5 flex-col items-center text-slate-800">
            <div className="relative flex flex-col items-center rounded-[20px] w-[800px] mx-auto bg-white bg-clip-border shadow-lg p-5">
                <div className="mt-2 mb-8 w-full">
                    <h1 className="px-2 text-2xl font-bold text-slate-700 capitalize">
                        #{pokemon.id} {pokemon.name}
                    </h1>
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src={pokemon.sprites.other?.dream_world.front_default ?? pokemon.sprites.front_default}
                            width={200}
                            height={200}
                            alt={`Imagen del pokemon ${pokemon.name}`}
                            className="mb-5"
                            priority
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 px-2 w-full">
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 drop-shadow-lg">
                        <p className="text-sm text-gray-600">Tipos</p>
                        <div className="text-base font-medium text-navy-700 flex">
                            {
                                pokemon.types.map(type => (
                                    <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 drop-shadow-lg">
                        <p className="text-sm text-gray-600">Peso</p>
                        <span className="text-base font-medium text-navy-700">
                            {pokemon.weight / 10} kg
                        </span>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 drop-shadow-lg">
                        <p className="text-sm text-gray-600">Altura</p>
                        <span className="text-base font-medium text-navy-700">
                            {pokemon.height / 10} m
                        </span>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 drop-shadow-lg">
                        <p className="text-sm text-gray-600">Habilidades</p>
                        <div className="text-base font-medium text-navy-700 flex flex-wrap gap-2">
                            {
                                abilitiesDisplay.map((ability, index) => (
                                    <span
                                        key={`${ability.name}-${index}`}
                                        className={`px-2 py-1 rounded-full text-xs capitalize ${ability.isHidden
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-blue-100 text-blue-700'
                                            }`}
                                    >
                                        {ability.name}
                                        {ability.isHidden && ' (Oculta)'}
                                    </span>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 drop-shadow-lg">
                        <p className="text-sm text-gray-600">Sprites normales</p>
                        <div className="flex justify-center">
                            <Image
                                src={pokemon.sprites.front_default}
                                width={80}
                                height={80}
                                alt={`sprite de ${pokemon.name}`}
                            />
                            <Image
                                src={pokemon.sprites.back_default}
                                width={80}
                                height={80}
                                alt={`sprite de ${pokemon.name}`}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 drop-shadow-lg">
                        <p className="text-sm text-gray-600">Sprites shiny</p>
                        <div className="flex justify-center">
                            <Image
                                src={pokemon.sprites.front_shiny}
                                width={80}
                                height={80}
                                alt={`sprite de ${pokemon.name}`}
                            />
                            <Image
                                src={pokemon.sprites.back_shiny}
                                width={80}
                                height={80}
                                alt={`sprite de ${pokemon.name}`}
                            />
                        </div>
                    </div>

                    <div className="col-span-2 rounded-2xl bg-linear-to-r from-blue-50 to-purple-50 p-4 drop-shadow-lg">
                        <p className="text-sm text-gray-600 font-semibold mb-2">Descripcion</p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="col-span-2 rounded-2xl bg-white p-4 drop-shadow-lg">
                        <p className="text-sm text-gray-600 font-semibold mb-3">Estadisticas base</p>
                        <div className="space-y-2">
                            {pokemon.stats.map((stat: PokemonStat) => (
                                <div key={stat.stat.name} className="flex items-center gap-2">
                                    <span className="text-xs font-semibold w-24 capitalize">
                                        {getStatLabel(stat.stat.name)}
                                    </span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${stat.base_stat >= 100 ? 'bg-green-500' :
                                                stat.base_stat >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                                                }`}
                                            style={{ width: `${Math.min(stat.base_stat / 1.5, 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-bold w-8 text-right">
                                        {stat.base_stat}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-2">
                        <EvolutionChain
                            evolutions={evolutionsWithSprites}
                            currentPokemonId={id}
                        />
                    </div>

                    <div className="col-span-2 rounded-2xl bg-white p-4 drop-shadow-lg">
                        <p className="text-sm text-gray-600 font-semibold mb-3">Movimientos por evolucion</p>
                        <div className="space-y-4">
                            {evolutionMovesDisplay.map((evoMoves, index) => (
                                <div
                                    key={evoMoves.id}
                                    className={`rounded-lg p-3 ${evoMoves.id === id
                                        ? 'bg-linear-to-r from-blue-100 to-purple-100 border-2 border-blue-400'
                                        : 'bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="text-xs font-bold capitalize">
                                            #{index + 1} {evoMoves.name}
                                        </p>
                                        {evoMoves.id === id && (
                                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                                Actual
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {evoMoves.moves.length > 0 ? (
                                            evoMoves.moves.map((moveName) => (
                                                <span
                                                    key={`${evoMoves.id}-${moveName}`}
                                                    className="text-xs bg-white px-2 py-1 rounded-full capitalize shadow-sm"
                                                >
                                                    {moveName}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-gray-400">Sin movimientos</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}