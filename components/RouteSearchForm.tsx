'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Country } from '@/types';
import { Plane, ArrowRight, ArrowLeftRight } from 'lucide-react';

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

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-3xl rounded-3xl border border-slate-200/80 bg-white/95 p-4 sm:p-6 shadow-xl backdrop-blur-md text-slate-900"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr,auto,1fr] sm:items-center">
        {/* Origin Selector */}
        <div className="space-y-1 text-left">
          <label htmlFor="origin-select" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Departing From (Origin)
          </label>
          <div className="relative">
            <select
              id="origin-select"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              {countries.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.flagEmoji} {c.name} ({c.nationality})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center pt-2 sm:pt-4">
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap origin and destination"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>

        {/* Destination Selector */}
        <div className="space-y-1 text-left">
          <label htmlFor="destination-select" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Traveling To (Destination)
          </label>
          <div className="relative">
            <select
              id="destination-select"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              {countries.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.flagEmoji} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-5">
        <button
          type="submit"
          disabled={origin === destination}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Plane className="h-4 w-4" />
          <span>Compare Logistics & Entry Requirements</span>
          <ArrowRight className="h-4 w-4" />
        </button>
        {origin === destination && (
          <p className="mt-2 text-center text-xs text-rose-500 font-medium">
            Please select two different countries to compare.
          </p>
        )}
      </div>
    </form>
  );
}
