import React from 'react';
import { Country } from '@/types';
import { Wifi, Smartphone, Check, ExternalLink, Sparkles, Shield } from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
}

export function EsimAffiliateCard({ origin, destination }: Props) {
  const airaloAffiliateLink = `https://airalo.tp.st/travellogistics?country=${encodeURIComponent(
    destination.slug
  )}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm shadow-emerald-500/20">
            <Wifi className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Mobile Internet & eSIM in {destination.name}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                <Sparkles className="h-3 w-3" />
                Recommended
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Avoid high roaming charges from {origin.name} mobile carriers
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-500">Starting from</span>
          <div className="text-xl font-extrabold text-emerald-700">$4.50 <span className="text-xs font-normal text-slate-500">/ 1GB</span></div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-white p-3 shadow-2xs">
          <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold text-slate-800">Keep Original Number</p>
            <p className="text-slate-500 mt-0.5">Maintain SMS bank 2FA & WhatsApp active</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-white p-3 shadow-2xs">
          <Smartphone className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold text-slate-800">Instant QR Activation</p>
            <p className="text-slate-500 mt-0.5">Install digitally before departure, connect on landing</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-white p-3 shadow-2xs">
          <Shield className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold text-slate-800">Local 4G/5G Speeds</p>
            <p className="text-slate-500 mt-0.5">Direct tier-1 local network roaming</p>
          </div>
        </div>
      </div>

      {/* Affiliate CTA */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-emerald-100/60">
        <p className="text-xs text-slate-500">
          Compatible with iPhone XS+, Google Pixel 3+, Samsung Galaxy S20+ and newer models.
        </p>
        <a
          href={airaloAffiliateLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99] shrink-0"
        >
          <span>Get {destination.name} eSIM on Airalo</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
