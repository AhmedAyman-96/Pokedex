import React, { useCallback, useEffect, useRef } from 'react';
import PokemonCard from './PokemonCard';
import type { Pokemon } from '../types/pokemon';

interface VirtualizedPokemonGridProps {
    pokemonList: Pokemon[];
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    loadNextPage: () => void;
    onPokemonClick: (pokemon: Pokemon) => void;
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * VirtualizedPokemonGrid Component
 * 
 * A virtualized grid component that implements infinite scroll for Pokémon cards.
 * Handles automatic loading of more Pokémon when the user scrolls near the bottom.
 */
const VirtualizedPokemonGrid: React.FC<VirtualizedPokemonGridProps> = ({
    pokemonList,
    hasNextPage,
    isNextPageLoading,
    loadNextPage,
    onPokemonClick,
    scrollContainerRef,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Handles infinite scroll by detecting when user scrolls near the bottom
     * and triggering loadNextPage when within 100px of the bottom
     */
    const handleScroll = useCallback(() => {
        if (!hasNextPage || isNextPageLoading) return;

        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

        if (scrollTop >= scrollHeight - clientHeight - 100) {
            loadNextPage();
        }
    }, [hasNextPage, isNextPageLoading, loadNextPage, scrollContainerRef]);

    /**
     * Sets up scroll event listeners on the container
     */
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll, scrollContainerRef]);

    if (pokemonList.length === 0 && !isNextPageLoading) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400">No Pokémon found</div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {pokemonList.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={() => onPokemonClick(pokemon)}
                    />
                ))}
            </div>

            {isNextPageLoading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-900 border-t-transparent"></div>
                    <p className="mt-3 text-gray-600 font-medium">Loading more Pokémon...</p>
                </div>
            )}

            {!hasNextPage && pokemonList.length > 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">You've reached the end of the Pokémon list!</p>
                </div>
            )}
        </div>
    );
};

export default VirtualizedPokemonGrid;