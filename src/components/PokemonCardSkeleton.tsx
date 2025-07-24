import React from 'react';
import ImageSkeleton from './ImageSkeleton';

const PokemonCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="p-4">
                <div className="flex justify-center mb-4">
                    <ImageSkeleton size="md" shape="square" />
                </div>

                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>

                <div className="flex justify-center gap-2">
                    <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCardSkeleton; 