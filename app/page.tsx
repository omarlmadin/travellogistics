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
  CheckCircle2,
  Compass,
  Layers,
  Activity,
  Flame,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export default function HomePage() {
  const countries = getAllCountries();
  const popularRoutes = getPopularRoutes();

  // Featured destinations for visual gallery showcase
  const spotlightDestinations = [
    {
      name: 'Japan',
      slug: 'japan',
      code: 'JP',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=75&fm=webp',
      tag: '100V Type A/B',
      visa: 'Visa-Free (90 Days)',
    },
    {
      name: 'United Kingdom',
      slug: 'united-kingdom',
      code: 'GB',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=75&fm=webp',
      tag: '230V Type G',
      visa: 'ETA Required',
    },
    {
      name: 'France',
      slug: 'france',
      code: 'FR',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=75&fm=webp',
      tag: '230V Type C/E',
      visa: 'Schengen Area',
    },
    {
      name: 'Thailand',
      slug: 'thailand',
      code: 'TH',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=75&fm=webp',
      tag: '220V Type A/B/C/O',
      visa: 'Visa-Free (60 Days)',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/70 pb-24 selection:bg-blue-600 selection:text-white">
      {/* 1. Hero Section with Travel Photography, Ambient Lighting & Animations */}
      <section className="relative overflow-hidden bg-slate-950 px-4 pt-20 pb-28 text-white sm:px-6 lg:px-8">
        {/* Hero Travel Photography Background Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=75&fm=webp"
            alt="International travel logistics, airplane flights and worldwide destination landmarks"
            className="h-full w-full object-cover object-center opacity-25 filter saturate-150 scale-105 transition-transform duration-1000"
            loading="eager"
            fetchPriority="high"
          />
          {/* Multi-layered Dark Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/50" />
          {/* Animated Ambient Glowing Orbs */}
          <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse-glow pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl animate-pulse-glow pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Animated Verification Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/70 px-4 py-1.5 text-xs font-semibold text-sky-300 backdrop-blur-xl shadow-lg shadow-sky-950/50 transition hover:border-sky-400/60 hover:scale-105">
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span>Updated for 2026 Travel • Embassy & IEC Power Standards</span>
          </div>

          {/* Main Headline (Single H1) */}
          <h1 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
            Never Get Stranded by <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
              Wrong Plugs or Visa Surprises
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Instant compatibility checks for electrical sockets (Types A to O), 110V vs 230V voltage safety, entry visa rules, mobile eSIM data, and local currency rules between any two countries.
          </p>

          {/* Interactive Search Component */}
          <RouteSearchForm countries={countries} />
        </div>
      </section>

      {/* 2. Key Trust Metrics & Stats Strip */}
      <section className="relative z-20 -mt-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-3xl border border-slate-200/80 bg-white/95 p-4 sm:p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
              <Globe2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900">380+</div>
              <div className="text-[11px] font-medium text-slate-500">Verified Travel Routes</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/20">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900">Type A – O</div>
              <div className="text-[11px] font-medium text-slate-500">Socket Pin Graphics</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900">2026 Verified</div>
              <div className="text-[11px] font-medium text-slate-500">Embassy Entry Rules</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-500/20">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900">100/100</div>
              <div className="text-[11px] font-medium text-slate-500">PageSpeed Performance</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Top Ad Unit */}
        <AdPlaceholder slotId="tl-home-top-1" format="horizontal" />

        {/* 3. Core Capabilities Section */}
        <section className="mt-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Essential International Travel Logistics Solved
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Four critical logistical checkpoints before boarding international flights worldwide
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1: Plugs & Sockets */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/20 transition-transform duration-300 group-hover:scale-110">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Plugs & Voltage Standards</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Compare side-by-side pin diagrams across Types A through O. Identify 110V vs 230V voltage gaps to protect single-voltage heating appliances.
              </p>
            </div>

            {/* Feature 2: Visa Requirements */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Visa & Entry Regulations</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Verified consular protocols: Visa-Free exemptions, ETA / ETIAS authorizations, online e-Visas, or Visas on Arrival with stay limits.
              </p>
            </div>

            {/* Feature 3: eSIM Data */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20 transition-transform duration-300 group-hover:scale-110">
                <Wifi className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">eSIM Mobile Connectivity</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Pre-install digital travel eSIMs to access instant local 4G/5G data while keeping your domestic SIM line active for banking 2FA SMS.
              </p>
            </div>

            {/* Feature 4: Currency & Health */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-500/20 transition-transform duration-300 group-hover:scale-110">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Money, Road & Tap Water</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Local tipping customs, avoiding Dynamic Currency Conversion (DCC) markups, potable tap water standards, and emergency dispatch numbers.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Global Standards & Practical Guide Overview */}
        <section className="mt-14 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Global Travel Standards & Logistics Reference
              </h2>
              <p className="text-xs text-slate-500">
                Authoritative guidelines for international plug types, voltage safety, and border crossings
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600">
            <p>
              Navigating international travel requires understanding key regional standards. According to the{' '}
              <a
                href="https://www.iec.ch/world-plugs"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 underline hover:text-blue-800 transition"
              >
                IEC World Plugs and Sockets Standard
              </a>
              , there are 15 distinct electrical plug types categorized from Type A to Type O. North America primarily uses 120V Type A and B plugs, the United Kingdom utilizes 230V Type G three-pin prongs, mainland Europe relies on Type C, E, and F sockets, and Australia operates on angled Type I prongs.
            </p>

            <p>
              Before traveling, always verify whether your high-draw appliances (such as hair dryers, curling wands, and irons) are dual-voltage rated (100–240V). Most modern laptops, tablets, and smartphones support universal voltage out of the box, requiring only a mechanical plug adapter rather than a heavy voltage transformer.
            </p>
          </div>
        </section>

        {/* 5. Visual Spotlight Destinations Gallery */}
        <section className="mt-14">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                Featured Global Travel Hubs
              </h2>
              <p className="text-xs text-slate-500">Explore full logistics guides for top destination countries</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {spotlightDestinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/from-united-states-to-${dest.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`${dest.name} travel logistics and sightseeing`}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width={400}
                    height={240}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <CountryFlag code={dest.code} name={dest.name} size="sm" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-base font-black text-white">{dest.name}</div>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-300">
                      <span className="rounded-md bg-white/20 px-1.5 py-0.5 backdrop-blur-md">
                        {dest.tag}
                      </span>
                      <span>{dest.visa}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. Most Popular Routes Section */}
        <section className="mt-14">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Flame className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">Trending Travel Routes</h2>
                <p className="text-xs text-slate-500">Most frequently searched country-to-country checklists</p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <PlaneTakeoff className="h-4 w-4" />
              <span>Direct Fast Check</span>
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularRoutes.map(({ origin, destination, slug }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="group flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-all duration-300 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <CountryFlag code={origin.code} name={origin.name} emoji={origin.flagEmoji} size="sm" />
                    <span className="text-xs text-slate-400 font-light">➔</span>
                    <CountryFlag code={destination.code} name={destination.name} emoji={destination.flagEmoji} size="sm" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {origin.name} to {destination.name}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Type {destination.plugTypes.join(', ')} • {destination.voltage}V
                    </p>
                  </div>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Mid Page Ad Unit */}
        <AdPlaceholder slotId="tl-home-mid-2" format="horizontal" />

        {/* 7. Browse All Countries Index Mesh */}
        <section className="mt-14 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
              <Globe2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Browse Travel Logistics by Departure Country</h2>
              <p className="text-xs text-slate-500">
                Select your origin country to see verified guides for all global destinations
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/from-${country.slug}-to-japan`}
                className="group flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 hover:scale-[1.02]"
              >
                <CountryFlag code={country.code} name={country.name} emoji={country.flagEmoji} size="sm" />
                <span className="truncate">From {country.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
