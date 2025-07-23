interface ImageSkeletonProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    shape?: 'circle' | 'square';
    className?: string;
}

/**
 * ImageSkeleton Component
 * 
 * A reusable skeleton component for image loading states.
 * Provides consistent loading animations across the application.
 * 
 * Features:
 * - Multiple size options (sm, md, lg, xl)
 * - Circle and square shapes
 * - Dark mode support
 * - Smooth pulse animation
 * - Customizable with className prop
 * 
 * @param {ImageSkeletonProps} props - Component props
 * @returns {JSX.Element} Skeleton loading component
 */
const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
    size = 'md',
    shape = 'square',
    className = ''
}) => {
    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
        xl: 'w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80'
    };

    const shapeClasses = {
        circle: 'rounded-full',
        square: 'rounded-lg'
    };

    const innerSizeClasses = {
        sm: 'w-10 h-10',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
        xl: 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48'
    };

    return (
        <div
            className={`
                ${sizeClasses[size]} 
                ${shapeClasses[shape]} 
                bg-gray-200 dark:bg-gray-700 
                animate-pulse 
                flex items-center justify-center
                ${className}
            `}
        >
            <div
                className={`
                    ${innerSizeClasses[size]} 
                    ${shapeClasses[shape]} 
                    bg-gray-300 dark:bg-gray-600
                `}
            />
        </div>
    );
};

export default ImageSkeleton; 