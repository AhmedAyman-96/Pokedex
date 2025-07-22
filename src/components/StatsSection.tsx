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

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
    const getStatColor = (statName: string) => {
        const colors: { [key: string]: string } = {
            hp: 'bg-red-500',
            attack: 'bg-orange-500',
            defense: 'bg-yellow-500',
            'special-attack': 'bg-purple-500',
            'special-defense': 'bg-blue-500',
            speed: 'bg-green-500',
        };
        return colors[statName] || 'bg-gray-500';
    };

    const formatStatName = (name: string) => {
        return name.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const maxStat = 255; // Maximum possible stat value in Pokemon

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Base Stats
            </h3>

            <div className="space-y-3">
                {stats.map((stat) => {
                    const percentage = (stat.base_stat / maxStat) * 100;
                    const statColor = getStatColor(stat.stat.name);

                    return (
                        <div key={stat.stat.name} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-300 capitalize min-w-[80px]">
                                    {formatStatName(stat.stat.name)}
                                </span>
                                <span className="font-semibold text-gray-900 dark:text-white min-w-[30px] text-right">
                                    {stat.base_stat}
                                </span>
                            </div>

                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                <div
                                    className={`h-full ${statColor} rounded-full transition-all duration-700 ease-out`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Total Stats */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white">
                        Total
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                        {stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatsSection; 