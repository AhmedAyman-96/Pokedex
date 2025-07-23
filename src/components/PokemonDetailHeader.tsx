import { LightningBoltIcon, ArrowLeftIcon } from './icons';
import { formatPokemonId } from '../lib/utils';
import type { Pokemon } from '../types/pokemon';

interface PokemonDetailHeaderProps {
    pokemon: Pokemon;
    onBackClick: () => void;
}

const PokemonDetailHeader: React.FC<PokemonDetailHeaderProps> = ({ pokemon, onBackClick }) => {
    return (
        <>
            <div className="p-4 lg:p-6">
                <button
                    onClick={onBackClick}
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Back to List
                </button>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 sm:p-10 text-center">
                <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                    <LightningBoltIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-white capitalize">
                        {pokemon.name}
                    </h1>
                </div>
                <p className="text-white text-lg sm:text-xl mt-2">
                    {formatPokemonId(pokemon.id)}
                </p>
            </div>
        </>
    );
};

export default PokemonDetailHeader; 