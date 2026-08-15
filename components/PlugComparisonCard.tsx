import React from 'react';
import { Country } from '@/types';
import { calculatePlugCompatibility } from '@/lib/logistics';
import { PlugGraphic } from './PlugGraphic';
import { CountryFlag } from './CountryFlag';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  ShoppingBag,
  Info,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
}

export function PlugComparisonCard({ origin, destination }: Props) {
  const result = calculatePlugCompatibility(origin, destination);
  const amazonAffiliateLink = `https://www.amazon.com/s?k=universal+travel+adapter+for+${encodeURIComponent(
    destination.name
  )}&tag=travellogistics-20`;

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div>
        {/* Header with Badges */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/20">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Power Plug & Voltage Compatibility</h2>
              <p className="text-xs text-slate-500">Wall sockets, frequency & voltage conversion</p>
            </div>
          </div>

          {/* Conditional Compatibility Status Badge */}
          {result.needsAdapter ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 ring-1 ring-rose-600/20">
              <AlertTriangle className="h-3.5 w-3.5" />
              Adapter Needed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-600/20">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Directly Compatible
            </span>
          )}
        </div>

        {/* Side-by-Side Visual Plug & Socket Cards */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Origin Card */}
          <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CountryFlag code={origin.code} name={origin.name} emoji={origin.flagEmoji} size="sm" />
                <span>{origin.name} (Origin)</span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                Your Plugs
              </span>
            </div>

            {/* Visual Pin Diagram Graphics */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {origin.plugTypes.map((type) => (
                <PlugGraphic key={type} type={type} size={48} />
              ))}
            </div>

            {/* Voltage & Frequency Indicator Bar */}
            <div className="mt-3.5 flex items-center justify-between border-t border-slate-200/60 pt-2.5 text-xs text-slate-600">
              <span className="font-bold text-slate-900">{origin.voltage} Volts</span>
              <span className="text-slate-400">•</span>
              <span className="font-semibold text-slate-700">{origin.frequency} Hz</span>
            </div>
          </div>

          {/* Destination Card */}
          <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
                <CountryFlag code={destination.code} name={destination.name} emoji={destination.flagEmoji} size="sm" />
                <span>{destination.name} (Destination)</span>
              </div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                Outlets
              </span>
            </div>

            {/* Visual Pin Diagram Graphics */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {destination.plugTypes.map((type) => (
                <PlugGraphic key={type} type={type} size={48} className="border-blue-200" />
              ))}
            </div>

            {/* Voltage & Frequency Indicator Bar */}
            <div className="mt-3.5 flex items-center justify-between border-t border-blue-100 pt-2.5 text-xs text-blue-900">
              <span className="font-bold text-blue-950">{destination.voltage} Volts</span>
              <span className="text-blue-300">•</span>
              <span className="font-semibold text-blue-900">{destination.frequency} Hz</span>
            </div>
          </div>
        </div>

        {/* Dynamic Contextual Advisory Blocks */}
        {result.needsAdapter ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-xs text-amber-950">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900">
                  Physical Plug Incompatibility Detected
                </p>
                <p className="mt-0.5 leading-relaxed text-amber-800">
                  {origin.name} plugs (Type {origin.plugTypes.join('/')}) will not fit into {destination.name}&apos;s wall sockets (Type {destination.plugTypes.join('/')}). A universal travel adapter is mandatory.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs text-emerald-950">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900">Direct Plug Fit Confirmed</p>
                <p className="mt-0.5 leading-relaxed text-emerald-800">
                  Both countries support Type {result.sharedPlugs.join('/')} sockets. Your appliances will physically plug in without an adapter.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Voltage Warning Alert */}
        {result.needsVoltageConverter && (
          <div className="mt-3 rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-xs text-rose-950">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <div>
                <p className="font-bold text-rose-900">
                  Voltage Gap Alert ({origin.voltage}V vs {destination.voltage}V)
                </p>
                <p className="mt-0.5 leading-relaxed text-rose-800">
                  Smartphones, tablets, and laptops are universal (100–240V dual-voltage). However, high-draw single-voltage appliances (hair dryers, hair straighteners, kettles) may overheat and fail without a voltage converter.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Strategic High-Converting Monetization CTA */}
      <div className="mt-6 pt-3 border-t border-slate-100">
        <a
          href={amazonAffiliateLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-slate-900/10 transition hover:bg-slate-800 active:scale-[0.99]"
        >
          <ShoppingBag className="h-4 w-4 text-amber-400 transition group-hover:scale-110" />
          <span>Buy All-in-One Adapter for {destination.name} on Amazon</span>
          <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1" />
        </a>
        <p className="mt-1.5 text-center text-[10px] text-slate-400">
          Fast Prime delivery • Over 150+ country compatibility with built-in USB-C fast charging
        </p>
      </div>
    </div>
  );
}
