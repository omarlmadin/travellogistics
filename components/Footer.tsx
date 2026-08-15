import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck } from 'lucide-react';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-slate-200 bg-white pt-12 pb-8 text-slate-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-bold text-slate-900 text-base">TravelLogistics</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              The automated, programmatic travel guide for real-time power plug compatibility, visa requirements, voltage checks, and connectivity worldwide.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">Popular Routes</div>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/from-united-states-to-japan" className="hover:text-blue-600 transition">
                  United States to Japan
                </Link>
              </li>
              <li>
                <Link href="/from-united-states-to-united-kingdom" className="hover:text-blue-600 transition">
                  United States to United Kingdom
                </Link>
              </li>
              <li>
                <Link href="/from-united-kingdom-to-thailand" className="hover:text-blue-600 transition">
                  United Kingdom to Thailand
                </Link>
              </li>
              <li>
                <Link href="/from-australia-to-japan" className="hover:text-blue-600 transition">
                  Australia to Japan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">Logistics Guides</div>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <span className="text-slate-700 font-medium">World Plug & Socket Types (A to O)</span>
              </li>
              <li>
                <span className="text-slate-700 font-medium">110V vs 230V Voltage Converters</span>
              </li>
              <li>
                <span className="text-slate-700 font-medium">eSIM vs Local SIM Cards Guide</span>
              </li>
              <li>
                <span className="text-slate-700 font-medium">Schengen 90/180-Day Rule Calculator</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">Affiliate Disclosure</div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
              TravelLogistics participates in travel affiliate programs (Amazon, Airalo, iVisa). When you make a purchase through our links, we may earn an affiliate commission at no extra cost to you.
            </p>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Independent & Fact-Checked Data</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-slate-400">
          <p>© {currentYear} TravelLogistics Guide. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built for high performance with 100/100 PageSpeed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
