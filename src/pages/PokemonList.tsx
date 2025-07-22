import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import VirtualizedPokemonGrid from '../components/VirtualizedPokemonGrid';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import PokemonCardSkeleton from '../components/PokemonCardSkeleton';
import { usePokemonList } from '../hooks/usePokemon';
import { useInfinitePokemon } from '../hooks/useInfinitePokemon';
import type { Pokemon } from '../types/pokemon';

const PokemonList: React.FC = () => {
    const [viewType, setViewType] = useState<'pagination' | 'loadMore'>('pagination');
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();

    const limit = 20;
    const offset = currentPage * limit;

    // Use different hooks based on view type
    const { pokemonList: paginationList, loading: paginationLoading, error: paginationError, hasMore: paginationHasMore } = usePokemonList(limit, offset);
    const { pokemonList: infiniteList, loading: infiniteLoading, error: infiniteError, hasMore: infiniteHasMore, loadMore, reset } = useInfinitePokemon();

    // Filter Pokémon based on search term and selected types
    const filterPokemon = (pokemonList: Pokemon[]) => {
        return pokemonList.filter(pokemon => {
            const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedTypes.length === 0 ||
                pokemon.types.some(type => selectedTypes.includes(type.type.name));
            return matchesSearch && matchesType;
        });
    };

    const handlePokemonClick = (pokemon: Pokemon) => {
        navigate(`/pokemon/${pokemon.id}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleViewTypeChange = (newViewType: 'pagination' | 'loadMore') => {
        setViewType(newViewType);
        setCurrentPage(0);
        if (newViewType === 'loadMore') {
            reset();
        }
    };

    // Use appropriate data based on view type
    const currentPokemonList = viewType === 'loadMore' ? infiniteList : paginationList;
    const currentLoading = viewType === 'loadMore' ? infiniteLoading : paginationLoading;
    const currentError = viewType === 'loadMore' ? infiniteError : paginationError;
    const currentHasMore = viewType === 'loadMore' ? infiniteHasMore : paginationHasMore;

    // Filter the current list
    const filteredPokemonList = filterPokemon(currentPokemonList);

    if (currentError) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 text-lg mb-4">{currentError}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* View Toggle */}
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => handleViewTypeChange('pagination')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${viewType === 'pagination'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    Pagination View
                </button>
                <button
                    onClick={() => handleViewTypeChange('loadMore')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${viewType === 'loadMore'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    Infinite Scroll View
                </button>
            </div>

            {/* Search Bar */}
            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {/* Filter Toggle */}
            <div className="flex justify-center">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    <span>Filters</span>
                </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <TypeFilter
                        selectedTypes={selectedTypes}
                        onTypeChange={setSelectedTypes}
                    />
                </div>
            )}

            {/* Results Summary */}
            {(searchTerm || selectedTypes.length > 0) && (
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredPokemonList.length} of {currentPokemonList.length} Pokémon
                    {searchTerm && ` matching "${searchTerm}"`}
                    {selectedTypes.length > 0 && ` of type${selectedTypes.length > 1 ? 's' : ''}: ${selectedTypes.join(', ')}`}
                </div>
            )}

            {/* Loading State */}
            {currentLoading && currentPokemonList.length === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <PokemonCardSkeleton key={index} />
                    ))}
                </div>
            )}

            {/* Pokémon Grid */}
            {filteredPokemonList.length > 0 && (
                <>
                    {viewType === 'loadMore' ? (
                        // Virtualized infinite scroll grid
                        <VirtualizedPokemonGrid
                            pokemonList={filteredPokemonList}
                            hasNextPage={currentHasMore}
                            isNextPageLoading={currentLoading}
                            loadNextPage={loadMore}
                            onPokemonClick={handlePokemonClick}
                        />
                    ) : (
                        // Regular pagination grid
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredPokemonList.map((pokemon) => (
                                <PokemonCard
                                    key={pokemon.id}
                                    pokemon={pokemon}
                                    onClick={() => handlePokemonClick(pokemon)}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* No Results */}
            {!currentLoading && filteredPokemonList.length === 0 && currentPokemonList.length > 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                        No Pokémon found matching your criteria
                    </div>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedTypes([]);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* Pagination Controls - Only for pagination view */}
            {viewType === 'pagination' && !currentLoading && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                    >
                        Previous
                    </button>

                    <span className="px-4 py-2 text-gray-700">
                        Page {currentPage + 1}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!currentHasMore}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Loading More State - Only for infinite scroll */}
            {viewType === 'loadMore' && currentLoading && currentPokemonList.length > 0 && (
                <div className="text-center mt-8">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-gray-600">Loading more Pokémon...</p>
                </div>
            )}
        </div>
    );
};

export default PokemonList; 