import { useState, useEffect } from 'react';
import type { Pokemon, PokemonListResponse } from '../types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const usePokemonList = (limit: number = 20, offset: number = 0) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
        );
        
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
        
        setPokemonList(detailedPokemon);
        setHasMore(data.next !== null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [limit, offset]);

  return { pokemonList, loading, error, hasMore };
};

export const usePokemonDetail = (id: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);
        
        if (!response.ok) {
          throw new Error('Pokémon not found');
        }
        
        const data: Pokemon = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemonDetail();
    }
  }, [id]);

  return { pokemon, loading, error };
}; 