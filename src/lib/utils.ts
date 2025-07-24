import type { Pokemon } from '../types/pokemon';

/**
 * Filters Pokemon based on search term and selected types
 * 
 * Performs case-insensitive search on Pokémon names and filters by type.
 * If no types are selected, all Pokémon pass the type filter.
 * 
 * @param {Pokemon[]} pokemonList - Array of Pokémon to filter
 * @param {string} searchTerm - Search term to match against Pokémon names
 * @param {string[]} selectedTypes - Array of Pokémon types to filter by
 * @returns {Pokemon[]} Filtered array of Pokémon that match both search and type criteria
 */
export function filterPokemon(
  pokemonList: Pokemon[],
  searchTerm: string,
  selectedTypes: string[]
): Pokemon[] {
  return pokemonList.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 ||
      pokemon.types.some(type => selectedTypes.includes(type.type.name));
    return matchesSearch && matchesType;
  });
}

/**
 * Generates pagination numbers with ellipsis for large page counts
 * 
 * Creates an array of page numbers optimized for display, showing:
 * - All pages if total ≤ 7
 * - First page, last page, current page, and adjacent pages with ellipsis for larger totals
 * 
 * @param {number} currentPage - Current page number (0-indexed)
 * @param {number} totalPages - Total number of pages
 * @returns {(number | string)[]} Array of page numbers and ellipsis strings for display
 */
export function generatePaginationNumbers(currentPage: number, totalPages: number): (number | string)[] {
  const numbers: (number | string)[] = [];
  const current = currentPage + 1;

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i);
    }
  } else {
    numbers.push(1);

    if (current <= 4) {
      for (let i = 2; i <= 5; i++) {
        numbers.push(i);
      }
      numbers.push('...');
      numbers.push(totalPages);
    } else if (current >= totalPages - 3) {
      numbers.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      numbers.push('...');
      numbers.push(current - 1);
      numbers.push(current);
      numbers.push(current + 1);
      numbers.push('...');
      numbers.push(totalPages);
    }
  }

  return numbers;
}



/**
 * Formats Pokemon ID with leading zeros
 * 
 * Converts a Pokémon ID number to a formatted string with leading zeros
 * and a hash prefix (e.g., 1 becomes "#001").
 * 
 * @param {number} id - Pokémon ID number
 * @returns {string} Formatted Pokémon ID string
 */
export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`;
}

/**
 * Gets the best available image URL for a Pokemon
 * 
 * Returns the highest quality available image URL for a Pokémon,
 * falling back to lower quality options if the preferred image is not available.
 * 
 * @param {Pokemon} pokemon - Pokémon object containing sprite data
 * @returns {string} URL of the best available Pokémon image
 */
export function getPokemonImageUrl(pokemon: Pokemon): string {
  return pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default ||
    'https://placehold.co/96x96?text=Pokemon';
}

/**
 * Converts height from decimeters to meters
 * 
 * Pokémon API returns height in decimeters, this function converts it
 * to a human-readable meter format.
 * 
 * @param {number} height - Height in decimeters
 * @returns {string} Formatted height string in meters
 */
export function formatHeight(height: number): string {
  return `${(height / 10).toFixed(1)} m`;
}

/**
 * Converts weight from hectograms to kilograms
 * 
 * Pokémon API returns weight in hectograms, this function converts it
 * to a human-readable kilogram format.
 * 
 * @param {number} weight - Weight in hectograms
 * @returns {string} Formatted weight string in kilograms
 */
export function formatWeight(weight: number): string {
  return `${(weight / 10).toFixed(1)} kg`;
} 