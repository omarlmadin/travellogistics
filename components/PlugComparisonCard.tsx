import React from 'react';
import { Country } from '@/types';
import { calculatePlugCompatibility } from '@/lib/logistics';
import { Zap, AlertTriangle, CheckCircle2, ShoppingBag, Info } from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
}

export function PlugComparisonCard({ origin, destination }: Props) {
  const result = calculatePlugCompatibility(origin, destination);
  const amazonAffiliateLink = `https://www.amazon.com/s?k=universal+travel+adapter+for+${encodeURIComponent(destination.name)}&tag=travellogistics-20`;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/10">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Power Plugs & Voltage</h2>
              <p className="text-xs text-slate-500">Electrical sockets & voltage safety</p>
            </div>
          </div>

          {/* Status Badge */}
          {result.needsAdapter ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-600/20">
              <AlertTriangle className="h-3.5 w-3.5" />
              Adapter Needed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Directly Compatible
            </span>
          )}
        </div>

        {/* Comparison Grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
          {/* Origin Specs */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <span>{origin.flagEmoji}</span>
              <span>{origin.name} (Origin)</span>
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight text-slate-900">
              Type {origin.plugTypes.join(', ')}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">{origin.voltage}V</span>
              <span>•</span>
              <span>{origin.frequency}Hz</span>
            </div>
          </div>

          {/* Destination Specs */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700">
              <span>{destination.flagEmoji}</span>
              <span>{destination.name} (Destination)</span>
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight text-blue-950">
              Type {destination.plugTypes.join(', ')}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-blue-700">
              <span className="font-semibold text-blue-900">{destination.voltage}V</span>
              <span>•</span>
              <span>{destination.frequency}Hz</span>
            </div>
          </div>
        </div>

        {/* Practical Advice Summary */}
        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 text-xs text-slate-700">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
            <p className="leading-relaxed">{result.advice}</p>
          </div>
        </div>

        {/* Voltage Warning Notice */}
        {result.needsVoltageConverter && (
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <span>
                <strong>Voltage Alert:</strong> High-power heating devices (hair dryers, irons) designed solely for {origin.voltage}V may overheat or fail on {destination.voltage}V without a step-down converter.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Affiliate Action CTA */}
      <div className="mt-6 pt-2">
        <a
          href={amazonAffiliateLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
        >
          <ShoppingBag className="h-4 w-4 text-amber-400 transition group-hover:scale-110" />
          <span>Buy Universal Adapter for {destination.name} on Amazon</span>
        </a>
        <p className="mt-1.5 text-center text-[10px] text-slate-400">
          Prime delivery available • All-in-one worldwide compatibility
        </p>
      </div>
    </div>
  );
}
