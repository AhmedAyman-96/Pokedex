import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemon';
import StatsSection from '../components/StatsSection';
import AbilitiesSection from '../components/AbilitiesSection';

const PokemonDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { pokemon, loading, error } = usePokemonDetail(id || '');

    const getTypeColor = (typeName: string) => {
        const typeColors: { [key: string]: string } = {
            normal: 'bg-gray-400',
            fire: 'bg-red-500',
            water: 'bg-blue-500',
            electric: 'bg-yellow-400',
            grass: 'bg-green-500',
            ice: 'bg-blue-200',
            fighting: 'bg-red-700',
            poison: 'bg-purple-500',
            ground: 'bg-yellow-600',
            flying: 'bg-indigo-400',
            psychic: 'bg-pink-500',
            bug: 'bg-green-400',
            rock: 'bg-yellow-700',
            ghost: 'bg-purple-700',
            dragon: 'bg-indigo-700',
            dark: 'bg-gray-700',
            steel: 'bg-gray-500',
            fairy: 'bg-pink-300',
        };
        return typeColors[typeName] || 'bg-gray-500';
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">Loading Pokémon details...</p>
                </div>
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {error || 'Pokémon not found'}
                    </h2>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                    >
                        Back to List
                    </button>
                </div>
            </div>
        );
    }

    const imageUrl = pokemon.sprites.other['official-artwork'].front_default ||
        pokemon.sprites.front_default;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
            {/* Back Button */}
            <div className="p-4 lg:p-6">
                <button
                    onClick={() => navigate('/')}
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to List
                </button>
            </div>

            {/* Main Card */}
            <div className="mx-4 lg:mx-8 xl:mx-auto xl:max-w-6xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-8">
                {/* Gradient Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 sm:p-6 text-center">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white capitalize">
                            {pokemon.name}
                        </h1>
                    </div>
                    <p className="text-white text-base sm:text-lg mt-1">
                        #{pokemon.id.toString().padStart(3, '0')}
                    </p>
                </div>

                {/* Main Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                        {/* Left Column: Image, Type, and Physical Stats */}
                        <div className="flex flex-col items-center">
                            {/* Circular Pokémon Image */}
                            <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center p-4 sm:p-6 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
                                <img
                                    src={imageUrl}
                                    alt={pokemon.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://via.placeholder.com/320x320?text=Pokemon';
                                    }}
                                />
                            </div>

                            {/* Type Badge */}
                            <div className="mb-4 sm:mb-6">
                                {pokemon.types.map((type) => (
                                    <span
                                        key={type.slot}
                                        className={`px-3 py-2 sm:px-4 sm:py-2 text-sm font-semibold text-white rounded-lg capitalize shadow-md ${getTypeColor(type.type.name)}`}
                                    >
                                        {type.type.name}
                                    </span>
                                ))}
                            </div>

                            {/* Height and Weight Cards */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm">
                                {/* Height Card */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                Height
                                            </p>
                                            <p className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                                                {(pokemon.height / 10).toFixed(1)} m
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Weight Card */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                Weight
                                            </p>
                                            <p className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                                                {(pokemon.weight / 10).toFixed(1)} kg
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Stats and Abilities */}
                        <div className="space-y-4 sm:space-y-6">
                            {/* Base Stats */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                                    Base Stats
                                </h3>
                                <div className="space-y-2 sm:space-y-3">
                                    {pokemon.stats.map((stat) => {
                                        const percentage = (stat.base_stat / 255) * 100;
                                        const statName = stat.stat.name === 'special-attack' ? 'Sp. Attack' :
                                            stat.stat.name === 'special-defense' ? 'Sp. Defense' :
                                                stat.stat.name.toUpperCase();

                                        return (
                                            <div key={stat.stat.name} className="flex items-center space-x-3 sm:space-x-4">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[70px] sm:min-w-[80px]">
                                                    {statName}
                                                </span>
                                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div
                                                        className="bg-gray-600 dark:bg-gray-500 h-2 rounded-full"
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[25px] sm:min-w-[30px] text-right">
                                                    {stat.base_stat}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Abilities */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                                    Abilities
                                </h3>
                                <div className="space-y-1 sm:space-y-2">
                                    {pokemon.abilities.map((ability) => (
                                        <div key={ability.slot} className="flex items-center space-x-2">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                                {ability.ability.name.replace('-', ' ')}
                                            </span>
                                            {ability.is_hidden && (
                                                <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                                                    (Hidden)
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Base Experience */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    Base Experience
                                </h3>
                                <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    {pokemon.base_experience} XP
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail; 