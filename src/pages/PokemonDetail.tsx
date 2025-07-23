import { usePokemonDetailState } from '../hooks/usePokemonDetailState';
import PokemonDetailImage from '../components/PokemonDetailImage';
import PokemonDetailInfo from '../components/PokemonDetailInfo';
import TypeBadge from '../components/TypeBadge';
import AbilitiesSection from '../components/AbilitiesSection';
import StatsSection from '../components/StatsSection';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
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

    // Loading state
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

    // Error state
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
        <div className="fixed inset-0 bg-pink-50 overflow-y-auto">
            <div className="min-h-screen flex flex-col">
                {/* Back Button */}
                <div className="p-4 lg:p-6">
                    <button
                        onClick={handleBackClick}
                        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Back to List
                    </button>
                </div>

                {/* Main Content Section */}
                <div className="flex-1 flex items-start justify-center px-4 lg:px-8 pb-16">
                    <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Gradient Header - Part of the card */}
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 sm:p-10 text-center">
                            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                                <LightningBoltIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                <h1 className="text-3xl sm:text-4xl font-bold text-white capitalize">
                                    {pokemon.name}
                                </h1>
                            </div>
                            <p className="text-white text-lg sm:text-xl mt-2">
                                #{pokemon.id.toString().padStart(3, '0')}
                            </p>
                        </div>

                        {/* Card Content */}
                        <div className="p-8 sm:p-10 lg:p-12">
                            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                                {/* Left Column - Image and Basic Info */}
                                <div className="flex flex-col items-center">
                                    {/* Pokémon Image */}
                                    <PokemonDetailImage pokemon={pokemon} />

                                    {/* Type Badges */}
                                    <div className="mb-8 sm:mb-10 flex gap-1">
                                        {pokemon.types.map((type) => (
                                            <TypeBadge key={type.slot} typeName={type.type.name} />
                                        ))}
                                    </div>

                                    {/* Basic Information */}
                                    <PokemonDetailInfo pokemon={pokemon} />
                                </div>

                                {/* Right Column - Stats and Abilities */}
                                <div className="space-y-8 sm:space-y-10">
                                    {/* Base Stats Section */}
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                                            Base Stats
                                        </h3>
                                        <StatsSection stats={pokemon.stats} />
                                    </div>

                                    {/* Abilities Section */}
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                                            Abilities
                                        </h3>
                                        <AbilitiesSection abilities={pokemon.abilities} />
                                    </div>

                                    {/* Base Experience Section */}
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                            Base Experience
                                        </h3>
                                        <p className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400">
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