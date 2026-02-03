import { PokemonSpecies } from '../interfaces/pokemon-species';
import { EvolutionChain, ChainLink } from '../interfaces/evolution-chain';
import { notFound } from 'next/navigation';

/**
 * Obtiene la descripción de un Pokémon desde la API
 */
export async function getPokemonSpecies(id: string): Promise<PokemonSpecies> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (!res.ok) {
        notFound();
    }
    const data = await res.json();
    return data;
}

/**
 * Obtiene la cadena de evoluciones de un Pokémon
 */
export async function getEvolutionChain(id: string): Promise<EvolutionChain> {
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
    if (!res.ok) {
        notFound();
    }
    const data = await res.json();
    return data;
}

/**
 * Extrae el ID del evolution chain desde la URL del pokemon-species
 */
export function extractEvolutionChainId(url: string): string {
    const match = url.match(/\/evolution-chain\/(\d+)\//);
    return match ? match[1] : '1';
}

/**
 * Obtiene la descripción en español o inglés del Pokémon
 */
export function getPokemonDescription(species: PokemonSpecies): string {
    // Buscar en español primero
    const spanishEntry = species.flavor_text_entries.find(
        entry => entry.language.name === 'es'
    );
    
    // Si no hay español, buscar en inglés
    const englishEntry = species.flavor_text_entries.find(
        entry => entry.language.name === 'en'
    );
    
    const entry = spanishEntry || englishEntry;
    
    // Limpiar el texto de saltos de línea y caracteres especiales
    return entry 
        ? entry.flavor_text.replace(/[\f\n\r]/g, ' ').replace(/\s+/g, ' ').trim()
        : 'No hay descripcion disponible.';
}

/**
 * Obtiene la lista plana de evoluciones recursivamente
 */
export function getEvolutionChainList(chain: ChainLink): {
    name: string;
    id: string;
    canEvolve: boolean;
    evolutionLevel: number | null;
}[] {
    const evolutionList: {
        name: string;
        id: string;
        canEvolve: boolean;
        evolutionLevel: number | null;
    }[] = [];

    function getNextEvolutionLevel(chainLink: ChainLink): number | null {
        if (!chainLink.evolves_to || chainLink.evolves_to.length === 0) return null;
        const levels = chainLink.evolves_to
            .flatMap(evo => evo.evolution_details || [])
            .map(detail => detail?.min_level)
            .filter((level): level is number => typeof level === 'number');
        return levels.length > 0 ? Math.min(...levels) : null;
    }

    function traverse(chainLink: ChainLink) {
        const id = chainLink.species.url.match(/\/pokemon-species\/(\d+)\//)?.[1] || '1';
        const canEvolve = !!(chainLink.evolves_to && chainLink.evolves_to.length > 0);
        const evolutionLevel = getNextEvolutionLevel(chainLink);

        evolutionList.push({
            name: chainLink.species.name,
            id,
            canEvolve,
            evolutionLevel
        });

        if (chainLink.evolves_to && chainLink.evolves_to.length > 0) {
            chainLink.evolves_to.forEach(evolution => traverse(evolution));
        }
    }

    traverse(chain);

    const uniqueMap = new Map<string, typeof evolutionList[number]>();
    for (const item of evolutionList) {
        if (!uniqueMap.has(item.id)) {
            uniqueMap.set(item.id, item);
        }
    }
    return Array.from(uniqueMap.values());
}

/**
 * Obtiene el sprite oficial de un Pokémon por ID
 */
export async function getPokemonSprite(idOrName: string): Promise<string> {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
        if (!res.ok) return '';
        const data = await res.json();
        return data.sprites.other?.['official-artwork']?.front_default || 
               data.sprites.front_default || 
               '';
    } catch (error) {
        return '';
    }
}
