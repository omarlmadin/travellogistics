import React from 'react';

interface AdPlaceholderProps {
  slotId: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

export function AdPlaceholder({ slotId, format = 'horizontal', className = '' }: AdPlaceholderProps) {
  const formatClasses = {
    horizontal: 'w-full min-h-[100px] sm:min-h-[120px] max-h-[140px]',
    rectangle: 'w-full max-w-[336px] min-h-[280px]',
    vertical: 'w-full max-w-[300px] min-h-[600px]',
  };

  return (
    <aside
      aria-label="Advertisement"
      className={`relative my-6 mx-auto flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/70 p-3 text-center text-xs text-slate-400 overflow-hidden ${formatClasses[format]} ${className}`}
    >
      <div className="flex items-center gap-1 mb-1">
        <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-400">
          Advertisement • AdSense Slot #{slotId}
        </span>
      </div>
      {/* Container reserved for AdSense Google Tag to prevent Cumulative Layout Shift */}
      <div className="w-full flex-1 flex items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white/60 text-slate-400 text-xs font-mono">
        <div className="text-center px-4">
          <p className="font-semibold text-slate-500">Sponsored Ad Space</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Responsive Google AdSense Display Unit</p>
        </div>
      </div>
    </aside>
  );
}
