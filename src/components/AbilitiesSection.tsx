import React from 'react';

interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

interface AbilitiesSectionProps {
    abilities: Ability[];
}

const AbilitiesSection: React.FC<AbilitiesSectionProps> = ({ abilities }) => {
    const formatAbilityName = (name: string) => {
        return name.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Abilities
            </h3>

            <div className="space-y-2">
                {abilities.map((ability) => (
                    <div
                        key={ability.slot}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${ability.is_hidden
                                ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700'
                                : 'bg-gray-50 dark:bg-gray-700'
                            }`}
                    >
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-white capitalize">
                                {formatAbilityName(ability.ability.name)}
                            </span>
                            {ability.is_hidden && (
                                <span className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                                    Hidden
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AbilitiesSection; 