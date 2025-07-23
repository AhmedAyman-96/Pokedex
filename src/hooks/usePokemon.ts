import { useQuery } from '@tanstack/react-query';
import type { Pokemon, PokemonListResponse } from '../types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemonList = async (limit: number, offset: number): Promise<PokemonListResponse> => {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  return response.json();
};

const fetchPokemonDetail = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Pokémon not found');
  }
  return response.json();
};

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

  const {
    data: pokemonList,
    isLoading: detailsLoading,
    error: detailsError,
    refetch: refetchDetails,
  } = useQuery({
    queryKey: ['pokemon-details', pokemonListData?.results],
    queryFn: () => pokemonListData ? fetchPokemonDetails(pokemonListData) : Promise.resolve([]),
    enabled: !!pokemonListData,
  });

  const refetch = () => {
    refetchList();
    if (pokemonListData) {
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