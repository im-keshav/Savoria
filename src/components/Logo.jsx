import React from 'react';

export const Logo = ({ size = 'default', className = '' }) => {
  const isLarge = size === 'large';

  return (
    <div className={`flex items-center gap-2.5 select-none group cursor-pointer ${className}`}>
      {/* Bespoke Luxury Crest: Outer Medallion + Fluid Ribbon S + Saffron Aroma Crescent */}
      <svg
        className={`w-auto shrink-0 transition-transform duration-300 group-hover:scale-105 ${
          isLarge ? 'h-9 md:h-10' : 'h-7 md:h-8'
        }`}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Medallion Ring */}
        <circle
          cx="22"
          cy="22"
          r="19.5"
          stroke="#18181b"
          strokeWidth="2.2"
          fill="none"
        />

        {/* Subtle Luxury Inner Guide Ring */}
        <circle
          cx="22"
          cy="22"
          r="17"
          stroke="#e4e4e7"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Fluid Culinary Monogram S */}
        <path
          d="M24.5 14.2C23 12.6 20.6 11.8 17.8 11.8C13.6 11.8 11.2 14.2 11.2 17.5C11.2 22.8 23.8 20.5 23.8 26.5C23.8 30 20.6 32.2 17 32.2C13.5 32.2 11.2 30.2 10 27.5"
          stroke="#18181b"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Signature Saffron Aroma Crescent (Crest Accent) */}
        <path
          d="M26.2 19.8C28.2 22.2 28.2 25.8 25.8 28.5"
          stroke="#f97316"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* Delicate Haute Cuisine Garnish Dot */}
        <circle
          cx="25.5"
          cy="13.5"
          r="1.6"
          fill="#f97316"
        />
      </svg>

      {/* Wordmark: SAVOR in obsidian black + IA in signature vibrant orange */}
      <div className="flex items-center font-urbanist font-extrabold tracking-[0.14em] leading-none">
        <span className={`text-zinc-900 ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
          SAVOR
        </span>
        <span className={`text-orange-500 ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
          IA
        </span>
      </div>
    </div>
  );
};

export default Logo;
