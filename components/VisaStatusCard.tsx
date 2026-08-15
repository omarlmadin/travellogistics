import React from 'react';
import { Country, VisaCategory } from '@/types';
import { getVisaRule } from '@/lib/logistics';
import { CountryFlag } from './CountryFlag';
import {
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Clock,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface Props {
  origin: Country;
  destination: Country;
}

const statusConfig: Record<
  VisaCategory,
  {
    title: string;
    badgeClass: string;
    badge: string;
    iconColor: string;
    description: string;
    buttonLabel: string;
  }
> = {
  visa_free: {
    title: 'Visa-Free / Tourism Exemption',
    badgeClass: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
    badge: 'Visa Exempt ✅',
    iconColor: 'text-emerald-600 bg-emerald-50',
    description: 'No prior visa application is required. Travelers receive entry permission at border control.',
    buttonLabel: 'Verify Entry Checklist & Documents',
  },
  eta_required: {
    title: 'Electronic Travel Authorization (ETA / ETIAS)',
    badgeClass: 'bg-sky-50 text-sky-700 ring-1 ring-sky-600/20',
    badge: 'ETA Required ℹ️',
    iconColor: 'text-sky-600 bg-sky-50',
    description: 'Mandatory online authorization must be approved before airport check-in or boarding.',
    buttonLabel: 'Get Instant ETA Expedited Application',
  },
  e_visa: {
    title: 'Electronic Visa (e-Visa Online)',
    badgeClass: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20',
    badge: 'e-Visa Online 📄',
    iconColor: 'text-indigo-600 bg-indigo-50',
    description: 'Apply and receive digital visa approval fully online before your flight.',
    buttonLabel: 'Apply for Official e-Visa via iVisa',
  },
  visa_on_arrival: {
    title: 'Visa on Arrival (VoA)',
    badgeClass: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
    badge: 'Visa on Arrival 🛂',
    iconColor: 'text-amber-600 bg-amber-50',
    description: 'Visa is granted upon arrival at the destination airport or land border checkpoint.',
    buttonLabel: 'Fast-Track VoA Pre-Registration',
  },
  visa_required: {
    title: 'Consular Visa Required',
    badgeClass: 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20',
    badge: 'Visa Required ⚠️',
    iconColor: 'text-rose-600 bg-rose-50',
    description: 'Formal advance visa application through the embassy, consulate, or visa service center.',
    buttonLabel: 'Check Visa Requirements & Book Appointment',
  },
};

export function VisaStatusCard({ origin, destination }: Props) {
  const rule = getVisaRule(origin.code, destination.code);
  const status = statusConfig[rule.category];
  const ivisaAffiliateUrl = `https://www.ivisa.com/?utm_source=travellogistics&utm_medium=affiliate&nationality=${origin.code}&destination=${destination.code}`;

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Visa & Entry Regulations</h2>
              <p className="text-xs text-slate-500">
                For {origin.nationality} ({origin.name}) passport holders
              </p>
            </div>
          </div>

          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${status.badgeClass}`}>
            {status.badge}
          </span>
        </div>

        {/* Passport & Route Details */}
        <div className="mt-5 space-y-3.5">
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 text-xs">
            <div className="flex items-center gap-2">
              <CountryFlag code={origin.code} name={origin.name} emoji={origin.flagEmoji} size="sm" />
              <span className="font-semibold text-slate-800">{origin.nationality} Passport</span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            <div className="flex items-center gap-2">
              <CountryFlag code={destination.code} name={destination.name} emoji={destination.flagEmoji} size="sm" />
              <span className="font-semibold text-slate-800">{destination.name}</span>
            </div>
          </div>

          {/* Visa Status Details Block */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">{status.title}</span>
              {rule.maxStayDays && (
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Up to {rule.maxStayDays} Days</span>
                </div>
              )}
            </div>

            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              {rule.notes || status.description}
            </p>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500 border-t border-slate-200/60 pt-2.5">
              <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>Standard rule: Passport must be valid for at least 6 months beyond arrival date.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic High-Converting iVisa Affiliate Monetization */}
      <div className="mt-6 pt-3 border-t border-slate-100">
        <a
          href={ivisaAffiliateUrl}
          target="_blank"
          rel="sponsored noopener"
          className="group flex w-full items-center justify-between rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-200" />
            <span>{status.buttonLabel}</span>
          </div>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
        <p className="mt-1.5 text-center text-[10px] text-slate-400">
          Official partner • 24/7 embassy tracking & instant document validation
        </p>
      </div>
    </div>
  );
}
