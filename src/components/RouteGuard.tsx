import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePokemonCount } from '../hooks/usePokemonCount';

interface RouteGuardProps {
    children: React.ReactNode;
}

/**
 * RouteGuard Component
 * 
 * Validates route parameters and redirects to 404 for invalid routes.
 * Currently handles Pokemon ID validation for the detail page.
 * 
 * Features:
 * - Dynamic Pokemon ID validation using live API count
 * - Automatic redirect to 404 for invalid IDs
 * - Extensible for future route validations
 * 
 * @param {RouteGuardProps} props - Component props
 * @returns {JSX.Element} Children or redirects to 404
 */
const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: pokemonCount, isLoading, error } = usePokemonCount();

    useEffect(() => {
        if (pokemonCount && id) {
            const pokemonId = parseInt(id, 10);

            // Check if ID is valid (Pokemon API has IDs from 1 to current count)
            if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > pokemonCount) {
                navigate('/404', { replace: true });
                return;
            }
        }
    }, [id, pokemonCount, navigate]);

    if (isLoading) {
        return <>{children}</>;
    }

    if (error) {
        return <>{children}</>;
    }

    return <>{children}</>;
};

export default RouteGuard; 