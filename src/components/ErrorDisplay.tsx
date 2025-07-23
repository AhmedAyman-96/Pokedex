interface ErrorDisplayProps {
    error: string | null;
    onRetry: () => void;
    title?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
    error,
    onRetry,
    title = "Something went wrong"
}) => {
    if (!error) return null;

    return (
        <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                {error}
            </p>
            <button
                onClick={onRetry}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
            >
                Try Again
            </button>
        </div>
    );
};

export default ErrorDisplay; 