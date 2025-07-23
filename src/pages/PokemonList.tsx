
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import VirtualizedPokemonGrid from '../components/VirtualizedPokemonGrid';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import PokemonCardSkeleton from '../components/PokemonCardSkeleton';
import { usePokemonList } from '../hooks/usePokemon';
import { useInfinitePokemon } from '../hooks/useInfinitePokemon';
import type { Pokemon } from '../types/pokemon';
import { LightningBoltIcon, FilterIcon } from '../components/icons';

/**
 * PokemonList Component
 * 
 * Main page component that displays a list of Pokémon with both pagination
 * and infinite scroll viewing options.
 */

const PokemonList: React.FC = () => {
    const [viewType, setViewType] = useState<'pagination' | 'loadMore'>('pagination');
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const limit = 20;
    const offset = currentPage * limit;

    const { pokemonList: paginationList, loading: paginationLoading, error: paginationError, hasMore: paginationHasMore, refetch: refetchPagination, totalCount: paginationTotal } = usePokemonList(limit, offset);
    const { pokemonList: infiniteList, loading: infiniteLoading, error: infiniteError, hasMore: infiniteHasMore, loadMore, reset } = useInfinitePokemon();

    /**
     * Retry handler for both pagination and infinite scroll modes
     */
    const handleRetry = () => {
        if (viewType === 'pagination') {
            refetchPagination();
        } else {
            reset();
        }
    };

    /**
     * Filter Pokémon based on search term and selected types
     */
    const filterPokemon = (pokemonList: Pokemon[]) => {
        return pokemonList.filter(pokemon => {
            const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedTypes.length === 0 ||
                pokemon.types.some(type => selectedTypes.includes(type.type.name));
            return matchesSearch && matchesType;
        });
    };

    /**
     * Navigate to Pokémon detail page
     */
    const handlePokemonClick = (pokemon: Pokemon) => {
        navigate(`/pokemon/${pokemon.id}`);
    };

    /**
     * Handle pagination page changes
     */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    /**
     * Handle view type changes (pagination vs infinite scroll)
     */
    const handleViewTypeChange = (newViewType: 'pagination' | 'loadMore') => {
        setViewType(newViewType);
        setCurrentPage(0);
        if (newViewType === 'loadMore') {
            reset();
        }
    };

    const currentPokemonList = viewType === 'loadMore' ? infiniteList : paginationList;
    const currentLoading = viewType === 'loadMore' ? infiniteLoading : paginationLoading;
    const currentError = viewType === 'loadMore' ? infiniteError : paginationError;
    const currentHasMore = viewType === 'loadMore' ? infiniteHasMore : paginationHasMore;

    const filteredPokemonList = filterPokemon(currentPokemonList);
    const totalPages = Math.ceil(paginationTotal / limit);

    /**
     * Generate pagination numbers with ellipsis for large page counts
     */
    const getPaginationNumbers = () => {
        const numbers = [];
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
    };

    if (currentError) {
        return (
            <div className="fixed inset-0 bg-sky-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {currentError}
                    </h2>
                    <button
                        onClick={handleRetry}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={scrollContainerRef} className="fixed inset-0 bg-sky-100 overflow-y-auto">
            <div className="py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <LightningBoltIcon className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" />
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                                Pokédex
                            </h1>
                        </div>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover and explore Pokemon with page controls
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
                <div className="space-y-6">
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => handleViewTypeChange('pagination')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform ${viewType === 'pagination'
                                ? 'bg-gray-900 text-white scale-105 shadow-lg shadow-gray-900/25'
                                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:scale-102 hover:shadow-md'
                                }`}
                        >
                            Page Controls
                        </button>
                        <button
                            onClick={() => handleViewTypeChange('loadMore')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform ${viewType === 'loadMore'
                                ? 'bg-gray-900 text-white scale-105 shadow-lg shadow-gray-900/25'
                                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:scale-102 hover:shadow-md'
                                }`}
                        >
                            Infinite Scroll
                        </button>
                    </div>

                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />

                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                            <FilterIcon className="w-5 h-5" />
                            <span className="font-medium">Filters</span>
                        </button>
                    </div>

                    {showFilters && (
                        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <TypeFilter
                                selectedTypes={selectedTypes}
                                onTypeChange={setSelectedTypes}
                            />
                        </div>
                    )}

                    {(searchTerm || selectedTypes.length > 0) && (
                        <div className="text-center text-sm text-gray-600 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200">
                            Showing <span className="font-semibold text-gray-900">{filteredPokemonList.length}</span> of <span className="font-semibold">{currentPokemonList.length}</span> Pokémon
                            {searchTerm && ` matching "${searchTerm}"`}
                            {selectedTypes.length > 0 && ` of type${selectedTypes.length > 1 ? 's' : ''}: ${selectedTypes.join(', ')}`}
                        </div>
                    )}

                    {currentLoading && currentPokemonList.length === 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <PokemonCardSkeleton key={index} />
                            ))}
                        </div>
                    )}

                    {filteredPokemonList.length > 0 && (
                        <>
                            {viewType === 'loadMore' ? (
                                <VirtualizedPokemonGrid
                                    pokemonList={filteredPokemonList}
                                    hasNextPage={currentHasMore}
                                    isNextPageLoading={currentLoading}
                                    loadNextPage={loadMore}
                                    onPokemonClick={handlePokemonClick}
                                    scrollContainerRef={scrollContainerRef}
                                />
                            ) : (
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

                    {!currentLoading && filteredPokemonList.length === 0 && currentPokemonList.length > 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg mb-4">
                                No Pokémon found matching your criteria
                            </div>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedTypes([]);
                                }}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {viewType === 'pagination' && !currentLoading && (
                        <div className="flex flex-col items-center space-y-4 mt-8">
                            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 0}
                                    className="text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:hover:bg-transparent transition-colors"
                                >
                                    &lt; Previous
                                </button>

                                <div className="flex flex-wrap justify-center items-center gap-1 max-w-full">
                                    {getPaginationNumbers().map((number, index) => (
                                        <button
                                            key={index}
                                            onClick={() => typeof number === 'number' ? handlePageChange(number - 1) : null}
                                            disabled={typeof number !== 'number'}
                                            className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${number === currentPage + 1
                                                ? 'bg-gray-900 text-white'
                                                : typeof number === 'number'
                                                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
                                                    : 'text-gray-400 cursor-default'
                                                }`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={!currentHasMore}
                                    className="text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:hover:bg-transparent transition-colors"
                                >
                                    Next &gt;
                                </button>
                            </div>

                            <div className="text-sm text-gray-600 text-center">
                                Page {currentPage + 1} of {totalPages} ({limit} Pokemon shown of {paginationTotal})
                            </div>
                        </div>
                    )}

                    {viewType === 'loadMore' && currentLoading && currentPokemonList.length > 0 && (
                        <div className="text-center mt-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-900 border-t-transparent"></div>
                            <p className="mt-3 text-gray-600 font-medium">Loading more Pokémon...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PokemonList; 