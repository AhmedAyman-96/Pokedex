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

/**
 * AbilitiesSection Component
 * 
 * A component that displays Pokémon abilities with simple styling.
 * Shows ability names with proper formatting and hidden ability indicators.
 * 
 * Features:
 * - Ability name formatting and display
 * - Hidden ability indicators
 * - Responsive design with dark mode support
 * - Simple, clean layout
 * 
 * @param {AbilitiesSectionProps} props - Component props containing Pokémon abilities array
 * @returns {JSX.Element} Rendered abilities section component
 */
const AbilitiesSection: React.FC<AbilitiesSectionProps> = ({ abilities }) => {

    return (
        <div className="space-y-3">
            {abilities.map((ability) => (
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
    );
};

export default AbilitiesSection; 