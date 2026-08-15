import React from 'react';
import { Country } from '@/types';
import { CountryFlag } from './CountryFlag';
import {
  Droplet,
  PhoneCall,
  Car,
  Phone,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
}

export function HealthAndSafetyCard({ origin, destination }: Props) {
  const drivingSideChanged = origin.drivingSide !== destination.drivingSide;

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 ring-1 ring-teal-500/20">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Health, Safety & Road Rules</h2>
              <p className="text-xs text-slate-500">
                Essential emergency & drinking water advice for {destination.name}
              </p>
            </div>
          </div>

          <CountryFlag code={destination.code} name={destination.name} emoji={destination.flagEmoji} size="sm" />
        </div>

        {/* 2x2 Logistics Bento Grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
          {/* Tap Water */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Tap Water
                </span>
                <Droplet className="h-4 w-4 text-sky-500" />
              </div>
              <div className="mt-2 font-black">
                {destination.tapWaterDrinkable ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Potable & Safe
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-700">
                    <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                    Bottled Only
                  </span>
                )}
              </div>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 leading-snug">
              {destination.tapWaterDrinkable
                ? 'Meets rigorous international potability standards.'
                : 'Drink purified sealed bottled water only.'}
            </p>
          </div>

          {/* Emergency Number */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Emergency
                </span>
                <PhoneCall className="h-4 w-4 text-rose-500" />
              </div>
              <div className="mt-2 text-xl font-black text-slate-900">
                Dial {destination.emergencyNumber}
              </div>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 leading-snug">
              Police, ambulance & fire rescue services.
            </p>
          </div>

          {/* Driving Side */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Driving Side
                </span>
                <Car className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="mt-2 text-base font-black capitalize text-slate-900">
                {destination.drivingSide} Side
              </div>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 leading-snug">
              {drivingSideChanged
                ? `⚠️ Opposite side compared to ${origin.name} (${origin.drivingSide})!`
                : `Same side as ${origin.name}.`}
            </p>
          </div>

          {/* Calling Code */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Calling Code
                </span>
                <Phone className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="mt-2 text-base font-black text-slate-900">
                {destination.callingCode}
              </div>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 leading-snug">
              Prefix for international telephone calls.
            </p>
          </div>
        </div>
      </div>

      {drivingSideChanged && (
        <div className="mt-4 rounded-2xl bg-amber-50/80 p-3 text-[11px] text-amber-900 border border-amber-200">
          <span className="flex items-center gap-1.5 font-bold">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            Road Safety Notice:
          </span>
          <p className="mt-0.5 text-amber-800">
            Remember that traffic moves on the <strong>{destination.drivingSide.toUpperCase()}</strong> in {destination.name}. Look both ways before crossing pedestrian walkways.
          </p>
        </div>
      )}
    </div>
  );
}
