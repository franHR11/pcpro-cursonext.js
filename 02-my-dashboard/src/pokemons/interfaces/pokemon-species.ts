export interface PokemonSpecies {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: Species;
    pokedex_numbers: PokedexNumber[];
    egg_groups: Species[];
    color: Species;
    shape: Species;
    evolves_from_species: Species | null;
    evolution_chain: EvolutionChainReference;
    flavor_text_entries: FlavorTextEntry[];
    genera: Genus[];
    varieties: Variety[];
}

export interface Species {
    name: string;
    url: string;
}

export interface PokedexNumber {
    entry_number: number;
    pokedex: Species;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: Species;
    version: Species;
}

export interface Genus {
    genus: string;
    language: Species;
}

export interface Variety {
    is_default: boolean;
    pokemon: Species;
}

export interface EvolutionChainReference {
    url: string;
}
