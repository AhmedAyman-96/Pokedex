import React from 'react';

interface ArrowLeftIconProps extends React.SVGProps<SVGSVGElement> { }

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

export default ArrowLeftIcon; 