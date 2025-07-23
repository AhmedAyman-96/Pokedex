import React from 'react';

interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface StatsSectionProps {
    stats: Stat[];
}

/**
 * StatsSection Component
 * 
 * A component that displays Pokémon base stats with visual progress bars.
 * Shows individual stat values with progress bars and proper formatting.
 * 
 * Features:
 * - Progress visualization with percentages
 * - Responsive design with dark mode support
 * - Smooth animations and transitions
 * - Proper stat name formatting
 * 
 * @param {StatsSectionProps} props - Component props containing Pokémon stats array
 * @returns {JSX.Element} Rendered stats section component
 */
const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
    const maxStat = 255; // Maximum possible stat value in Pokemon

    return (
        <div className="space-y-4 sm:space-y-5">
            {stats.map((stat) => {
                const percentage = (stat.base_stat / maxStat) * 100;
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
    );
};

export default StatsSection; 