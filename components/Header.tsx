import React from 'react';
import Link from 'next/link';
import { Compass, Zap, Shield, Wifi } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Travel<span className="text-blue-600">Logistics</span>
            </span>
            <span className="hidden sm:inline-block ml-2 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
              pSEO Engine
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4 text-xs font-semibold sm:gap-6 sm:text-sm">
          <Link
            href="/united-states-to-japan"
            className="hidden items-center gap-1.5 text-slate-600 transition hover:text-blue-600 md:flex"
          >
            <Zap className="h-4 w-4 text-amber-500" />
            <span>US ➔ Japan</span>
          </Link>
          <Link
            href="/united-states-to-united-kingdom"
            className="hidden items-center gap-1.5 text-slate-600 transition hover:text-blue-600 md:flex"
          >
            <Shield className="h-4 w-4 text-blue-500" />
            <span>US ➔ UK</span>
          </Link>
          <Link
            href="/united-kingdom-to-thailand"
            className="hidden items-center gap-1.5 text-slate-600 transition hover:text-blue-600 md:flex"
          >
            <Wifi className="h-4 w-4 text-emerald-500" />
            <span>UK ➔ Thailand</span>
          </Link>

          <Link
            href="/"
            className="rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-slate-800"
          >
            Find My Route
          </Link>
        </nav>
      </div>
    </header>
  );
}
