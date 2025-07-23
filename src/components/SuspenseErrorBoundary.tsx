import React, { Suspense, Component, type ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';

interface SuspenseErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    errorFallback?: ReactNode;
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, ErrorBoundaryState> {
    constructor(props: { children: ReactNode; fallback?: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <ErrorDisplay
                    error={this.state.error?.message || 'Something went wrong'}
                    onRetry={() => this.setState({ hasError: false, error: undefined })}
                    title="An error occurred"
                />
            );
        }

        return this.props.children;
    }
}

/**
 * SuspenseErrorBoundary Component
 * 
 * A comprehensive wrapper that combines Suspense and Error Boundary
 * to provide complete loading and error handling for any component tree.
 * 
 * Features:
 * - Suspense boundaries for loading states
 * - Error boundaries for error handling
 * - Customizable fallbacks for both loading and error states
 * - Consistent error recovery with retry functionality
 * 
 * @param {SuspenseErrorBoundaryProps} props - Component props
 * @returns {JSX.Element} Wrapped component with Suspense and Error Boundary
 */
const SuspenseErrorBoundary: React.FC<SuspenseErrorBoundaryProps> = ({
    children,
    fallback,
    errorFallback,
    message = "Loading...",
    size = 'md',
}) => {
    const defaultFallback = (
        <div className="flex items-center justify-center p-8">
            <LoadingSpinner message={message} size={size} />
        </div>
    );

    return (
        <ErrorBoundary fallback={errorFallback}>
            <Suspense fallback={fallback || defaultFallback}>
                {children}
            </Suspense>
        </ErrorBoundary>
    );
};

export default SuspenseErrorBoundary; 