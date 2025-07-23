import { useInfiniteQuery } from '@tanstack/react-query';
import type { Pokemon, PokemonListResponse } from '../types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const ITEMS_PER_PAGE = 20;

const fetchPokemonList = async (limit: number, offset: number): Promise<PokemonListResponse> => {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  return response.json();
};

// Fetch detailed data for multiple Pokémon
const fetchPokemonDetails = async (pokemonList: PokemonListResponse): Promise<Pokemon[]> => {
  const detailedPokemon = await Promise.all(
    pokemonList.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      if (!pokemonResponse.ok) {
        throw new Error(`Failed to fetch ${pokemon.name}`);
      }
      return pokemonResponse.json();
    })
  );
  return detailedPokemon;
};

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
      const detailedPokemon = await fetchPokemonDetails(pokemonList);
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

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const reset = () => {
    refetch();
  };

  return {
    pokemonList,
    loading: isLoading,
    error: error?.message || null,
    hasMore: hasNextPage || false,
    loadMore,
    reset,
  };
}; 