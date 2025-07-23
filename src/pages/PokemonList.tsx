
import PokemonCard from '../components/PokemonCard';
import VirtualizedPokemonGrid from '../components/VirtualizedPokemonGrid';
import PokemonCardSkeleton from '../components/PokemonCardSkeleton';
import ViewModeToggle from '../components/ViewModeToggle';
import PaginationControls from '../components/PaginationControls';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import { LightningBoltIcon } from '../components/icons';
import { usePokemonListState } from '../hooks/usePokemonListState';

/**
 * PokemonList Page Component
 * 
 * The main Pokémon list page that displays a grid of Pokémon cards with
 * pagination/infinite scroll functionality. Users can switch between
 * pagination and infinite scroll modes.
 * 
 * Features:
 * - Dual view modes: Pagination and Infinite Scroll
 * - Responsive grid layout
 * - Loading states and error handling
 * - Dark mode support
 * 
 * @returns {JSX.Element} Rendered Pokémon list page
 */
const PokemonList: React.FC = () => {
    const {
        // State
        viewType,
        currentPage,
        scrollContainerRef,

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
        loadMore,
    } = usePokemonListState();

    // Show error state if there's an error
    if (currentError) {
        return (
            <div className={`fixed inset-0 flex items-center justify-center transition-colors duration-500 ease-in-out ${viewType === 'loadMore' ? 'bg-green-50' : 'bg-sky-100'
                }`}>
                <ErrorDisplay
                    error={currentError}
                    onRetry={handleRetry}
                    title="Failed to load Pokémon"
                />
            </div>
        );
    }

    return (
        <div
            ref={scrollContainerRef}
            className={`fixed inset-0 overflow-y-auto transition-colors duration-500 ease-in-out ${viewType === 'loadMore' ? 'bg-green-50' : 'bg-sky-100'
                }`}
        >
            <div className="min-h-full">
                {/* Header Section */}
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

                {/* Main Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
                    <div className="space-y-6">
                        {/* View Mode Toggle */}
                        <ViewModeToggle
                            viewType={viewType}
                            onViewTypeChange={handleViewTypeChange}
                        />

                        {/* Loading State - Initial Load */}
                        {currentLoading && filteredPokemonList.length === 0 && (
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
                                    <VirtualizedPokemonGrid
                                        pokemonList={filteredPokemonList}
                                        hasNextPage={currentHasMore}
                                        isNextPageLoading={currentNextPageLoading}
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

                        {/* No Results State */}
                        {!currentLoading && filteredPokemonList.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-500 text-lg mb-4">
                                    No Pokémon found
                                </div>
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {viewType === 'pagination' && !currentLoading && filteredPokemonList.length > 0 && (
                            <div className="flex flex-col items-center space-y-4">
                                <PaginationControls
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    hasNextPage={currentHasMore}
                                    hasPreviousPage={currentPage > 0}
                                />

                                {/* Page Information */}
                                <div className="text-sm text-gray-600 text-center">
                                    Page {currentPage + 1} of {totalPages} ({limit} Pokemon shown of {filteredPokemonList.length})
                                </div>
                            </div>
                        )}

                        {/* Loading State - Page Change */}
                        {viewType === 'pagination' && currentLoading && filteredPokemonList.length > 0 && (
                            <LoadingSpinner
                                message="Loading Pokémon..."
                                size="md"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonList; 