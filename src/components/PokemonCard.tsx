import type { PokemonCardProps } from '../types/pokemon';
import { useTypeColors } from '../hooks/useTypeColors';

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default ||
        pokemon.sprites.front_default;

    const { getTypeColor } = useTypeColors();

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
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                    #{pokemon.id.toString().padStart(3, '0')}
                </p>
                <div className="flex justify-center gap-2 mt-2">
                    {pokemon.types.map((type) => (
                        <span
                            key={type.slot}
                            className={`px-2 py-1 text-xs font-medium rounded-full capitalize text-white ${getTypeColor(type.type.name)}`}
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