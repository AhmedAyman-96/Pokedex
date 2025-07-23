import { generatePaginationNumbers } from '../lib/utils';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

/**
 * PaginationControls Component
 * 
 * A pagination component that provides navigation controls for paginated content.
 * Displays page numbers with ellipsis for large page counts, previous/next buttons,
 * and handles page navigation with proper disabled states.
 * 
 * Features:
 * - Smart page number display with ellipsis for large page counts
 * - Previous/Next navigation buttons
 * - Current page highlighting
 * - Disabled states for navigation limits
 * - Responsive design
 * - Dark mode support
 * 
 * @param {PaginationControlsProps} props - Component props containing pagination state and handlers
 * @returns {JSX.Element} Rendered pagination controls component
 */
const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    hasNextPage,
    hasPreviousPage,
}) => {
    const paginationNumbers = generatePaginationNumbers(currentPage, totalPages);

    return (
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPreviousPage}
                className="text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:hover:bg-transparent transition-colors"
            >
                &lt; Previous
            </button>

            <div className="flex flex-wrap justify-center items-center gap-1 max-w-full">
                {paginationNumbers.map((number, index) => (
                    <button
                        key={index}
                        onClick={() => typeof number === 'number' ? onPageChange(number - 1) : undefined}
                        disabled={typeof number !== 'number'}
                        className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${typeof number === 'number'
                            ? number === currentPage + 1
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
                            : 'text-gray-400 cursor-default'
                            }`}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage}
                className="text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:hover:bg-transparent transition-colors"
            >
                Next &gt;
            </button>
        </div>
    );
};

export default PaginationControls; 