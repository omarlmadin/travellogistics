import React from 'react';
import { Country, VisaCategory } from '@/types';
import { getVisaRule } from '@/lib/logistics';
import { FileCheck, ShieldCheck, ArrowRight, Clock, AlertCircle } from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
}

const statusConfig: Record<
  VisaCategory,
  { title: string; colorClass: string; badgeClass: string; badge: string; description: string }
> = {
  visa_free: {
    title: 'Visa Free Entry',
    colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    badgeClass: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
    badge: 'Visa-Free',
    description: 'No visa required prior to arrival for tourist visits.',
  },
  eta_required: {
    title: 'Electronic Travel Authorization (ETA)',
    colorClass: 'text-blue-700 bg-blue-50 border-blue-200',
    badgeClass: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
    badge: 'ETA Required',
    description: 'Quick digital authorization required online before boarding.',
  },
  e_visa: {
    title: 'Electronic Visa (e-Visa)',
    colorClass: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    badgeClass: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20',
    badge: 'e-Visa Online',
    description: 'Official digital visa application processed fully online.',
  },
  visa_on_arrival: {
    title: 'Visa on Arrival (VoA)',
    colorClass: 'text-amber-700 bg-amber-50 border-amber-200',
    badgeClass: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
    badge: 'Visa on Arrival',
    description: 'Visa issued directly at border control / international airport upon arrival.',
  },
  visa_required: {
    title: 'Consular Visa Required',
    colorClass: 'text-rose-700 bg-rose-50 border-rose-200',
    badgeClass: 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20',
    badge: 'Visa Required',
    description: 'In-advance visa application through the embassy or consulate is required.',
  },
};

export function VisaStatusCard({ origin, destination }: Props) {
  const rule = getVisaRule(origin.code, destination.code);
  const status = statusConfig[rule.category];
  const ivisaAffiliateUrl = `https://www.ivisa.com/?utm_source=travellogistics&utm_medium=affiliate&nationality=${origin.code}&destination=${destination.code}`;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/10">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Visa Requirements</h2>
              <p className="text-xs text-slate-500">For {origin.name} passport holders</p>
            </div>
          </div>

          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${status.badgeClass}`}>
            {status.badge}
          </span>
        </div>

        {/* Status Details */}
        <div className="mt-5 space-y-3.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span>Category: {status.title}</span>
          </div>

          {rule.maxStayDays && (
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>
                Maximum Permitted Stay: <strong className="text-slate-900">{rule.maxStayDays} days</strong>
              </span>
            </div>
          )}

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
              <p className="leading-relaxed">{rule.notes || status.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliate / Processing CTA */}
      <div className="mt-6 pt-2">
        <a
          href={ivisaAffiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group flex w-full items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
        >
          <span>Verify & Apply for {destination.name} Visa / Entry Docs</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
        <p className="mt-1.5 text-center text-[10px] text-slate-400">
          Fast-track online processing • 24/7 travel document verification
        </p>
      </div>
    </div>
  );
}
