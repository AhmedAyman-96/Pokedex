import React from 'react';

interface WeightIconProps extends React.SVGProps<SVGSVGElement> { }

const WeightIcon: React.FC<WeightIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path d="M3 16L7 6H13L17 16H3Z" />
        <circle cx="10" cy="8" r="1.5" />
    </svg>
);

export default WeightIcon; 