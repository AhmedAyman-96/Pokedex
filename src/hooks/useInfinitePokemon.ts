import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList, fetchPokemonDetailsByUrls } from '../lib/api';
import { ITEMS_PER_PAGE } from '../lib/constants';

/**
 * Custom hook for infinite scroll Pokémon data fetching
 * 
 * This hook uses React Query's useInfiniteQuery to implement infinite scroll
 * functionality. It fetches Pokémon data in pages and provides methods to
 * load more data and reset the query.
 * 
 * @returns {Object} An object containing:
 *   - pokemonList: Array of all fetched Pokémon
 *   - loading: Boolean indicating if initial data is loading
 *   - isNextPageLoading: Boolean indicating if next page is loading
 *   - error: Error message if any, null otherwise
 *   - hasMore: Boolean indicating if more data is available
 *   - loadMore: Function to load the next page
 *   - reset: Function to reset the query and refetch data
 */
export const useInfinitePokemon = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['infinite-pokemon'],
    queryFn: async ({ pageParam = 0 }) => {
      const offset = pageParam * ITEMS_PER_PAGE;
      const pokemonList = await fetchPokemonList(ITEMS_PER_PAGE, offset);
      
      const pokemonUrls = pokemonList.results.map(pokemon => pokemon.url);
      const detailedPokemon = await fetchPokemonDetailsByUrls(pokemonUrls);
      
      return {
        pokemon: detailedPokemon,
        nextPage: pokemonList.next ? pageParam + 1 : undefined,
        hasMore: pokemonList.next !== null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const pokemonList = data?.pages.flatMap(page => page.pokemon) || [];

  /**
   * Loads the next page of Pokémon data
   * 
   * Only triggers if there are more pages available and
   * no page is currently being fetched
   */
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  /**
   * Resets the infinite query and refetches data from the beginning
   */
  const reset = () => {
    refetch();
  };

  return {
    pokemonList,
    loading: isLoading,
    isNextPageLoading: isFetchingNextPage,
    error: error?.message || null,
    hasMore: hasNextPage || false,
    loadMore,
    reset,
  };
}; 