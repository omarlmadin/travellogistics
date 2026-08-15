import { Country } from '@/types';
import { calculatePlugCompatibility, getVisaRule } from './logistics';

export function buildRouteSEO(origin: Country, dest: Country) {
  const plug = calculatePlugCompatibility(origin, dest);
  const visa = getVisaRule(origin.code, dest.code);
  const year = 2026;

  const originPlugsStr = origin.plugTypes.map((p) => `Type ${p}`).join('/');
  const destPlugsStr = dest.plugTypes.map((p) => `Type ${p}`).join('/');

  const plugStatus = plug.needsAdapter
    ? `Adapter Required (${destPlugsStr})`
    : `No Adapter Needed (${destPlugsStr})`;

  const visaStatus =
    visa.category === 'visa_free'
      ? 'Visa Free'
      : visa.category === 'eta_required'
      ? 'ETA Required'
      : visa.category === 'e_visa'
      ? 'e-Visa Online'
      : visa.category === 'visa_on_arrival'
      ? 'Visa on Arrival'
      : 'Visa Required';

  const nationalityText = origin.nationality || `${origin.name} Citizens`;

  // Requirement 5 Dynamic Title & Meta Description:
  const title = `Do ${nationalityText} Citizens Need a Visa and Adapter for ${dest.name}? (${year} Guide)`;
  const description = `Traveling from ${origin.name} to ${dest.name}? Check visa requirements, power plug types (${originPlugsStr} to ${destPlugsStr}), voltage safety, and eSIM options instantly.`;
  const canonicalUrl = `https://travellogistics.com/from-${origin.slug}-to-${dest.slug}`;

  // Structured Data: FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Do I need a power plug adapter when traveling from ${origin.name} to ${dest.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: plug.needsAdapter
            ? `Yes. ${origin.name} primarily uses Type ${origin.plugTypes.join(', ')} sockets, while ${dest.name} uses Type ${dest.plugTypes.join(', ')}. You will need a universal power adapter.`
            : `No. Both ${origin.name} and ${dest.name} support compatible plug standards (Type ${plug.sharedPlugs.join(', ')}). Your standard electronics can plug in directly.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the voltage difference between ${origin.name} (${origin.voltage}V) and ${dest.name} (${dest.voltage}V)?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${origin.name} operates at ${origin.voltage}V and ${origin.frequency}Hz, while ${dest.name} operates at ${dest.voltage}V and ${dest.frequency}Hz. ${
            plug.needsVoltageConverter
              ? `Because there is a notable voltage gap (${origin.voltage}V vs ${dest.voltage}V), ensure high-draw appliances (hairdryers, irons) are dual-voltage rated (100–240V) or use a step-down/step-up voltage converter.`
              : `Modern laptops, smartphones, and dual-voltage chargers work seamlessly without a voltage converter.`
          }`,
        },
      },
      {
        '@type': 'Question',
        name: `Do citizens of ${origin.name} need a visa to visit ${dest.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `For ${nationalityText} passport holders entering ${dest.name}, entry status is categorized as "${visaStatus}". ${
            visa.maxStayDays ? `Permitted stay is typically up to ${visa.maxStayDays} days.` : ''
          } ${visa.notes || 'Please ensure your passport has at least 6 months validity.'}`,
        },
      },
      {
        '@type': 'Question',
        name: `How can I get mobile internet data in ${dest.name} without roaming charges?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The easiest way is to install a digital travel eSIM before departure (or upon landing). It allows you to maintain your ${origin.name} phone number for SMS and 2FA authentication while enjoying high-speed 4G/5G local data in ${dest.name}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What currency is used in ${dest.name} and are credit cards accepted?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The local currency in ${dest.name} is the ${dest.currency.name} (${dest.currency.code} ${dest.currency.symbol}). Card acceptance level is ${dest.cardAcceptance.replace('_', ' ')}. ${dest.tippingCulture}`,
        },
      },
    ],
  };

  // Structured Data: BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://travellogistics.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `From ${origin.name} to ${dest.name} Travel Guide`,
        item: canonicalUrl,
      },
    ],
  };

  // Structured Data: TravelGuide / Article Schema
  const travelGuideSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: title,
    description: description,
    image: dest.heroImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75&fm=webp',
    author: {
      '@type': 'Organization',
      name: 'TravelLogistics International Editorial Board',
      url: 'https://travellogistics.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TravelLogistics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://travellogistics.com/favicon.ico',
      },
    },
    datePublished: '2026-01-01T00:00:00Z',
    dateModified: '2026-01-15T00:00:00Z',
    about: [
      {
        '@type': 'Country',
        name: origin.name,
      },
      {
        '@type': 'Country',
        name: dest.name,
      },
    ],
  };

  return {
    title,
    description,
    canonicalUrl,
    faqSchema,
    breadcrumbSchema,
    travelGuideSchema,
    visaStatus,
    plugStatus,
  };
}
