'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Country } from '@/types';
import { Plane, ArrowRight, ArrowLeftRight, Sparkles, MapPin } from 'lucide-react';

interface Props {
  countries: Country[];
}

export function RouteSearchForm({ countries }: Props) {
  const router = useRouter();
  const [origin, setOrigin] = useState('united-states');
  const [destination, setDestination] = useState('japan');

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin && destination && origin !== destination) {
      router.push(`/from-${origin}-to-${destination}`);
    }
  };

  const quickPicks = [
    { origin: 'united-states', dest: 'japan', label: '🇺🇸 US ➔ 🇯🇵 Japan' },
    { origin: 'united-states', dest: 'united-kingdom', label: '🇺🇸 US ➔ 🇬🇧 UK' },
    { origin: 'united-kingdom', dest: 'thailand', label: '🇬🇧 UK ➔ 🇹🇭 Thailand' },
    { origin: 'australia', dest: 'japan', label: '🇦🇺 AU ➔ 🇯🇵 Japan' },
    { origin: 'germany', dest: 'united-states', label: '🇩🇪 Germany ➔ 🇺🇸 US' },
  ];

  return (
    <div className="mx-auto mt-8 max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-3xl border border-white/25 bg-white/95 p-4 sm:p-7 shadow-2xl backdrop-blur-xl transition-all duration-300 text-slate-900"
      >
        <div className="grid gap-3 sm:grid-cols-[1fr,auto,1fr] sm:items-center">
          {/* Origin Selector */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="origin-select"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-500" />
              <span>Departing From (Origin)</span>
            </label>
            <div className="relative group">
              <select
                id="origin-select"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-slate-50/80 px-4 py-3.5 text-sm font-bold text-slate-900 transition-all duration-200 hover:border-blue-300 focus:border-blue-600 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-blue-500/15"
              >
                {countries.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.flagEmoji} {c.name} ({c.nationality})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                ▼
              </div>
            </div>
          </div>

          {/* Swap Button with 180° Spin Animation on Hover */}
          <div className="flex justify-center pt-2 sm:pt-5">
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap origin and destination"
              className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
            >
              <ArrowLeftRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
          </div>

          {/* Destination Selector */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="destination-select"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              <span className="flex h-2 w-2 rounded-full bg-sky-500" />
              <span>Traveling To (Destination)</span>
            </label>
            <div className="relative group">
              <select
                id="destination-select"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-slate-50/80 px-4 py-3.5 text-sm font-bold text-slate-900 transition-all duration-200 hover:border-blue-300 focus:border-blue-600 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-blue-500/15"
              >
                {countries.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.flagEmoji} {c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button with Gradient & Micro-Animation */}
        <div className="mt-5">
          <button
            type="submit"
            disabled={origin === destination}
            className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/35 hover:scale-[1.008] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plane className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            <span>Check Plugs, Voltage & Visa Requirements</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          {origin === destination && (
            <p className="mt-2 text-center text-xs font-semibold text-rose-500">
              Please select two different countries to compare.
            </p>
          )}
        </div>
      </form>

      {/* Quick Select Route Pills */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-semibold text-slate-400">Trending Routes:</span>
        {quickPicks.map((pick) => (
          <button
            key={`${pick.origin}-${pick.dest}`}
            type="button"
            onClick={() => {
              setOrigin(pick.origin);
              setDestination(pick.dest);
            }}
            className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:border-white/40 hover:scale-105 active:scale-95"
          >
            <span>{pick.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
