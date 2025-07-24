import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList, fetchPokemonDetail, fetchPokemonDetailsByUrls } from '../lib/api';

/**
 * Custom hook for fetching paginated Pokémon list data
 * 
 * This hook fetches Pokémon data in two steps:
 * 1. Fetches the pagination metadata (count, next, previous)
 * 2. Fetches detailed Pokémon data for the IDs in the current page
 * 
 * @param {number} limit - Number of Pokémon to fetch per page (default: 20)
 * @param {number} offset - Number of Pokémon to skip (default: 0)
 * @returns {Object} An object containing:
 *   - pokemonList: Array of detailed Pokémon objects
 *   - loading: Boolean indicating if data is loading
 *   - error: Error message if any, null otherwise
 *   - hasMore: Boolean indicating if more pages are available
 *   - totalCount: Total number of Pokémon available
 *   - refetch: Function to refetch all data
 */
export const usePokemonList = (limit: number = 20, offset: number = 0) => {
  const {
    data: pokemonListData,
    isLoading: loading,
    error,
    refetch: refetchList,
  } = useQuery({
    queryKey: ['pokemon-list', limit, offset],
    queryFn: () => fetchPokemonList(limit, offset),
  });

  const pokemonUrls = pokemonListData?.results.map(pokemon => pokemon.url) || [];

  const {
    data: pokemonList,
    isLoading: detailsLoading,
    error: detailsError,
    refetch: refetchDetails,
  } = useQuery({
    queryKey: ['pokemon-details', pokemonUrls],
    queryFn: () => pokemonUrls.length > 0 ? fetchPokemonDetailsByUrls(pokemonUrls) : Promise.resolve([]),
    enabled: pokemonUrls.length > 0,
  });

  /**
   * Refetches both the pagination metadata and detailed Pokémon data
   */
  const refetch = () => {
    refetchList();
    if (pokemonUrls.length > 0) {
      refetchDetails();
    }
  };

  return {
    pokemonList: pokemonList || [],
    loading: loading || detailsLoading,
    error: error?.message || detailsError?.message || null,
    hasMore: pokemonListData?.next !== null,
    totalCount: pokemonListData?.count || 0,
    refetch,
  };
};

/**
 * Custom hook for fetching detailed data for a specific Pokémon
 * 
 * @param {string} id - The Pokémon ID to fetch details for
 * @returns {Object} An object containing:
 *   - pokemon: Detailed Pokémon object or null if not found
 *   - loading: Boolean indicating if data is loading
 *   - error: Error message if any, null otherwise
 *   - refetch: Function to refetch the Pokémon data
 */
export const usePokemonDetail = (id: string) => {
  const {
    data: pokemon,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['pokemon-detail', id],
    queryFn: () => fetchPokemonDetail(id),
    enabled: !!id,
  });

  return {
    pokemon: pokemon || null,
    loading,
    error: error?.message || null,
    refetch,
  };
}; 