import React from 'react';
import Link from 'next/link';
import { getAllCountries, getPopularRoutes } from '@/lib/logistics';
import { RouteSearchForm } from '@/components/RouteSearchForm';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { CountryFlag } from '@/components/CountryFlag';
import {
  Zap,
  ShieldCheck,
  Wifi,
  Coins,
  Globe2,
  ArrowRight,
  Sparkles,
  PlaneTakeoff,
  BadgeCheck,
} from 'lucide-react';

export default function HomePage() {
  const countries = getAllCountries();
  const popularRoutes = getPopularRoutes();

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 px-4 pt-16 pb-24 text-white sm:px-6 lg:px-8">
        {/* Background glow and subtle lighting */}
        <div className="absolute inset-0 bg-radial from-blue-600/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Verification Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/60 px-4 py-1.5 text-xs font-semibold text-sky-300 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span>Updated for 2026 • Real-Time Country-to-Country Travel Logistics</span>
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Never Get Stranded by <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Wrong Plugs or Visa Surprises
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Instant compatibility checks for electrical sockets (Type A to O), 110V vs 230V voltage safety, entry visa protocols, eSIM digital data, and local payment rules between any two countries.
          </p>

          {/* Interactive Route Search Form */}
          <RouteSearchForm countries={countries} />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Top Ad Unit */}
        <AdPlaceholder slotId="tl-home-top-1" format="horizontal" />

        {/* Feature Highlights Grid */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/20">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">Plug & Socket Types</h3>
            <p className="mt-1 text-xs text-slate-500">
              Side-by-side pin diagrams from Type A to O with adapter and voltage recommendations.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">Visa & Entry Status</h3>
            <p className="mt-1 text-xs text-slate-500">
              Verified 2026 entry rules: Visa-free, ETA / ETIAS, e-Visa online, or VoA requirements.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20">
              <Wifi className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">eSIM Mobile Data</h3>
            <p className="mt-1 text-xs text-slate-500">
              Instant digital QR data packages (Airalo & Holafly) to bypass mobile roaming fees.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-500/20">
              <Coins className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">Currency & Payment Rules</h3>
            <p className="mt-1 text-xs text-slate-500">
              Card acceptance levels, local tipping etiquette, and ATM currency conversion tips.
            </p>
          </div>
        </section>

        {/* Popular Routes Grid */}
        <section className="mt-14">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">Most Popular Travel Routes</h2>
              <p className="text-xs text-slate-500">Frequently searched origin-to-destination guides</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
              <PlaneTakeoff className="h-4 w-4" />
              <span>Direct Logistics</span>
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularRoutes.map(({ origin, destination, slug }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="group flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition hover:border-blue-400 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <CountryFlag code={origin.code} name={origin.name} emoji={origin.flagEmoji} size="sm" />
                    <span className="text-xs text-slate-400 font-light">➔</span>
                    <CountryFlag code={destination.code} name={destination.name} emoji={destination.flagEmoji} size="sm" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                      {origin.name} to {destination.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Type {destination.plugTypes.join(', ')} • {destination.voltage}V
                    </p>
                  </div>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition group-hover:bg-blue-600 group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Mid Page Ad */}
        <AdPlaceholder slotId="tl-home-mid-2" format="horizontal" />

        {/* Browse All Countries Index Mesh */}
        <section className="mt-14 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
              <Globe2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Browse Travel Logistics by Origin</h2>
              <p className="text-xs text-slate-500">Select your departure country to view destination guides</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/from-${country.slug}-to-japan`}
                className="flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 text-xs font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
              >
                <CountryFlag code={country.code} name={country.name} emoji={country.flagEmoji} size="sm" />
                <span className="truncate">From {country.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
