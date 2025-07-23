/**
 * API Configuration
 * Base URL for the PokeAPI v2 endpoints
 */
export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Pagination Configuration
 * Number of Pokémon to display per page in pagination mode
 */
export const ITEMS_PER_PAGE = 20;

/**
 * Maximum number of Pokémon to display
 * Limited to the original 151 Pokémon for better performance
 */
export const MAX_POKEMON_COUNT = 151; // Original 151 Pokemon

/**
 * UI Configuration
 * Distance in pixels from the bottom of the viewport to trigger infinite scroll
 */
export const SCROLL_THRESHOLD = 100; // pixels from bottom to trigger infinite scroll

/**
 * Delay in milliseconds for search input debouncing
 * Prevents excessive API calls while user is typing
 */
export const DEBOUNCE_DELAY = 300; // milliseconds for search debouncing

/**
 * Pokemon Type Colors
 * 
 * Tailwind CSS classes for each Pokémon type.
 * Used for styling type badges and backgrounds.
 * Moved from useTypeColors hook for better organization and reusability.
 */
export const TYPE_COLORS = {
  normal: 'bg-gray-500',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-500',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-600',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
} as const;

/**
 * Error Messages
 * 
 * Centralized error messages used throughout the application.
 * Provides consistent error messaging and easy internationalization support.
 */
export const ERROR_MESSAGES = {
  FETCH_POKEMON_LIST: 'Failed to fetch Pokémon list',
  FETCH_POKEMON_DETAIL: 'Pokémon not found',
  FETCH_POKEMON_DETAILS: 'Failed to fetch Pokémon details',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

/**
 * Loading Messages
 * 
 * User-friendly loading messages displayed during data fetching operations.
 * Provides clear feedback about what is currently loading.
 */
export const LOADING_MESSAGES = {
  POKEMON_LIST: 'Loading Pokémon...',
  POKEMON_DETAIL: 'Loading Pokémon details...',
  MORE_POKEMON: 'Loading more Pokémon...',
} as const; 