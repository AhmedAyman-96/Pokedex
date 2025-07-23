import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemon';
import { useTypeColors } from '../hooks/useTypeColors';
import StatsSection from '../components/StatsSection';
import AbilitiesSection from '../components/AbilitiesSection';
import TypeBadge from '../components/TypeBadge';
import { LightningBoltIcon, ArrowLeftIcon, HeightIcon, WeightIcon } from '../components/icons';

const PokemonDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { pokemon, loading, error, refetch } = usePokemonDetail(id || '');

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
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => refetch()}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                        >
                            Retry
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                        >
                            Back to List
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const imageUrl = pokemon.sprites.other['official-artwork'].front_default ||
        pokemon.sprites.front_default;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
            <div className="min-h-screen flex flex-col">
                <div className="p-4 lg:p-6">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Back to List
                    </button>
                </div>

                <div className="flex-1 flex items-start justify-center px-4 lg:px-8 pt-8 pb-16">
                    <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
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

                        <div className="p-8 sm:p-10 lg:p-12">
                            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                                <div className="flex flex-col items-center">
                                    <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white dark:bg-gray-800 rounded-full shadow-xl flex items-center justify-center p-8 sm:p-10 border border-gray-200 dark:border-gray-700 mb-8 sm:mb-10">
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

                                    <div className="mb-8 sm:mb-10 flex gap-1">
                                        {pokemon.types.map((type) => (
                                            <TypeBadge key={type.slot} typeName={type.type.name} />
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 sm:gap-8 w-full max-w-md sm:max-w-lg">
                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 sm:p-8 flex flex-col items-center text-center">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <HeightIcon className="w-7 h-7 text-gray-600 dark:text-gray-400" />
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Height
                                                </span>
                                            </div>
                                            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                                {(pokemon.height / 10).toFixed(1)} m
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 sm:p-8 flex flex-col items-center text-center">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <WeightIcon className="w-7 h-7 text-gray-600 dark:text-gray-400" />
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Weight
                                                </span>
                                            </div>
                                            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                                {(pokemon.weight / 10).toFixed(1)} kg
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8 sm:space-y-10">
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                                            Base Stats
                                        </h3>
                                        <div className="space-y-4 sm:space-y-5">
                                            {pokemon.stats.map((stat) => {
                                                const percentage = (stat.base_stat / 255) * 100;
                                                const statName = stat.stat.name === 'special-attack' ? 'Sp. Attack' :
                                                    stat.stat.name === 'special-defense' ? 'Sp. Defense' :
                                                        stat.stat.name.toUpperCase();

                                                return (
                                                    <div key={stat.stat.name} className="flex items-center space-x-6 sm:space-x-8">
                                                        <span className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 min-w-[100px] sm:min-w-[120px]">
                                                            {statName}
                                                        </span>
                                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                                                            <div
                                                                className="bg-gray-600 dark:bg-gray-500 h-4 rounded-full transition-all duration-300"
                                                                style={{ width: `${percentage}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-base sm:text-lg font-medium text-gray-900 dark:text-white min-w-[40px] sm:min-w-[50px] text-right">
                                                            {stat.base_stat}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                                            Abilities
                                        </h3>
                                        <div className="space-y-3">
                                            {pokemon.abilities.map((ability) => (
                                                <div key={ability.slot} className="flex items-center space-x-3">
                                                    <span className="px-4 py-2 text-base font-medium bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full capitalize">
                                                        {ability.ability.name.replace('-', ' ')}
                                                    </span>
                                                    {ability.is_hidden && (
                                                        <span className="text-base text-gray-500 dark:text-gray-400 italic">
                                                            (Hidden)
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

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