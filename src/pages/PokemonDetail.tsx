import { usePokemonDetailState } from '../hooks/usePokemonDetailState';
import {
    PokemonDetailImage,
    PokemonDetailInfo,
    TypeBadge,
    AbilitiesSection,
    StatsSection,
    ErrorDisplay,
    LoadingSpinner
} from '../components';
import { LightningBoltIcon, ArrowLeftIcon } from '../components/icons';

/**
 * PokemonDetail Page Component
 * 
 * The detailed view page for individual Pokémon, displaying comprehensive information
 * including stats, abilities, types, and other characteristics. Provides a rich,
 * interactive experience for exploring Pokémon data.
 * 
 * Features:
 * - Comprehensive Pokémon information display
 * - Interactive stats visualization
 * - Ability details with hidden ability indicators
 * - Type badges and information
 * - Responsive design with dark mode support
 * - Loading and error states
 * - Navigation back to list
 * 
 * @returns {JSX.Element} Rendered Pokémon detail page
 */
const PokemonDetail: React.FC = () => {
    const { pokemon, loading, error, handleBackClick, handleRetry } = usePokemonDetailState();

    if (loading) {
        return (
            <div className="fixed inset-0 bg-pink-50 flex items-center justify-center">
                <LoadingSpinner
                    message="Loading Pokémon details..."
                    size="lg"
                />
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="fixed inset-0 bg-pink-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <ErrorDisplay
                        error={error || 'Pokémon not found'}
                        onRetry={handleRetry}
                        title="Failed to load Pokémon details"
                    />
                    <div className="mt-6">
                        <button
                            onClick={handleBackClick}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                        >
                            Back to List
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-pink-50 flex flex-col">
            <div className="h-full flex flex-col">
                <div className="p-3 sm:p-4 lg:p-6 flex-shrink-0">
                    <button
                        onClick={handleBackClick}
                        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-sm sm:text-base"
                    >
                        <ArrowLeftIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Back to List
                    </button>
                </div>

                <div className="flex-1 flex items-center justify-center px-3 sm:px-4 lg:px-8 pb-3 sm:pb-4 lg:pb-6">
                    <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl max-h-[calc(100vh-6rem)] sm:max-h-fit bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 text-center flex-shrink-0">
                            <div className="flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
                                <LightningBoltIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />
                                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white capitalize">
                                    {pokemon.name}
                                </h1>
                            </div>
                            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mt-1">
                                #{pokemon.id.toString().padStart(3, '0')}
                            </p>
                        </div>

                        <div className="flex-1 overflow-y-auto sm:overflow-visible p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8">
                            <div className="grid lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                                <div className="flex flex-col items-center space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 xl:space-y-6">
                                    <PokemonDetailImage pokemon={pokemon} />

                                    <div className="flex gap-1">
                                        {pokemon.types.map((type) => (
                                            <TypeBadge key={type.slot} typeName={type.type.name} />
                                        ))}
                                    </div>

                                    <PokemonDetailInfo pokemon={pokemon} />
                                </div>

                                <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 xl:space-y-8">
                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6">
                                            Base Stats
                                        </h3>
                                        <StatsSection stats={pokemon.stats} />
                                    </div>

                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6">
                                            Abilities
                                        </h3>
                                        <AbilitiesSection abilities={pokemon.abilities} />
                                    </div>

                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                                            Base Experience
                                        </h3>
                                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-purple-600 dark:text-purple-400">
                                            {pokemon.base_experience} XP
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail; 