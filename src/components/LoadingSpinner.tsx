interface LoadingSpinnerProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

/**
 * LoadingSpinner Component
 * 
 * A reusable loading spinner component that displays an animated spinner
 * with an optional message. Provides different sizes for various use cases.
 * 
 * Features:
 * - Animated spinning indicator
 * - Customizable size options (sm, md, lg)
 * - Optional loading message
 * - Centered layout
 * - Dark mode support
 * - Accessible design
 * 
 * @param {LoadingSpinnerProps} props - Component props containing message and size
 * @returns {JSX.Element} Rendered loading spinner component
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    message = "Loading...",
    size = 'md'
}) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    return (
        <div className="text-center py-8">
            <div className={`inline-block animate-spin rounded-full border-4 border-blue-500 border-t-transparent ${sizeClasses[size]}`}></div>
            {message && (
                <p className="mt-3 text-gray-600 dark:text-gray-300 font-medium">
                    {message}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner; 