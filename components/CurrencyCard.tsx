import React from 'react';
import { Country } from '@/types';
import { CountryFlag } from './CountryFlag';
import { Coins, CreditCard, Banknote, Info, DollarSign, Wallet } from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
}

export function CurrencyCard({ origin, destination }: Props) {
  const cardAcceptanceLabels: Record<string, { label: string; color: string; desc: string }> = {
    very_high: {
      label: 'Nearly 100% Cashless (Very High)',
      color: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
      desc: 'Credit/debit cards and mobile payments (Apple Pay, Google Pay) are accepted nearly everywhere.',
    },
    high: {
      label: 'Card Friendly (High Acceptance)',
      color: 'bg-blue-50 text-blue-700 ring-blue-600/20',
      desc: 'Cards accepted for most restaurants and hotels. Carry small cash for local street vendors.',
    },
    moderate: {
      label: 'Mixed Cash & Card Economy',
      color: 'bg-amber-50 text-amber-700 ring-amber-600/20',
      desc: 'Major shops accept card, but street markets, taxis, and small eateries require physical cash.',
    },
    cash_preferred: {
      label: 'Cash Heavily Preferred',
      color: 'bg-rose-50 text-rose-700 ring-rose-600/20',
      desc: 'Cash is the primary method of payment. ATMs in major centers; carry local banknotes.',
    },
  };

  const cardStatus =
    cardAcceptanceLabels[destination.cardAcceptance] || cardAcceptanceLabels.high;

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-500/20">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">Currency & Payment Rules</div>
              <p className="text-xs text-slate-500">
                Official money & payment culture in {destination.name}
              </p>
            </div>
          </div>

          <CountryFlag code={destination.code} name={destination.name} emoji={destination.flagEmoji} size="sm" />
        </div>

        {/* Currency Details */}
        <div className="mt-5 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Destination Currency
              </span>
              <div className="mt-1 text-xl font-black text-slate-900">
                {destination.currency.code} ({destination.currency.symbol})
              </div>
              <p className="text-xs text-slate-600 truncate">{destination.currency.name}</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Origin Currency
              </span>
              <div className="mt-1 text-xl font-black text-slate-700">
                {origin.currency.code} ({origin.currency.symbol})
              </div>
              <p className="text-xs text-slate-500 truncate">{origin.currency.name}</p>
            </div>
          </div>

          {/* Card Acceptance */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-violet-600" />
                <span className="text-xs font-bold text-slate-800">Card Acceptance</span>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ring-1 ${cardStatus.color}`}
              >
                {cardStatus.label}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">{cardStatus.desc}</p>
          </div>

          {/* Tipping Culture */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Wallet className="h-4 w-4 text-emerald-600" />
              <span>Tipping Etiquette</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              {destination.tippingCulture}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-violet-50/60 p-3 text-[11px] text-violet-900 border border-violet-100">
        <span>
          💡 <strong>Tip:</strong> Always choose to be billed in local destination currency (<strong>{destination.currency.code}</strong>) rather than your home currency on card terminals to avoid hidden dynamic currency conversion (DCC) markups.
        </span>
      </div>
    </div>
  );
}
