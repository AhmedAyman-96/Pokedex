interface ViewModeToggleProps {
    viewType: 'pagination' | 'loadMore';
    onViewTypeChange: (viewType: 'pagination' | 'loadMore') => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
    viewType,
    onViewTypeChange,
}) => {
    return (
        <div className="flex justify-center space-x-4">
            <button
                onClick={() => onViewTypeChange('pagination')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform ${viewType === 'pagination'
                    ? 'bg-gray-900 text-white scale-105 shadow-lg shadow-gray-900/25'
                    : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:scale-102 hover:shadow-md'
                    }`}
            >
                Page Controls
            </button>
            <button
                onClick={() => onViewTypeChange('loadMore')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform ${viewType === 'loadMore'
                    ? 'bg-gray-900 text-white scale-105 shadow-lg shadow-gray-900/25'
                    : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:scale-102 hover:shadow-md'
                    }`}
            >
                Infinite Scroll
            </button>
        </div>
    );
};

export default ViewModeToggle; 