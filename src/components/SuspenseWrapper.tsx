import React, { Suspense } from 'react';
import type { ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SuspenseWrapperProps {
    children: ReactNode;
    fallback?: ReactNode;
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

/**
 * SuspenseWrapper Component
 * 
 * A reusable wrapper component that provides Suspense boundaries with
 * customizable fallback loading states. Can be used to wrap any component
 * that might suspend during rendering.
 * 
 * Features:
 * - Customizable loading messages and sizes
 * - Consistent loading UI across the app
 * - Flexible fallback customization
 * - Type-safe props with proper defaults
 * 
 * @param {SuspenseWrapperProps} props - Component props
 * @returns {JSX.Element} Wrapped component with Suspense boundary
 */
const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
    children,
    fallback,
    message = "Loading...",
    size = 'md',
    className = "flex items-center justify-center p-8"
}) => {
    const defaultFallback = (
        <div className={className}>
            <LoadingSpinner message={message} size={size} />
        </div>
    );

    return (
        <Suspense fallback={fallback || defaultFallback}>
            {children}
        </Suspense>
    );
};

export default SuspenseWrapper; 