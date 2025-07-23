import { TYPE_COLORS } from '../lib/constants';

export const useTypeColors = () => {
  const getTypeColor = (typeName: string): string => {
    return TYPE_COLORS[typeName as keyof typeof TYPE_COLORS] || 'bg-gray-500';
  };

  return { getTypeColor };
}; 