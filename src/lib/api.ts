import type { Pokemon, PokemonListResponse } from '../types/pokemon';
import { POKEAPI_BASE_URL, ERROR_MESSAGES } from './constants';

/**
 * Fetches a paginated list of Pokemon from the PokeAPI
 * 
 * Retrieves pagination metadata including count, next, and previous URLs,
 * along with basic Pokémon information (name and URL).
 * 
 * @param {number} limit - Number of Pokémon to fetch per page
 * @param {number} offset - Number of Pokémon to skip (for pagination)
 * @returns {Promise<PokemonListResponse>} Promise resolving to pagination metadata and basic Pokémon list
 * @throws {Error} When the API request fails
 */
export async function fetchPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_POKEMON_LIST);
  }
  return response.json();
}

/**
 * Fetches detailed information for a specific Pokemon by ID
 * 
 * Retrieves complete Pokémon data including stats, abilities, types,
 * sprites, and other detailed information.
 * 
 * @param {string} id - Pokémon ID or name
 * @returns {Promise<Pokemon>} Promise resolving to detailed Pokémon object
 * @throws {Error} When the API request fails or Pokémon is not found
 */
export async function fetchPokemonDetail(id: string): Promise<Pokemon> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_POKEMON_DETAIL);
  }
  return response.json();
}

/**
 * Fetches detailed information for multiple Pokemon by their URLs
 * 
 * Uses the URLs provided in the Pokémon list response to fetch detailed data.
 * This is the correct approach since Pokémon IDs are not sequential in the API.
 * Fetches all Pokémon in parallel for better performance.
 * 
 * @param {string[]} urls - Array of Pokémon detail URLs to fetch
 * @returns {Promise<Pokemon[]>} Promise resolving to array of detailed Pokémon objects
 * @throws {Error} When any of the API requests fail
 */
export async function fetchPokemonDetailsByUrls(urls: string[]): Promise<Pokemon[]> {
  const detailedPokemon = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${ERROR_MESSAGES.FETCH_POKEMON_DETAILS}: ${url}`);
      }
      return response.json();
    })
  );
  return detailedPokemon;
}

/**
 * Fetches detailed information for multiple Pokemon by their IDs
 * 
 * More efficient than fetching by URLs as it uses direct ID-based requests.
 * Fetches all Pokémon in parallel for better performance.
 * 
 * @param {number[]} ids - Array of Pokémon IDs to fetch
 * @returns {Promise<Pokemon[]>} Promise resolving to array of detailed Pokémon objects
 * @throws {Error} When any of the API requests fail
 */
export async function fetchPokemonDetailsByIds(ids: number[]): Promise<Pokemon[]> {
  const detailedPokemon = await Promise.all(
    ids.map(async (id) => {
      const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);
      if (!response.ok) {
        throw new Error(`${ERROR_MESSAGES.FETCH_POKEMON_DETAILS}: Pokemon #${id}`);
      }
      return response.json();
    })
  );
  return detailedPokemon;
} 