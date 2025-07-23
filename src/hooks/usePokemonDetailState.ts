import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonDetail } from './usePokemon';

export const usePokemonDetailState = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pokemon, loading, error, refetch } = usePokemonDetail(id || '');

  const handleBackClick = () => {
    navigate('/');
  };

  const handleRetry = () => {
    refetch();
  };

  return {
    pokemon,
    loading,
    error,
    handleBackClick,
    handleRetry,
  };
}; 