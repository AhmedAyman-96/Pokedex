import React from 'react';

interface TypeFilterProps {
    selectedTypes: string[];
    onTypeChange: (types: string[]) => void;
}

const POKEMON_TYPES = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison',
    'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedTypes, onTypeChange }) => {
    const handleTypeToggle = (type: string) => {
        if (selectedTypes.includes(type)) {
            onTypeChange(selectedTypes.filter(t => t !== type));
        } else {
            onTypeChange([...selectedTypes, type]);
        }
    };

    const clearAll = () => {
        onTypeChange([]);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Filter by Type
                </h3>
                {selectedTypes.length > 0 && (
                    <button
                        onClick={clearAll}
                        className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {POKEMON_TYPES.map((type) => (
                    <button
                        key={type}
                        onClick={() => handleTypeToggle(type)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${selectedTypes.includes(type)
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {selectedTypes.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Selected: {selectedTypes.length} type{selectedTypes.length !== 1 ? 's' : ''}
                </div>
            )}
        </div>
    );
};

export default TypeFilter; 