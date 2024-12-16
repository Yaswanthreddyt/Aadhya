import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`flex items-center space-x-3 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-purple-500 w-8 h-8">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_sparkle)">
            <path
              d="M16 6L18.2451 12.9098L25.5106 12.9098L19.6327 17.1803L21.8779 24.0902L16 19.8197L10.1221 24.0902L12.3673 17.1803L6.48944 12.9098L13.7549 12.9098L16 6Z"
              fill="currentColor"
            />
          </g>
          <path
            d="M16 2L18 5L21 2M16 2L14 5L11 2M16 2V0M28 16L25 18L28 21M28 16L25 13L28 11M28 16H30M4 16L7 18L4 21M4 16L7 13L4 11M4 16H2M16 30L18 27L21 30M16 30L14 27L11 30M16 30V32"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <filter id="filter0_d_sparkle" x="2.48944" y="4" width="27.0212" height="26.0902" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
              <feOffset dy="2"/>
              <feGaussianBlur stdDeviation="2"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-purple-500">
          Aadhya
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Your Personal Life Architect
        </p>
      </div>
    </motion.div>
  );
};

export default Logo;