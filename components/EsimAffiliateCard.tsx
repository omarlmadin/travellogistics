import React from 'react';
import { Country } from '@/types';
import { CountryFlag } from './CountryFlag';
import {
  Wifi,
  Smartphone,
  Check,
  ExternalLink,
  Sparkles,
  Shield,
  Zap,
  Globe,
  ArrowUpRight,
} from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
}

export function EsimAffiliateCard({ origin, destination }: Props) {
  const airaloAffiliateLink = `https://airalo.tp.st/travellogistics?country=${encodeURIComponent(
    destination.slug
  )}`;
  const holaflyAffiliateLink = `https://holafly.tp.st/travellogistics?country=${encodeURIComponent(
    destination.slug
  )}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40 p-6 sm:p-8 shadow-sm">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100/70 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
            <Wifi className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                eSIM Mobile Internet in {destination.name}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                <Sparkles className="h-3 w-3" />
                Zero Roaming Fees
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Instantly connect to tier-1 {destination.name} 4G/5G networks while keeping your {origin.name} SIM active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CountryFlag code={destination.code} name={destination.name} emoji={destination.flagEmoji} size="md" />
          <span className="text-xs font-semibold text-slate-700">{destination.name} Digital eSIM</span>
        </div>
      </div>

      {/* Provider Pricing & Comparison Badges */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* Provider 1: Airalo (Best for Standard Data Packages) */}
        <div className="flex flex-col justify-between rounded-2xl border border-emerald-200 bg-white p-5 shadow-2xs transition hover:border-emerald-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
                  AIRALO
                </span>
                <span className="text-xs text-slate-500 font-medium">Standard Data Plans</span>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                Best Value
              </span>
            </div>

            <div className="mt-3 text-2xl font-black text-slate-900">
              From $4.50 <span className="text-xs font-normal text-slate-500">/ 1 GB – 30 Days</span>
            </div>

            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Keep original {origin.name} SIM active for WhatsApp & 2FA banking SMS</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Instant QR code scan installation in 60 seconds</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Flexible packages: 1GB, 3GB, 5GB, 10GB, 20GB</span>
              </li>
            </ul>
          </div>

          <a
            href={airaloAffiliateLink}
            target="_blank"
            rel="sponsored noopener"
            className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
          >
            <span>View Airalo Plans for {destination.name}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Provider 2: Holafly (Best for Unlimited Data) */}
        <div className="flex flex-col justify-between rounded-2xl border border-teal-200 bg-white p-5 shadow-2xs transition hover:border-teal-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-teal-50 px-2 py-1 text-xs font-black text-teal-700">
                  HOLAFLY
                </span>
                <span className="text-xs text-slate-500 font-medium">Unlimited Data</span>
              </div>
              <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-700">
                Heavy Users
              </span>
            </div>

            <div className="mt-3 text-2xl font-black text-slate-900">
              From $19.00 <span className="text-xs font-normal text-slate-500">/ Unlimited Data</span>
            </div>

            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                <span>100% Unlimited high-speed data without speed caps</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                <span>Custom duration selection from 1 to 90 days</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                <span>24/7 multilingual customer support via WhatsApp</span>
              </li>
            </ul>
          </div>

          <a
            href={holaflyAffiliateLink}
            target="_blank"
            rel="sponsored noopener"
            className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
          >
            <span>View Holafly Unlimited {destination.name} eSIM</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Compatibility Notice Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-emerald-100/70 pt-3 text-[11px] text-slate-500">
        <span>Supported: iPhone XS & newer, Google Pixel 3+, Samsung S20+ and major eSIM smartphones</span>
        <span className="font-semibold text-emerald-700">No physical SIM swapping required</span>
      </div>
    </div>
  );
}
