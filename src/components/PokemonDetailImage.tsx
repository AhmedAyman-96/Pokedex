import { useState } from 'react';
import { getPokemonImageUrl } from '../lib/utils';
import type { Pokemon } from '../types/pokemon';
import ImageSkeleton from './ImageSkeleton';

interface PokemonDetailImageProps {
    pokemon: Pokemon;
}

const PokemonDetailImage: React.FC<PokemonDetailImageProps> = ({ pokemon }) => {
    const imageUrl = getPokemonImageUrl(pokemon);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    return (
        <div className="flex flex-col items-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white dark:bg-gray-800 rounded-full shadow-xl flex items-center justify-center p-8 sm:p-10 border border-gray-200 dark:border-gray-700 mb-8 sm:mb-10 relative">
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ImageSkeleton size="xl" shape="circle" />
                    </div>
                )}

                <img
                    src={imageUrl}
                    alt={pokemon.name}
                    className={`w-full h-full object-contain transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                    onLoad={() => setImageLoading(false)}
                    onError={(e) => {
                        setImageLoading(false);
                        setImageError(true);
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/320x320?text=Pokemon';
                    }}
                />

                {imageError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-500">
                                <span className="text-sm text-gray-500 dark:text-gray-400 px-4">
                                    Image not available
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokemonDetailImage; 