import React from 'react';
import { PokemonCard, LoadingMoreIndicator } from './index';
import type { Pokemon } from '../types/pokemon';

interface LoadMorePokemonGridProps {
    pokemonList: Pokemon[];
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    loadNextPage: () => void;
    onPokemonClick: (pokemon: Pokemon) => void;
}

/**
 * LoadMorePokemonGrid Component
 * 
 * A grid component that displays Pokémon cards with a "Load More" button
 * for pagination. Provides a button-based approach to loading more content
 * instead of automatic infinite scroll.
 * 
 * Features:
 * - Button-based "Load More" functionality
 * - Loading states and end-of-list indicators
 * - Responsive grid layout
 * - Clean user experience with explicit user action
 */
const LoadMorePokemonGrid: React.FC<LoadMorePokemonGridProps> = ({
    pokemonList,
    hasNextPage,
    isNextPageLoading,
    loadNextPage,
    onPokemonClick,
}) => {

    if (pokemonList.length === 0 && !isNextPageLoading) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400">No Pokémon found</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {pokemonList.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={() => onPokemonClick(pokemon)}
                    />
                ))}
            </div>

            {hasNextPage && (
                <div className="text-center py-8">
                    {isNextPageLoading ? (
                        <LoadingMoreIndicator />
                    ) : (
                        <button
                            onClick={loadNextPage}
                            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg"
                        >
                            Load More Pokémon
                        </button>
                    )}
                </div>
            )}

            {pokemonList.length > 0 && (
                <div className="text-center py-4">
                    <p className="text-gray-600 dark:text-gray-400">
                        Showing {pokemonList.length} Pokemon
                    </p>
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

export default LoadMorePokemonGrid;