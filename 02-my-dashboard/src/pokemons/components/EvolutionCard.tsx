import Image from 'next/image';

interface EvolutionCardProps {
    name: string;
    id: string;
    sprite?: string;
    isCurrent?: boolean;
    canEvolve: boolean;
    evolutionLevel: number | null;
}

export function EvolutionCard({ name, id, sprite, isCurrent, canEvolve, evolutionLevel }: EvolutionCardProps) {
    const getEvolutionText = () => {
        if (!canEvolve) return 'No evoluciona';
        if (typeof evolutionLevel === 'number') return `Nivel ${evolutionLevel}`;
        return 'Evolucion especial';
    };

    return (
        <div className="flex flex-col items-center">
            {sprite ? (
                <Image
                    src={sprite}
                    alt={name}
                    width={100}
                    height={100}
                    className={`rounded-full ${isCurrent ? 'bg-yellow-100 p-2 shadow-lg' : 'bg-gray-100 p-2'}`}
                />
            ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500">?</span>
                </div>
            )}
            <p className="mt-2 capitalize text-sm font-semibold">
                {name}
            </p>
            <span className="text-xs text-gray-500 mt-1">
                {getEvolutionText()}
            </span>
            {isCurrent && (
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                    Actual
                </span>
            )}
        </div>
    );
}
