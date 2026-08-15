import React from 'react';
import { PlugType } from '@/types';

interface PlugGraphicProps {
  type: PlugType;
  className?: string;
  size?: number;
}

export function PlugGraphic({ type, className = '', size = 56 }: PlugGraphicProps) {
  // Renders precise SVG pin configuration diagrams for international plug types
  const renderPinDiagram = () => {
    switch (type) {
      case 'A':
        return (
          // Type A: 2 flat parallel vertical pins
          <g fill="currentColor">
            <rect x="26" y="28" width="6" height="24" rx="2" />
            <rect x="48" y="28" width="6" height="24" rx="2" />
            <circle cx="29" cy="38" r="1.5" fill="#f8fafc" />
            <circle cx="51" cy="38" r="1.5" fill="#f8fafc" />
          </g>
        );
      case 'B':
        return (
          // Type B: 2 flat pins + 1 round ground pin
          <g fill="currentColor">
            <rect x="25" y="25" width="6" height="22" rx="2" />
            <rect x="49" y="25" width="6" height="22" rx="2" />
            <circle cx="28" cy="34" r="1.5" fill="#f8fafc" />
            <circle cx="52" cy="34" r="1.5" fill="#f8fafc" />
            <circle cx="40" cy="54" r="4.5" />
          </g>
        );
      case 'C':
        return (
          // Type C: 2 round pins (Europlug)
          <g fill="currentColor">
            <circle cx="28" cy="40" r="5" />
            <circle cx="52" cy="40" r="5" />
          </g>
        );
      case 'D':
        return (
          // Type D: 3 round pins in triangle
          <g fill="currentColor">
            <circle cx="40" cy="26" r="6" />
            <circle cx="25" cy="52" r="5" />
            <circle cx="55" cy="52" r="5" />
          </g>
        );
      case 'E':
        return (
          // Type E: 2 round pins + earth pin socket hole
          <g fill="currentColor">
            <circle cx="40" cy="25" r="5.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="27" cy="46" r="5" />
            <circle cx="53" cy="46" r="5" />
          </g>
        );
      case 'F':
        return (
          // Type F: Schuko (2 round pins + side earth clips)
          <g fill="currentColor">
            {/* Side earth clips */}
            <rect x="36" y="16" width="8" height="4" rx="1" />
            <rect x="36" y="60" width="8" height="4" rx="1" />
            <circle cx="27" cy="40" r="5.5" />
            <circle cx="53" cy="40" r="5.5" />
          </g>
        );
      case 'G':
        return (
          // Type G: UK 3 rectangular blades
          <g fill="currentColor">
            {/* Top vertical earth blade */}
            <rect x="37" y="22" width="6" height="16" rx="1.5" />
            {/* Bottom horizontal live/neutral blades */}
            <rect x="20" y="47" width="16" height="6" rx="1.5" />
            <rect x="44" y="47" width="16" height="6" rx="1.5" />
          </g>
        );
      case 'H':
        return (
          // Type H: Israel 3 flat pins in Y
          <g fill="currentColor">
            <rect x="37" y="50" width="6" height="15" rx="1.5" />
            <rect x="25" y="27" width="6" height="15" rx="1.5" transform="rotate(-30 28 34)" />
            <rect x="49" y="27" width="6" height="15" rx="1.5" transform="rotate(30 52 34)" />
          </g>
        );
      case 'I':
        return (
          // Type I: Australia/NZ angled V-pins + earth
          <g fill="currentColor">
            {/* Angled pins */}
            <rect x="25" y="26" width="6" height="16" rx="1.5" transform="rotate(-30 28 34)" />
            <rect x="49" y="26" width="6" height="16" rx="1.5" transform="rotate(30 52 34)" />
            {/* Vertical earth */}
            <rect x="37" y="46" width="6" height="16" rx="1.5" />
          </g>
        );
      case 'J':
        return (
          // Type J: Switzerland 3 round pins (offset middle)
          <g fill="currentColor">
            <circle cx="26" cy="42" r="4.5" />
            <circle cx="40" cy="33" r="4.5" />
            <circle cx="54" cy="42" r="4.5" />
          </g>
        );
      case 'K':
        return (
          // Type K: Denmark 3 pins
          <g fill="currentColor">
            <circle cx="27" cy="34" r="5" />
            <circle cx="53" cy="34" r="5" />
            {/* Spade earth pin */}
            <path d="M 36 50 Q 40 56 44 50 L 44 47 L 36 47 Z" />
          </g>
        );
      case 'L':
        return (
          // Type L: Italy 3 round pins inline
          <g fill="currentColor">
            <circle cx="24" cy="40" r="4.5" />
            <circle cx="40" cy="40" r="4.5" />
            <circle cx="56" cy="40" r="4.5" />
          </g>
        );
      case 'M':
        return (
          // Type M: South Africa large 3 round pins
          <g fill="currentColor">
            <circle cx="40" cy="24" r="7" />
            <circle cx="24" cy="52" r="5.5" />
            <circle cx="56" cy="52" r="5.5" />
          </g>
        );
      case 'N':
        return (
          // Type N: Brazil 3 round pins
          <g fill="currentColor">
            <circle cx="26" cy="43" r="4.5" />
            <circle cx="40" cy="34" r="4.5" />
            <circle cx="54" cy="43" r="4.5" />
          </g>
        );
      case 'O':
        return (
          // Type O: Thailand 3 round pins in triangle
          <g fill="currentColor">
            <circle cx="40" cy="28" r="5" />
            <circle cx="27" cy="48" r="5" />
            <circle cx="53" cy="48" r="5" />
          </g>
        );
      default:
        return (
          <g fill="currentColor">
            <circle cx="30" cy="40" r="5" />
            <circle cx="50" cy="40" r="5" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-2xs ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        className="text-slate-800 transition group-hover:scale-105"
      >
        {/* Outer socket bezel */}
        <circle
          cx="40"
          cy="40"
          r="36"
          className="fill-slate-50 stroke-slate-200/80"
          strokeWidth="2"
        />
        {/* Recessed inner ring */}
        <circle
          cx="40"
          cy="40"
          r="30"
          className="fill-slate-100/60 stroke-slate-300/60"
          strokeWidth="1.5"
        />
        {/* Specific Pins */}
        {renderPinDiagram()}
      </svg>
      <span className="mt-1.5 text-[11px] font-bold text-slate-700">Type {type}</span>
    </div>
  );
}
