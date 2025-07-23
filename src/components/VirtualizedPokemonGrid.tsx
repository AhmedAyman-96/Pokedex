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
 * Uses Intersection Observer to detect when user is near the bottom of the content,
 * providing smooth infinite scroll experience even on large screens where content
 * might not be scrollable.
 * 
 * Features:
 * - Intersection Observer for efficient scroll detection
 * - Automatic loading of more Pokémon when near bottom
 * - Loading states and end-of-list indicators
 * - Responsive grid layout
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
    const sentinelRef = useRef<HTMLDivElement>(null);

    /**
     * Handles intersection observer callback for infinite scroll
     * Triggers loadNextPage when the sentinel element becomes visible
     * and there are more pages to load
     */
    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isNextPageLoading) {
            loadNextPage();
        }
    }, [hasNextPage, isNextPageLoading, loadNextPage]);

    /**
     * Sets up Intersection Observer for infinite scroll detection
     */
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(handleIntersection, {
            root: scrollContainerRef.current,
            rootMargin: '100px', // Start loading when within 100px of the sentinel
            threshold: 0.1
        });

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [handleIntersection, scrollContainerRef]);

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

            {/* Intersection Observer sentinel element */}
            <div
                ref={sentinelRef}
                className="h-4 w-full"
                style={{ minHeight: '1px' }}
            />

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