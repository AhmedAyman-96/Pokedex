interface LoadingMoreIndicatorProps {
    message?: string;
    className?: string;
}

/**
 * LoadingMoreIndicator Component
 * 
 * A component that displays a loading indicator with a green spinner
 * and customizable message. Used for "load more" scenarios with
 * transparent background.
 * 
 * Features:
 * - Green circular spinner animation
 * - Customizable loading message
 * - Transparent background
 * - Dark mode support
 * - Centered layout
 * 
 * @param {LoadingMoreIndicatorProps} props - Component props
 * @returns {JSX.Element} Loading indicator component
 */
const LoadingMoreIndicator: React.FC<LoadingMoreIndicatorProps> = ({
    message = "Loading more Pokemon...",
    className = ""
}) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-4 border-green-500 border-t-transparent"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{message}</span>
        </div>
    );
};

export default LoadingMoreIndicator; 