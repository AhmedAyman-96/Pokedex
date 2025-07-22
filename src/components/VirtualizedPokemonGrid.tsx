import React, { useCallback, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import type { Pokemon } from '../types/pokemon';

interface VirtualizedPokemonGridProps {
    pokemonList: Pokemon[];
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    loadNextPage: () => void;
    onPokemonClick: (pokemon: Pokemon) => void;
}

const VirtualizedPokemonGrid: React.FC<VirtualizedPokemonGridProps> = ({
    pokemonList,
    hasNextPage,
    isNextPageLoading,
    loadNextPage,
    onPokemonClick,
}) => {
    // Simple scroll handler for infinite loading
    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Load more when user is near the bottom
        if (scrollTop + windowHeight >= documentHeight - 200 && hasNextPage && !isNextPageLoading) {
            loadNextPage();
        }
    }, [hasNextPage, isNextPageLoading, loadNextPage]);

    // Add scroll listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    // Also check on mount and when data changes
    useEffect(() => {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            handleScroll();
        }, 100);
        return () => clearTimeout(timer);
    }, [pokemonList.length, handleScroll]);

    if (pokemonList.length === 0 && !isNextPageLoading) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400">No Pokémon found</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Pokémon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {pokemonList.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={() => onPokemonClick(pokemon)}
                    />
                ))}
            </div>

            {/* Loading indicator */}
            {isNextPageLoading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Loading more Pokémon...</p>
                </div>
            )}

            {/* End of list indicator */}
            {!hasNextPage && pokemonList.length > 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">You've reached the end of the Pokémon list!</p>
                </div>
            )}
        </div>
    );
};

export default VirtualizedPokemonGrid; 