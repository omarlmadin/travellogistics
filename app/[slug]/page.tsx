import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getAllRouteCombinations,
  parseRouteSlug,
  calculatePlugCompatibility,
  getVisaRule,
} from '@/lib/logistics';
import { buildRouteSEO } from '@/lib/seo';
import { RouteHero } from '@/components/RouteHero';
import { PlugComparisonCard } from '@/components/PlugComparisonCard';
import { VisaStatusCard } from '@/components/VisaStatusCard';
import { EsimAffiliateCard } from '@/components/EsimAffiliateCard';
import { DestinationShowcase } from '@/components/DestinationShowcase';
import { CurrencyCard } from '@/components/CurrencyCard';
import { HealthAndSafetyCard } from '@/components/HealthAndSafetyCard';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { InternalLinksMesh } from '@/components/InternalLinksMesh';
import { HelpCircle, ChevronDown } from 'lucide-react';

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
          url: destination.heroImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
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
        destination.heroImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
      ],
    },
  };
}

// 3. Main Route Page Server Component (Zero Client JS by Default)
export default async function RoutePage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseRouteSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { origin, destination } = parsed;
  const plug = calculatePlugCompatibility(origin, destination);
  const visa = getVisaRule(origin.code, destination.code);
  const { faqSchema, breadcrumbSchema, travelGuideSchema } = buildRouteSEO(origin, destination);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
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

        {/* Top Ad Unit (Leaderboard) */}
        <AdPlaceholder slotId="tl-top-banner-101" format="horizontal" />

        {/* 2. Core Logistics Bento Grid: Plugs & Visa */}
        <div className="grid gap-6 md:grid-cols-2">
          <PlugComparisonCard origin={origin} destination={destination} />
          <VisaStatusCard origin={origin} destination={destination} />
        </div>

        {/* 3. Full-width eSIM Connectivity Comparison Widget */}
        <div className="mt-6">
          <EsimAffiliateCard origin={origin} destination={destination} />
        </div>

        {/* 4. Middle of Page Destination Visual Showcase & Local Infrastructure */}
        <DestinationShowcase origin={origin} destination={destination} />

        {/* 5. Secondary Logistics Bento Grid: Currency & Health/Safety */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <CurrencyCard origin={origin} destination={destination} />
          <HealthAndSafetyCard origin={origin} destination={destination} />
        </div>

        {/* Mid-Content Ad Unit */}
        <AdPlaceholder slotId="tl-mid-content-202" format="horizontal" />

        {/* 6. Dynamic Semantic HTML FAQ Accordion (Zero JS Interactivity) */}
        <section className="mt-12 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/20">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-500">
                Logistics & practical travel essentials for {origin.nationality} travelers visiting {destination.name}
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
                <p className="mt-3 text-xs leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                  {item.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 7. Internal Linking Mesh for Crawlers & Navigation */}
        <InternalLinksMesh currentOrigin={origin} currentDestination={destination} />
      </div>
    </div>
  );
}
