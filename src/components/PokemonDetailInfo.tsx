import { HeightIcon, WeightIcon } from './icons';
import { formatHeight, formatWeight } from '../lib/utils';
import type { Pokemon } from '../types/pokemon';

interface PokemonDetailInfoProps {
    pokemon: Pokemon;
}

const PokemonDetailInfo: React.FC<PokemonDetailInfoProps> = ({ pokemon }) => {
    return (
        <div className="grid grid-cols-2 gap-6 sm:gap-8 w-full max-w-md sm:max-w-lg">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                    <HeightIcon className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Height</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatHeight(pokemon.height)}
                </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                    <WeightIcon className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Weight</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatWeight(pokemon.weight)}
                </p>
            </div>
        </div>
    );
};

export default PokemonDetailInfo; 