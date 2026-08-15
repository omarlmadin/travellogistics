import React from 'react';
import { Country } from '@/types';
import { getAllCountries } from '@/lib/logistics';
import { CountryFlag } from './CountryFlag';
import Link from 'next/link';
import { Globe, ArrowRight } from 'lucide-react';

interface Props {
  currentOrigin: Country;
  currentDestination: Country;
}

export function InternalLinksMesh({ currentOrigin, currentDestination }: Props) {
  const allCountries = getAllCountries();

  const otherDestinations = allCountries
    .filter((c) => c.slug !== currentOrigin.slug && c.slug !== currentDestination.slug)
    .slice(0, 8);

  const otherOrigins = allCountries
    .filter((c) => c.slug !== currentOrigin.slug && c.slug !== currentDestination.slug)
    .slice(0, 8);

  return (
    <section className="mt-12 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
          <Globe className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Explore Connected Travel Routes</h3>
          <p className="text-xs text-slate-500">
            Logistical guides and plug compatibility for connected travel itineraries
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {/* Hub 1: More Destinations from Origin */}
        <div className="rounded-2xl bg-slate-50/70 p-5 border border-slate-100">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <CountryFlag code={currentOrigin.code} name={currentOrigin.name} emoji={currentOrigin.flagEmoji} size="sm" />
            <span>More destinations for {currentOrigin.nationality} travelers</span>
          </h4>
          <ul className="mt-4 divide-y divide-slate-100 text-xs">
            {otherDestinations.map((dest) => (
              <li key={dest.slug} className="py-2.5 first:pt-0 last:pb-0">
                <Link
                  href={`/from-${currentOrigin.slug}-to-${dest.slug}`}
                  className="group flex items-center justify-between font-medium text-slate-700 transition hover:text-blue-600"
                >
                  <span className="flex items-center gap-2">
                    <span>{currentOrigin.name}</span>
                    <span className="text-slate-400">➔</span>
                    <CountryFlag code={dest.code} name={dest.name} emoji={dest.flagEmoji} size="sm" />
                    <span>{dest.name}</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 opacity-0 transition group-hover:opacity-100 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hub 2: Traveling to Destination from other Origins */}
        <div className="rounded-2xl bg-slate-50/70 p-5 border border-slate-100">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <CountryFlag code={currentDestination.code} name={currentDestination.name} emoji={currentDestination.flagEmoji} size="sm" />
            <span>Traveling to {currentDestination.name} from other countries</span>
          </h4>
          <ul className="mt-4 divide-y divide-slate-100 text-xs">
            {otherOrigins.map((orig) => (
              <li key={orig.slug} className="py-2.5 first:pt-0 last:pb-0">
                <Link
                  href={`/from-${orig.slug}-to-${currentDestination.slug}`}
                  className="group flex items-center justify-between font-medium text-slate-700 transition hover:text-blue-600"
                >
                  <span className="flex items-center gap-2">
                    <CountryFlag code={orig.code} name={orig.name} emoji={orig.flagEmoji} size="sm" />
                    <span>{orig.name}</span>
                    <span className="text-slate-400">➔</span>
                    <span>{currentDestination.name}</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 opacity-0 transition group-hover:opacity-100 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
