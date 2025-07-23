import { lazy, Suspense } from 'react';
import type { Pokemon } from '../types/pokemon';
import ImageSkeleton from './ImageSkeleton';

// Lazy load the PokemonCard component
const PokemonCard = lazy(() => import('./PokemonCard'));

interface LazyPokemonGridProps {
    pokemonList: Pokemon[];
    onPokemonClick: (pokemon: Pokemon) => void;
}

/**
 * LazyPokemonGrid Component
 * 
 * A lazy-loaded grid component that demonstrates Suspense for component-level
 * code splitting. Each Pokemon card is loaded individually as needed.
 * 
 * Features:
 * - Individual Pokemon card lazy loading
 * - Suspense boundaries for each card
 * - Graceful loading states
 * - Performance optimization through code splitting
 * 
 * @param {LazyPokemonGridProps} props - Component props
 * @returns {JSX.Element} Lazy-loaded Pokemon grid
 */
const LazyPokemonGrid: React.FC<LazyPokemonGridProps> = ({
    pokemonList,
    onPokemonClick,
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {pokemonList.map((pokemon) => (
                <Suspense
                    key={pokemon.id}
                    fallback={
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                            <div className="flex justify-center mb-4">
                                <ImageSkeleton size="md" shape="square" />
                            </div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                            <div className="flex justify-center gap-2">
                                <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    }
                >
                    <PokemonCard
                        pokemon={pokemon}
                        onClick={() => onPokemonClick(pokemon)}
                    />
                </Suspense>
            ))}
        </div>
    );
};

export default LazyPokemonGrid; 