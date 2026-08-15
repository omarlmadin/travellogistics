import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllRouteCombinations, parseRouteSlug, calculatePlugCompatibility, getVisaRule } from '@/lib/logistics';
import { buildRouteSEO } from '@/lib/seo';
import { RouteHero } from '@/components/RouteHero';
import { PlugComparisonCard } from '@/components/PlugComparisonCard';
import { VisaStatusCard } from '@/components/VisaStatusCard';
import { EsimAffiliateCard } from '@/components/EsimAffiliateCard';
import { CurrencyCard } from '@/components/CurrencyCard';
import { HealthAndSafetyCard } from '@/components/HealthAndSafetyCard';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { InternalLinksMesh } from '@/components/InternalLinksMesh';
import { ChevronRight, Home, HelpCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Static Site Generation (SSG) Pre-rendering
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// 3. Main Route Page Component
export default async function RoutePage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseRouteSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { origin, destination } = parsed;
  const plug = calculatePlugCompatibility(origin, destination);
  const visa = getVisaRule(origin.code, destination.code);
  const { faqSchema, breadcrumbSchema } = buildRouteSEO(origin, destination);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Schema.org Structured Data (JSON-LD) for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Main Container */}
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center text-xs text-slate-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li>
              <Link href="/" className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600">
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <li>
              <span className="text-slate-600">{origin.name}</span>
            </li>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <li className="font-semibold text-slate-900">
              {destination.name} Logistics
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <RouteHero origin={origin} destination={destination} plug={plug} visa={visa} />

        {/* Top Ad Unit (Leaderboard) */}
        <AdPlaceholder slotId="tl-top-banner-101" format="horizontal" />

        {/* Core Logistics Section: Plugs & Visa */}
        <div className="grid gap-6 md:grid-cols-2">
          <PlugComparisonCard origin={origin} destination={destination} />
          <VisaStatusCard origin={origin} destination={destination} />
        </div>

        {/* Full-width eSIM Connectivity Card */}
        <div className="mt-6">
          <EsimAffiliateCard origin={origin} destination={destination} />
        </div>

        {/* Secondary Logistics: Currency & Health/Safety */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <CurrencyCard origin={origin} destination={destination} />
          <HealthAndSafetyCard origin={origin} destination={destination} />
        </div>

        {/* Mid-Content Ad Unit */}
        <AdPlaceholder slotId="tl-mid-content-202" format="horizontal" />

        {/* Frequently Asked Questions (FAQ) Accordion & Visual Section */}
        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-500">
                Logistics & travel essentials from {origin.name} to {destination.name}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {faqSchema.mainEntity.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition open:bg-white open:ring-1 open:ring-slate-200"
                open={idx === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
                  <span>{item.name}</span>
                  <span className="ml-4 text-slate-400 transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                  {item.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Internal Linking Mesh for Crawlers */}
        <InternalLinksMesh currentOrigin={origin} currentDestination={destination} />
      </div>
    </div>
  );
}
