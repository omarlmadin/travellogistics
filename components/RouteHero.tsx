import React from 'react';
import { Country, PlugCompatibilityResult, VisaRule } from '@/types';
import { Zap, Shield, Coins, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
  plug: PlugCompatibilityResult;
  visa: VisaRule;
}

export function RouteHero({ origin, destination, plug, visa }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <header className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-8 sm:px-10 sm:py-12 text-white shadow-xl">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-slate-900 to-indigo-900/30 pointer-events-none" />

      <div className="relative z-10">
        {/* Route Flags Pill */}
        <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md">
          <span className="text-2xl">{origin.flagEmoji}</span>
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">{origin.name}</span>
          <ArrowRight className="h-4 w-4 text-blue-400" />
          <span className="text-2xl">{destination.flagEmoji}</span>
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">{destination.name}</span>
        </div>

        {/* Dynamic H1 */}
        <h1 className="mt-5 text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Traveling from {origin.name} to {destination.name}
        </h1>

        <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
          Comprehensive origin-to-destination logistical checklist: Power plug types, electrical voltage compatibility, entry visa requirements, mobile eSIM data, and local payment rules for {currentYear}.
        </p>

        {/* Quick Highlights Grid */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-medium text-slate-200 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-amber-400" />
            <span>
              {plug.needsAdapter
                ? `Plug Adapter Needed (Type ${destination.plugTypes.join('/')})`
                : `Plugs Compatible (Type ${destination.plugTypes.join('/')})`}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-medium text-slate-200 backdrop-blur-sm">
            <Shield className="h-4 w-4 text-blue-400" />
            <span className="capitalize">{visa.category.replace('_', ' ')}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-medium text-slate-200 backdrop-blur-sm">
            <Coins className="h-4 w-4 text-emerald-400" />
            <span>{destination.currency.symbol} {destination.currency.code} ({destination.currency.name})</span>
          </div>
        </div>
      </div>
    </header>
  );
}
