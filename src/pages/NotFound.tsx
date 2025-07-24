import { useNavigate } from 'react-router-dom';
import { LightningBoltIcon } from '../components/icons';

/**
 * NotFound Page Component
 * 
 * A 404 error page that displays when users navigate to non-existent routes.
 * Provides a user-friendly error message and navigation options.
 * 
 * Features:
 * - Modern, responsive design
 * - Consistent with app styling
 * - Easy navigation back to home
 * - Helpful error message
 * 
 * @returns {JSX.Element} Rendered 404 page
 */
const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <LightningBoltIcon className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />
                        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white">
                            404
                        </h1>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Oops! The page you're looking for doesn't exist.
                        It might have been moved or deleted.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoHome}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                    >
                        Go to Home
                    </button>
                    <button
                        onClick={handleGoBack}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                    >
                        Go Back
                    </button>
                </div>

                <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                    <p>If you believe this is an error, please check the URL and try again.</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound; 