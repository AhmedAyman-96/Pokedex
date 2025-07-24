import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook to fetch the total number of Pokemon from the PokeAPI
 * 
 * This hook dynamically fetches the Pokemon count to avoid hardcoding
 * the limit. It will automatically stay up-to-date as new Pokemon are added.
 * 
 * @returns {Object} Query result with Pokemon count
 */
export const usePokemonCount = () => {
    return useQuery({
        queryKey: ['pokemon-count'],
        queryFn: async (): Promise<number> => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
            if (!response.ok) {
                throw new Error('Failed to fetch Pokemon count');
            }
            const data = await response.json();
            return data.count;
        },
        staleTime: 1000 * 60 * 60, // 1 hour - Pokemon count doesn't change often
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        retry: 3,
        refetchOnWindowFocus: false,
    });
}; 