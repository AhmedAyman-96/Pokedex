import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonList } from './usePokemon';
import { useInfinitePokemon } from './useInfinitePokemon';
import { filterPokemon } from '../lib/utils';
import { ITEMS_PER_PAGE } from '../lib/constants';
import type { Pokemon } from '../types/pokemon';

/**
 * Custom hook that manages the complete state for the Pokémon list page
 * 
 * This hook combines pagination and infinite scroll functionality, along with
 * search, filtering, and view mode management. It provides a unified interface
 * for the Pokémon list component to handle all user interactions.
 * 
 * @returns {Object} An object containing:
 *   - State: viewType, currentPage, searchTerm, selectedTypes, showFilters, scrollContainerRef
 *   - Data: filteredPokemonList, currentLoading, currentNextPageLoading, currentError, currentHasMore, totalPages, limit
 *   - Actions: handleRetry, handlePokemonClick, handlePageChange, handleViewTypeChange, handleSearchChange, handleTypeFilterChange, toggleFilters, loadMore
 */
export const usePokemonListState = () => {
  const [viewType, setViewType] = useState<'pagination' | 'loadMore'>('pagination');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const limit = ITEMS_PER_PAGE;
  const offset = currentPage * limit;

  const { 
    pokemonList: paginationList, 
    loading: paginationLoading, 
    error: paginationError, 
    hasMore: paginationHasMore, 
    refetch: refetchPagination, 
    totalCount: paginationTotal 
  } = usePokemonList(limit, offset);

  const { 
    pokemonList: infiniteList, 
    loading: infiniteLoading, 
    isNextPageLoading: infiniteNextPageLoading,
    error: infiniteError, 
    hasMore: infiniteHasMore, 
    loadMore, 
    reset 
  } = useInfinitePokemon();

  const currentPokemonList = viewType === 'loadMore' ? infiniteList : paginationList;
  const currentLoading = viewType === 'loadMore' ? infiniteLoading : paginationLoading;
  const currentNextPageLoading = viewType === 'loadMore' ? infiniteNextPageLoading : false;
  const currentError = viewType === 'loadMore' ? infiniteError : paginationError;
  const currentHasMore = viewType === 'loadMore' ? infiniteHasMore : paginationHasMore;

  const filteredPokemonList = filterPokemon(currentPokemonList, searchTerm, selectedTypes);
  const totalPages = Math.ceil(paginationTotal / limit);

  /**
   * Handles retry logic for failed API requests
   * 
   * Depending on the current view type, either refetches pagination data
   * or resets the infinite scroll data
   */
  const handleRetry = () => {
    if (viewType === 'pagination') {
      refetchPagination();
    } else {
      reset();
    }
  };

  /**
   * Navigates to the detail page for a specific Pokémon
   * 
   * @param {Pokemon} pokemon - The Pokémon object to navigate to
   */
  const handlePokemonClick = (pokemon: Pokemon) => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  /**
   * Updates the current page for pagination view
   * 
   * @param {number} page - The new page number (0-indexed)
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * Switches between pagination and infinite scroll view modes
   * 
   * Resets the current page to 0 and resets infinite scroll data
   * when switching to loadMore mode
   * 
   * @param {'pagination' | 'loadMore'} newViewType - The new view type to switch to
   */
  const handleViewTypeChange = (newViewType: 'pagination' | 'loadMore') => {
    setViewType(newViewType);
    setCurrentPage(0);
    if (newViewType === 'loadMore') {
      reset();
    }
  };

  /**
   * Updates the search term for filtering Pokémon
   * 
   * @param {string} term - The new search term
   */
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  /**
   * Updates the selected Pokémon types for filtering
   * 
   * @param {string[]} types - Array of selected Pokémon types
   */
  const handleTypeFilterChange = (types: string[]) => {
    setSelectedTypes(types);
  };

  /**
   * Toggles the visibility of the filter panel
   */
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return {
    // State
    viewType,
    currentPage,
    searchTerm,
    selectedTypes,
    showFilters,
    
    // Data
    filteredPokemonList,
    currentLoading,
    currentNextPageLoading,
    currentError,
    currentHasMore,
    totalPages,
    limit,
    
    // Actions
    handleRetry,
    handlePokemonClick,
    handlePageChange,
    handleViewTypeChange,
    handleSearchChange,
    handleTypeFilterChange,
    toggleFilters,
    loadMore,
  };
}; 