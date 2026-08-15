import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllRouteCombinations,
  parseRouteSlug,
  calculatePlugCompatibility,
  getVisaRule,
} from '@/lib/logistics';
import { buildRouteSEO } from '@/lib/seo';
import { RouteHero } from '@/components/RouteHero';
import { SocialShare } from '@/components/SocialShare';
import { PlugComparisonCard } from '@/components/PlugComparisonCard';
import { VisaStatusCard } from '@/components/VisaStatusCard';
import { EsimAffiliateCard } from '@/components/EsimAffiliateCard';
import { DestinationShowcase } from '@/components/DestinationShowcase';
import { CurrencyCard } from '@/components/CurrencyCard';
import { HealthAndSafetyCard } from '@/components/HealthAndSafetyCard';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { InternalLinksMesh } from '@/components/InternalLinksMesh';
import {
  HelpCircle,
  ChevronDown,
  ExternalLink,
  CheckSquare,
  Table,
  Zap,
  ShieldCheck,
  Wifi,
  Coins,
  Droplet,
  Car,
  AlertTriangle,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Static Site Generation (SSG) Pre-rendering for all country pairs
export async function generateStaticParams() {
  const routes = getAllRouteCombinations();
  return routes.map((route) => ({
    slug: route.slug,
  }));
}

// 2. Programmatic SEO Engine: Meta Tags, Canonical & OpenGraph
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseRouteSlug(slug);

  if (!parsed) {
    return {
      title: 'Travel Route Logistics Not Found | TravelLogistics',
      description: 'The requested travel route logistics guide is unavailable.',
    };
  }

  const { origin, destination } = parsed;
  const { title, description, canonicalUrl } = buildRouteSEO(origin, destination);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'TravelLogistics',
      type: 'article',
      locale: 'en_US',
      images: [
        {
          url: destination.heroImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75&fm=webp',
          width: 1200,
          height: 630,
          alt: `${origin.name} to ${destination.name} Travel Logistics Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        destination.heroImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75&fm=webp',
      ],
    },
  };
}

// 3. Main Route Page Server Component (Zero Client JS Overhead)
export default async function RoutePage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseRouteSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { origin, destination } = parsed;
  const plug = calculatePlugCompatibility(origin, destination);
  const visa = getVisaRule(origin.code, destination.code);
  const { faqSchema, breadcrumbSchema, travelGuideSchema, canonicalUrl, title, description } =
    buildRouteSEO(origin, destination);

  const visaLabel =
    visa.category === 'visa_free'
      ? 'Visa-Free Exemption'
      : visa.category === 'eta_required'
      ? 'Electronic Travel Authorization (ETA)'
      : visa.category === 'e_visa'
      ? 'Electronic Visa (e-Visa Online)'
      : visa.category === 'visa_on_arrival'
      ? 'Visa on Arrival'
      : 'Consular Visa Required';

  return (
    <main className="min-h-screen bg-slate-50/60 pb-20">
      {/* Schema.org Structured Data (JSON-LD) for FAQ, Breadcrumb & TravelGuide */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelGuideSchema) }}
      />

      {/* Main Container */}
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        {/* 1. Hero Section with Destination Background, Verification Badge, & Visual Summary Scorecard */}
        <RouteHero origin={origin} destination={destination} plug={plug} visa={visa} />

        {/* Lightweight Social Sharing Bar */}
        <div className="mt-6">
          <SocialShare url={canonicalUrl} title={title} description={description} />
        </div>

        {/* Top Ad Unit (Leaderboard) */}
        <AdPlaceholder slotId="tl-top-banner-101" format="horizontal" />

        {/* Section 1: Power Plugs, Outlets & Voltage Safety */}
        <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/20">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                1. Power Plugs, Outlets & Voltage Safety for {destination.name}
              </h2>
              <p className="text-xs text-slate-500">
                Wall socket compatibility, pin dimensions & electrical voltage converter requirements
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              When traveling from <strong>{origin.name}</strong> to <strong>{destination.name}</strong>, one of the most critical pre-departure checks is ensuring your electronic devices and appliances are physically and electrically compatible with local power outlets. Electrical systems differ worldwide in socket geometry, line voltage, and alternating current (AC) frequency.
            </p>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/70 text-slate-700 text-xs sm:text-sm">
              <p className="font-semibold text-slate-900">
                🔌 Physical Outlet Summary:
              </p>
              <p className="mt-1">
                {origin.name} primarily utilizes <strong>Type {origin.plugTypes.join(', ')}</strong> wall sockets running at <strong>{origin.voltage}V</strong> and <strong>{origin.frequency}Hz</strong>. In contrast, {destination.name} operates on <strong>Type {destination.plugTypes.join(', ')}</strong> wall sockets at <strong>{destination.voltage}V</strong> and <strong>{destination.frequency}Hz</strong>.
              </p>
              <p className="mt-2 text-slate-600">
                {plug.needsAdapter
                  ? `Because there is no pin overlap between your native Type ${origin.plugTypes.join('/')} plugs and ${destination.name}'s Type ${destination.plugTypes.join('/')} wall outlets, you will require a physical travel plug adapter before connecting any electronics.`
                  : `Great news! Both countries share compatible socket formats (Type ${plug.sharedPlugs.join('/')}), meaning your native plugs will fit directly into wall outlets in ${destination.name} without an adapter.`}
              </p>
            </div>

            <p>
              According to the official{' '}
              <a
                href="https://www.iec.ch/world-plugs"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 underline hover:text-blue-800 transition"
              >
                IEC World Plugs and Sockets Standard
              </a>
              , electrical standards vary globally to match local grid infrastructure. Most modern personal electronics—such as smartphones, tablets, laptops, e-readers, and camera battery chargers—are equipped with universal switch-mode power supplies rated for <strong>100V–240V at 50/60Hz</strong>. Look for the small text label on your power brick: if it reads <em>&quot;INPUT: 100-240V 50/60Hz&quot;</em>, you only need a physical pin adapter.
            </p>

            {plug.needsVoltageConverter && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-xs sm:text-sm text-rose-950">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-rose-900">
                      High-Draw Voltage Warning ({origin.voltage}V vs {destination.voltage}V)
                    </p>
                    <p className="mt-1 leading-relaxed text-rose-800">
                      Single-voltage high-draw heating appliances (such as hair dryers, curling irons, hair straighteners, and electric kettles) designed specifically for {origin.voltage}V cannot be plugged into {destination.voltage}V outlets without a heavy-duty step-down or step-up voltage converter. Plugging single-voltage appliances into incompatible voltages can cause permanent thermal damage or short-circuits. We recommend using dual-voltage travel styling appliances instead.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Visual Plug Comparison Widget */}
          <div className="mt-6">
            <PlugComparisonCard origin={origin} destination={destination} />
          </div>
        </section>

        {/* Section 2: Visa Regulations & Entry Protocols */}
        <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                2. Visa Requirements & Entry Protocols for {origin.nationality} Citizens
              </h2>
              <p className="text-xs text-slate-500">
                Immigration categories, maximum permitted duration of stay & mandatory border documents
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Entry regulations for international travelers arriving in <strong>{destination.name}</strong> are determined by nationality, passport type, and trip purpose. For <strong>{origin.nationality} ({origin.name})</strong> passport holders visiting for tourism, business meetings, or family transit, entry is categorized under <strong>{visaLabel}</strong>.
            </p>

            <div className="grid gap-3 sm:grid-cols-3 text-xs">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Visa Status
                </span>
                <p className="mt-1 text-sm font-black text-slate-900 capitalize">
                  {visa.category.replace(/_/g, ' ')}
                </p>
                <p className="mt-0.5 text-slate-500">Official consular policy</p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Max Stay Duration
                </span>
                <p className="mt-1 text-sm font-black text-blue-700">
                  {visa.maxStayDays ? `Up to ${visa.maxStayDays} Days` : 'Standard Tourist Window'}
                </p>
                <p className="mt-0.5 text-slate-500">Per entry / visit period</p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Passport Validity
                </span>
                <p className="mt-1 text-sm font-black text-slate-900">
                  6+ Months Required
                </p>
                <p className="mt-0.5 text-slate-500">Beyond planned arrival date</p>
              </div>
            </div>

            <p>
              {visa.notes || `Please verify specific entry protocols with official consulate authorities before departure.`}
            </p>

            <div className="rounded-2xl bg-blue-50/60 p-4 border border-blue-100 text-xs sm:text-sm text-blue-950">
              <p className="font-bold text-blue-900">🛂 Mandatory Pre-Flight Entry Checklist:</p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-blue-900">
                <li>
                  <strong>Valid Passport:</strong> Must possess at least 6 months remaining validity from your scheduled arrival date and a minimum of 2 blank visa pages.
                </li>
                <li>
                  <strong>Proof of Onward Travel:</strong> Immigration officers and airline check-in agents routinely require confirmed return or onward flight booking confirmations.
                </li>
                <li>
                  <strong>Accommodation Details:</strong> Have your hotel booking vouchers, host address, or rental confirmation saved offline for border inspection.
                </li>
                <li>
                  <strong>Arrival Declaration:</strong> Complete any mandatory digital customs or health declaration forms (such as SG Arrival Card, Visit Japan Web, or Mexican FMM) within 72 hours of travel.
                </li>
              </ul>
            </div>
          </div>

          {/* Visa Status Details Card */}
          <div className="mt-6">
            <VisaStatusCard origin={origin} destination={destination} />
          </div>
        </section>

        {/* Section 3: Mobile Data, eSIM & Telecommunications */}
        <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20">
              <Wifi className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                3. Mobile Data & eSIM Connectivity in {destination.name}
              </h2>
              <p className="text-xs text-slate-500">
                Avoid high international roaming fees while keeping domestic numbers active for 2FA SMS
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Staying connected to reliable 4G and 5G internet in <strong>{destination.name}</strong> is vital for real-time GPS navigation, ride-hailing apps, digital payment authentication, and translation tools. Relying on your home carrier&apos;s international roaming often incurs exorbitant daily fees ($10 to $15 per day).
            </p>

            <p>
              Modern smartphones support <strong>Dual SIM technology</strong> via digital eSIMs. By installing a prepaid travel eSIM before departing {origin.name}, you can activate high-speed local data in {destination.name} as soon as your flight touches down. This setup allows you to keep your primary {origin.name} physical SIM active in standby mode to receive essential two-factor authentication (2FA) banking SMS and WhatsApp messages without incurring data roaming charges.
            </p>
          </div>

          {/* Full-width eSIM Connectivity Comparison Widget */}
          <div className="mt-6">
            <EsimAffiliateCard origin={origin} destination={destination} />
          </div>
        </section>

        {/* Section 4: Destination Visual Showcase & Local Infrastructure */}
        <div className="mt-8">
          <DestinationShowcase origin={origin} destination={destination} />
        </div>

        {/* Section 5: Currency, Payments, Health & Road Rules */}
        <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-500/20">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                4. Currency Exchange, Card Payments & Road Safety Rules
              </h2>
              <p className="text-xs text-slate-500">
                Managing money, avoiding DCC conversion markups, emergency services & driving rules
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              The official currency of {destination.name} is the <strong>{destination.currency.name} ({destination.currency.code} {destination.currency.symbol})</strong>. When spending money abroad, always be aware of <strong>Dynamic Currency Conversion (DCC)</strong>. When paying at card payment terminals or withdrawing from foreign ATMs, the machine may ask whether you wish to be billed in your home currency ({origin.currency.code}) or local currency ({destination.currency.code}).
            </p>

            <div className="rounded-2xl bg-amber-50/80 p-4 border border-amber-200 text-xs sm:text-sm text-amber-950">
              <p className="font-bold text-amber-900">
                💡 Golden Travel Rule: Always Pay in Local Currency ({destination.currency.code})
              </p>
              <p className="mt-1 text-amber-800 leading-relaxed">
                Choosing to be billed in your native currency allows the merchant&apos;s foreign bank to set an arbitrary exchange rate with hidden markups ranging from 3% to 8%. Always decline the conversion and choose <strong>{destination.currency.code}</strong> so your home bank applies the wholesale interbank exchange rate.
              </p>
            </div>

            <p>
              Regarding road safety, traffic in {destination.name} drives on the <strong>{destination.drivingSide.toUpperCase()}</strong> side of the road. {origin.drivingSide !== destination.drivingSide ? `Because this is the opposite side of what you are accustomed to in ${origin.name} (${origin.drivingSide}), take extra caution when crossing streets, stepping off curbs, or renting vehicles.` : `This matches the standard driving side in ${origin.name}.`} For emergency medical, police, or rescue dispatch, dial <strong>{destination.emergencyNumber}</strong>.
            </p>
          </div>

          {/* Secondary Logistics Bento Grid: Currency & Health/Safety Cards */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <CurrencyCard origin={origin} destination={destination} />
            <HealthAndSafetyCard origin={origin} destination={destination} />
          </div>
        </section>

        {/* Section 6: Linkable Backlink Magnet — Quick Reference Matrix */}
        <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
              <Table className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                5. Quick Reference Logistics Matrix: {origin.name} vs {destination.name}
              </h2>
              <p className="text-xs text-slate-500">
                Side-by-side comparison of electrical, immigration, financial & safety specifications
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                  <th className="py-3 px-4 font-bold">Logistical Parameter</th>
                  <th className="py-3 px-4 font-bold">{origin.name} (Origin)</th>
                  <th className="py-3 px-4 font-bold">{destination.name} (Destination)</th>
                  <th className="py-3 px-4 font-bold">Travel Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Power Plug Types</td>
                  <td className="py-3 px-4">Type {origin.plugTypes.join(', ')}</td>
                  <td className="py-3 px-4">Type {destination.plugTypes.join(', ')}</td>
                  <td className="py-3 px-4 font-bold">
                    {plug.needsAdapter ? (
                      <span className="text-amber-700">⚠️ Adapter Required</span>
                    ) : (
                      <span className="text-emerald-700">✅ Directly Compatible</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Line Voltage</td>
                  <td className="py-3 px-4">{origin.voltage} Volts</td>
                  <td className="py-3 px-4">{destination.voltage} Volts</td>
                  <td className="py-3 px-4 font-bold">
                    {plug.needsVoltageConverter ? (
                      <span className="text-rose-700">⚡ Voltage Gap Alert</span>
                    ) : (
                      <span className="text-emerald-700">✅ Voltage Safe</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Grid Frequency</td>
                  <td className="py-3 px-4">{origin.frequency} Hz</td>
                  <td className="py-3 px-4">{destination.frequency} Hz</td>
                  <td className="py-3 px-4 text-slate-500">Standard AC</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Visa Protocol</td>
                  <td className="py-3 px-4">{origin.nationality} Passport</td>
                  <td className="py-3 px-4">{destination.name} Border</td>
                  <td className="py-3 px-4 font-bold text-blue-700">{visaLabel}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Max Permitted Stay</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">{visa.maxStayDays ? `${visa.maxStayDays} Days` : 'Consular Window'}</td>
                  <td className="py-3 px-4 text-slate-500">Tourist Window</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Official Currency</td>
                  <td className="py-3 px-4">{origin.currency.code} ({origin.currency.symbol})</td>
                  <td className="py-3 px-4">{destination.currency.code} ({destination.currency.symbol})</td>
                  <td className="py-3 px-4 text-slate-500">Avoid DCC Fees</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Tap Water Quality</td>
                  <td className="py-3 px-4">{origin.tapWaterDrinkable ? 'Potable' : 'Bottled Only'}</td>
                  <td className="py-3 px-4">{destination.tapWaterDrinkable ? 'Potable' : 'Bottled Only'}</td>
                  <td className="py-3 px-4 font-bold">
                    {destination.tapWaterDrinkable ? (
                      <span className="text-emerald-700">💧 Safe to Drink</span>
                    ) : (
                      <span className="text-rose-700">🚫 Purified Bottled Only</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Road Driving Side</td>
                  <td className="py-3 px-4 capitalize">{origin.drivingSide} Side</td>
                  <td className="py-3 px-4 capitalize">{destination.drivingSide} Side</td>
                  <td className="py-3 px-4 font-bold">
                    {origin.drivingSide !== destination.drivingSide ? (
                      <span className="text-amber-700">⚠️ Opposite Side</span>
                    ) : (
                      <span className="text-emerald-700">✅ Same Side</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Emergency Dispatch</td>
                  <td className="py-3 px-4">Dial {origin.emergencyNumber}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">Dial {destination.emergencyNumber}</td>
                  <td className="py-3 px-4 text-slate-500">Police / Medical</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: Pre-Departure Travel Checklist */}
        <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/20">
              <CheckSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                6. Essential Pre-Departure Travel Checklist
              </h2>
              <p className="text-xs text-slate-500">
                Five-step logistical checklist before boarding your flight to {destination.name}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                1
              </span>
              <div>
                <p className="font-bold text-slate-900">Inspect Electronic Power Ratings</p>
                <p className="mt-0.5 text-slate-600">
                  Verify that all dual-voltage chargers support 100V–240V and pack a universal Type {destination.plugTypes.join('/')} plug adapter in your carry-on luggage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                2
              </span>
              <div>
                <p className="font-bold text-slate-900">Verify Passport Validity & Visa Clearance</p>
                <p className="mt-0.5 text-slate-600">
                  Ensure your {origin.nationality} passport has over 6 months validity from your arrival date. Complete any required {visaLabel} applications or online travel registrations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                3
              </span>
              <div>
                <p className="font-bold text-slate-900">Pre-Install Digital Travel eSIM</p>
                <p className="mt-0.5 text-slate-600">
                  Purchase and download your eSIM profile before departure so you have instantaneous 4G/5G data upon landing at the airport.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                4
              </span>
              <div>
                <p className="font-bold text-slate-900">Notify Bank & Enable Zero-FX Cards</p>
                <p className="mt-0.5 text-slate-600">
                  Carry credit/debit cards with zero foreign transaction fees. Remember to always decline DCC and pay in local currency ({destination.currency.code}).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                5
              </span>
              <div>
                <p className="font-bold text-slate-900">Save Emergency Contacts & Offline Maps</p>
                <p className="mt-0.5 text-slate-600">
                  Download offline Google or Apple Maps for {destination.name} and save emergency dispatch ({destination.emergencyNumber}) and consular assistance numbers to your phone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-Content Ad Unit */}
        <AdPlaceholder slotId="tl-mid-content-202" format="horizontal" />

        {/* Section 8: Dynamic Semantic HTML FAQ Accordion */}
        <section className="mt-12 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/20">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                7. Frequently Asked Questions: {origin.name} to {destination.name} Travel
              </h2>
              <p className="text-xs text-slate-500">
                Answers to common questions regarding plugs, voltage, visa rules & mobile connectivity
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3.5">
            {faqSchema.mainEntity.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4 transition-all open:bg-white open:ring-1 open:ring-blue-500/30 open:shadow-2xs"
                open={idx === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-slate-900 select-none">
                  <span>{item.name}</span>
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform group-open:rotate-180 group-open:bg-blue-50 group-open:text-blue-600">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                  {item.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Section 9: Internal Linking Mesh for Crawlers & Navigation */}
        <InternalLinksMesh currentOrigin={origin} currentDestination={destination} />
      </div>
    </main>
  );
}
