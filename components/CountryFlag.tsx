import React from 'react';

interface CountryFlagProps {
  code: string;
  name: string;
  emoji?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function CountryFlag({
  code,
  name,
  emoji,
  size = 'md',
  className = '',
}: CountryFlagProps) {
  const sizeClasses = {
    sm: 'w-5 h-3.5',
    md: 'w-7 h-5',
    lg: 'w-10 h-7',
    xl: 'w-14 h-10',
  };

  const codeLower = code.toLowerCase();

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 overflow-hidden rounded-[3px] shadow-2xs ${className}`}
      title={name}
    >
      <img
        src={`https://flagcdn.com/w80/${codeLower}.png`}
        srcSet={`https://flagcdn.com/w160/${codeLower}.png 2x`}
        alt={`${name} flag`}
        className={`${sizeClasses[size]} object-cover rounded-[2px] border border-black/10`}
        loading="lazy"
        width={size === 'xl' ? 56 : size === 'lg' ? 40 : size === 'md' ? 28 : 20}
        height={size === 'xl' ? 40 : size === 'lg' ? 28 : size === 'md' ? 20 : 14}
      />
    </span>
  );
}
