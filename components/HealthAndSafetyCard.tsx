import React from 'react';
import { Country } from '@/types';
import { Droplet, PhoneCall, Car, Phone, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
}

export function HealthAndSafetyCard({ origin, destination }: Props) {
  const drivingSideChanged = origin.drivingSide !== destination.drivingSide;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-500/10">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Health, Safety & Road Rules</h2>
          <p className="text-xs text-slate-500">Crucial everyday tips in {destination.name}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 text-xs">
        {/* Tap Water */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Tap Water</span>
            <Droplet className="h-4 w-4 text-sky-500" />
          </div>
          <div className="mt-2 flex items-center gap-1.5 font-bold">
            {destination.tapWaterDrinkable ? (
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Safe to Drink
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-700">
                <XCircle className="h-4 w-4 text-rose-600" />
                Bottled Only
              </span>
            )}
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {destination.tapWaterDrinkable
              ? 'Tap water meets high potable standards.'
              : 'Drink sealed bottled or filtered water.'}
          </p>
        </div>

        {/* Emergency Number */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Emergency</span>
            <PhoneCall className="h-4 w-4 text-rose-500" />
          </div>
          <div className="mt-2 text-lg font-extrabold text-slate-900">
            Dial {destination.emergencyNumber}
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Police, Medical & Fire services</p>
        </div>

        {/* Driving Side */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Driving Side</span>
            <Car className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-2 text-base font-bold capitalize text-slate-900">
            Drives on the {destination.drivingSide}
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {drivingSideChanged
              ? `⚠️ Opposite side compared to ${origin.name} (${origin.drivingSide})!`
              : `Same driving side as ${origin.name}.`}
          </p>
        </div>

        {/* Calling Code */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Country Code</span>
            <Phone className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-base font-bold text-slate-900">
            {destination.callingCode}
          </div>
          <p className="mt-1 text-[11px] text-slate-500">International dialing prefix</p>
        </div>
      </div>
    </div>
  );
}
