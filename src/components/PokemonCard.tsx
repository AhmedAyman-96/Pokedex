import type { PokemonCardProps } from '../types/pokemon';

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default ||
        pokemon.sprites.front_default;

    const getTypeColor = (typeName: string) => {
        const typeColors: { [key: string]: string } = {
            normal: 'bg-gray-400 text-white',
            fire: 'bg-red-500 text-white',
            water: 'bg-blue-500 text-white',
            electric: 'bg-yellow-400 text-gray-900',
            grass: 'bg-green-500 text-white',
            ice: 'bg-blue-200 text-gray-900',
            fighting: 'bg-red-700 text-white',
            poison: 'bg-purple-500 text-white',
            ground: 'bg-yellow-600 text-white',
            flying: 'bg-indigo-400 text-white',
            psychic: 'bg-pink-500 text-white',
            bug: 'bg-green-400 text-gray-900',
            rock: 'bg-yellow-700 text-white',
            ghost: 'bg-purple-700 text-white',
            dragon: 'bg-indigo-700 text-white',
            dark: 'bg-gray-700 text-white',
            steel: 'bg-gray-500 text-white',
            fairy: 'bg-pink-300 text-gray-900',
        };
        return typeColors[typeName] || 'bg-gray-500 text-white';
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
            onClick={onClick}
        >
            <div className="p-4">
                <div className="flex justify-center mb-4">
                    <img
                        src={imageUrl}
                        alt={pokemon.name}
                        className="w-24 h-24 object-contain"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/96x96?text=Pokemon';
                        }}
                    />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center capitalize">
                    {pokemon.name}
                </h3>
                <div className="flex justify-center gap-2 mt-2">
                    {pokemon.types.map((type) => (
                        <span
                            key={type.slot}
                            className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getTypeColor(type.type.name)}`}
                        >
                            {type.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonCard; 