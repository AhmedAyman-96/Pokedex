import { useState } from 'react';
import type { PokemonCardProps } from '../types/pokemon';
import { useTypeColors } from '../hooks/useTypeColors';
import { formatPokemonId, getPokemonImageUrl } from '../lib/utils';
import ImageSkeleton from './ImageSkeleton';

/**
 * PokemonCard Component
 * 
 * A card component that displays individual Pokémon information in a grid layout.
 * Shows Pokémon image, name, ID, and type badges with hover effects and click handling.
 * 
 * Features:
 * - Responsive image with fallback handling
 * - Formatted Pokémon ID with leading zeros
 * - Type badges with appropriate colors
 * - Hover effects and smooth transitions
 * - Dark mode support
 * 
 * @param {PokemonCardProps} props - Component props containing Pokémon data and click handler
 * @returns {JSX.Element} Rendered Pokémon card component
 */
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
    const imageUrl = getPokemonImageUrl(pokemon);
    const { getTypeColor } = useTypeColors();
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
            onClick={onClick}
        >
            <div className="p-4">
                <div className="flex justify-center mb-4 relative">
                    {/* Skeleton loader */}
                    {imageLoading && (
                        <ImageSkeleton size="md" shape="square" />
                    )}

                    {/* Pokemon image */}
                    <img
                        src={imageUrl}
                        alt={pokemon.name}
                        className={`w-24 h-24 object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0 absolute' : 'opacity-100'
                            }`}
                        onLoad={() => setImageLoading(false)}
                        onError={(e) => {
                            setImageLoading(false);
                            setImageError(true);
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/96x96?text=Pokemon';
                        }}
                    />

                    {/* Error fallback */}
                    {imageError && (
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-500">
                            <span className="text-xs text-gray-500 dark:text-gray-400 text-center px-2">
                                Image not available
                            </span>
                        </div>
                    )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center capitalize">
                    {pokemon.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                    {formatPokemonId(pokemon.id)}
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