import { useState, useEffect, useCallback } from 'react';
import type { Pokemon, PokemonListResponse } from '../types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const ITEMS_PER_PAGE = 20;

export const useInfinitePokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextUrl, setNextUrl] = useState<string | null>(`${POKEAPI_BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=0`);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !nextUrl) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(nextUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon list');
      }

      const data: PokemonListResponse = await response.json();

      // Fetch detailed data for each Pokémon
      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          if (!pokemonResponse.ok) {
            throw new Error(`Failed to fetch ${pokemon.name}`);
          }
          return pokemonResponse.json();
        })
      );

      setPokemonList(prev => [...prev, ...detailedPokemon]);
      setNextUrl(data.next);
      setHasMore(data.next !== null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, nextUrl]);

  // Load initial data when list is empty and not loading
  useEffect(() => {
    if (pokemonList.length === 0 && !loading && hasMore) {
      loadMore();
    }
  }, [pokemonList.length, loading, hasMore, loadMore]);

  const reset = useCallback(() => {
    setPokemonList([]);
    setLoading(false);
    setError(null);
    setHasMore(true);
    setNextUrl(`${POKEAPI_BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=0`);
  }, []);

  return {
    pokemonList,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
  };
}; 