import { useTypeColors } from '../hooks/useTypeColors';

interface TypeBadgeProps {
    typeName: string;
    className?: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ typeName, className = '' }) => {
    const { getTypeColor } = useTypeColors();

    return (
        <span
            className={`px-3 py-2 sm:px-4 sm:py-2 text-sm font-semibold text-white rounded-lg capitalize shadow-md ${getTypeColor(typeName)} ${className}`}
        >
            {typeName}
        </span>
    );
};

export default TypeBadge; 