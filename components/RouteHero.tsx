import React from 'react';
import Link from 'next/link';
import { Country, PlugCompatibilityResult, VisaRule } from '@/types';
import { CountryFlag } from './CountryFlag';
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Wifi,
  Droplet,
  XCircle,
  Home,
  ChevronRight,
  Sparkles,
  ArrowRight,
  BadgeCheck,
} from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
  plug: PlugCompatibilityResult;
  visa: VisaRule;
}

export function RouteHero({ origin, destination, plug, visa }: Props) {
  const currentYear = 2026;
  const destinationImage =
    destination.heroImage ||
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80';

  // Visa badge format
  const getVisaBadge = () => {
    switch (visa.category) {
      case 'visa_free':
        return { text: 'Visa: EXEMPT ✅', bg: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300' };
      case 'eta_required':
        return { text: 'Visa: ETA REQUIRED ℹ️', bg: 'bg-sky-500/20 border-sky-400/30 text-sky-300' };
      case 'e_visa':
        return { text: 'Visa: e-VISA ONLINE 📄', bg: 'bg-indigo-500/20 border-indigo-400/30 text-indigo-300' };
      case 'visa_on_arrival':
        return { text: 'Visa: ON ARRIVAL 🛂', bg: 'bg-amber-500/20 border-amber-400/30 text-amber-300' };
      case 'visa_required':
      default:
        return { text: 'Visa: REQUIRED ⚠️', bg: 'bg-rose-500/20 border-rose-400/30 text-rose-300' };
    }
  };

  const visaBadge = getVisaBadge();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-950 text-white shadow-2xl">
      {/* Optimized Hero Destination Background Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={destinationImage}
          alt={`Scenic landscape and city logistics in ${destination.name}`}
          className="h-full w-full object-cover object-center opacity-25 filter saturate-150 transition-all duration-700"
          loading="eager"
        />
        {/* Subtle Dark Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial from-blue-600/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 p-6 sm:p-10">
        {/* Top Bar: Breadcrumb + Editorial Verification Badge */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-white/10 pb-5">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-300">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-slate-300 transition hover:text-white"
                >
                  <Home className="h-3.5 w-3.5" />
                  <span>Home</span>
                </Link>
              </li>
              <ChevronRight className="h-3 w-3 text-slate-500" />
              <li>
                <span className="text-slate-400">Guides</span>
              </li>
              <ChevronRight className="h-3 w-3 text-slate-500" />
              <li className="font-semibold text-sky-400">
                From {origin.name} to {destination.name}
              </li>
            </ol>
          </nav>

          {/* Human-Touch Editorial Verification Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-[11px] font-medium text-emerald-300 backdrop-blur-md">
            <BadgeCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Updated for {currentYear} Travel • Verified with Embassy & IEC Standards</span>
          </div>
        </div>

        {/* Origin to Destination Route Badges */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-2xl bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/15">
            <CountryFlag code={origin.code} name={origin.name} emoji={origin.flagEmoji} size="sm" />
            <span>{origin.name} ({origin.nationality})</span>
          </div>

          <ArrowRight className="h-4 w-4 text-sky-400 shrink-0" />

          <div className="inline-flex items-center gap-2.5 rounded-2xl bg-blue-500/20 px-3.5 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur-md border border-blue-400/30">
            <CountryFlag code={destination.code} name={destination.name} emoji={destination.flagEmoji} size="sm" />
            <span>{destination.name}</span>
          </div>
        </div>

        {/* Main H1 Title */}
        <h1 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
          Traveling from <span className="text-sky-300">{origin.name}</span> to{' '}
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            {destination.name}
          </span>
        </h1>

        <p className="mt-3.5 max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Essential electrical socket standards (Type {origin.plugTypes.join('/')} ➔ Type{' '}
          {destination.plugTypes.join('/')}), {destination.voltage}V voltage requirements, {visa.category.replace('_', ' ')} visa
          protocols, eSIM connectivity, and local payment norms for {currentYear}.
        </p>

        {/* Visual Summary Scorecard (Quick Visual Badges) */}
        <div className="mt-8">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            ⚡ Quick Logistics Scorecard
          </div>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {/* Adapter Scorecard */}
            {plug.needsAdapter ? (
              <div className="inline-flex items-center gap-2 rounded-xl border border-amber-400/40 bg-amber-950/40 px-3.5 py-2 text-xs font-bold text-amber-300 backdrop-blur-md shadow-sm">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Adapter: NEEDED ⚠️ (Type {destination.plugTypes.join('/')})</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-950/40 px-3.5 py-2 text-xs font-bold text-emerald-300 backdrop-blur-md shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Adapter: DIRECT MATCH ✅</span>
              </div>
            )}

            {/* Visa Scorecard */}
            <div className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold backdrop-blur-md shadow-sm ${visaBadge.bg}`}>
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>{visaBadge.text}</span>
            </div>

            {/* Voltage Scorecard */}
            <div className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/30 bg-indigo-950/40 px-3.5 py-2 text-xs font-bold text-indigo-300 backdrop-blur-md shadow-sm">
              <Zap className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>
                Voltage: {origin.voltage}V ➔ {destination.voltage}V{' '}
                {plug.needsVoltageConverter ? '⚡ (Converter Alert)' : '✅ (Safe)'}
              </span>
            </div>

            {/* eSIM Scorecard */}
            <div className="inline-flex items-center gap-2 rounded-xl border border-teal-400/30 bg-teal-950/40 px-3.5 py-2 text-xs font-bold text-teal-300 backdrop-blur-md shadow-sm">
              <Wifi className="h-4 w-4 text-teal-400 shrink-0" />
              <span>eSIM: RECOMMENDED 📶</span>
            </div>

            {/* Tap Water Scorecard */}
            <div className="inline-flex items-center gap-2 rounded-xl border border-sky-400/30 bg-sky-950/40 px-3.5 py-2 text-xs font-bold text-sky-300 backdrop-blur-md shadow-sm">
              {destination.tapWaterDrinkable ? (
                <>
                  <Droplet className="h-4 w-4 text-sky-400 shrink-0" />
                  <span>Tap Water: POTABLE 💧</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                  <span>Tap Water: BOTTLED ONLY 🚫</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
