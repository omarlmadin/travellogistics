import React from 'react';
import { Country } from '@/types';
import { Coins, CreditCard, Banknote, HelpCircle } from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
}

const cardAcceptanceDescriptions = {
  very_high: 'Card/Contactless is accepted almost everywhere (Apple Pay, Visa, Mastercard).',
  high: 'Credit & debit cards widely accepted; keep a small amount of cash for small vendors.',
  moderate: 'Cards accepted in hotels & modern venues; cash is needed for street vendors and taxis.',
  cash_preferred: 'Cash is king. Always carry local physical currency for daily transactions.',
};

export function CurrencyCard({ origin, destination }: Props) {
  const sameCurrency = origin.currency.code === destination.currency.code;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-500/10">
          <Coins className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Currency & Payment Methods</h2>
          <p className="text-xs text-slate-500">Money handling in {destination.name}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
        {/* Origin Currency */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <span className="text-xs text-slate-500">{origin.name} Currency</span>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {origin.currency.symbol} {origin.currency.code}
          </div>
          <p className="text-xs text-slate-500">{origin.currency.name}</p>
        </div>

        {/* Destination Currency */}
        <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-4">
          <span className="text-xs font-semibold text-violet-700">{destination.name} Currency</span>
          <div className="mt-1 text-xl font-bold text-violet-950">
            {destination.currency.symbol} {destination.currency.code}
          </div>
          <p className="text-xs text-violet-700">{destination.currency.name}</p>
        </div>
      </div>

      {/* Payment and Tipping Culture */}
      <div className="mt-4 space-y-2.5 text-xs">
        <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 text-slate-700">
          <CreditCard className="h-4 w-4 shrink-0 text-slate-500 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-800">Card Acceptance: </span>
            <span>{cardAcceptanceDescriptions[destination.cardAcceptance]}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 text-slate-700">
          <Banknote className="h-4 w-4 shrink-0 text-slate-500 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-800">Tipping Etiquette: </span>
            <span>{destination.tippingCulture}</span>
          </div>
        </div>
      </div>

      {/* Quick Travel Tip */}
      {!sameCurrency && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-900 p-3 text-xs text-white">
          <span className="text-slate-300">
            Tip: Use a fee-free travel card (Wise / Revolut) to spend in {destination.currency.code}.
          </span>
        </div>
      )}
    </div>
  );
}
