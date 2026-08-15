import { Country } from '@/types';
import { calculatePlugCompatibility, getVisaRule } from './logistics';

export function buildRouteSEO(origin: Country, dest: Country) {
  const plug = calculatePlugCompatibility(origin, dest);
  const visa = getVisaRule(origin.code, dest.code);
  const year = new Date().getFullYear();

  const plugStatus = plug.needsAdapter
    ? `Adapter Required (Type ${dest.plugTypes.join('/')})`
    : `No Adapter Needed (Type ${dest.plugTypes.join('/')})`;

  const visaStatus = visa.category === 'visa_free'
    ? 'Visa Free'
    : visa.category === 'eta_required'
    ? 'ETA Required'
    : visa.category === 'e_visa'
    ? 'e-Visa Online'
    : visa.category === 'visa_on_arrival'
    ? 'Visa on Arrival'
    : 'Visa Required';

  const title = `Travel from ${origin.name} to ${dest.name}: Plugs, Visa & Voltage Guide (${year})`;
  const description = `Planning to travel from ${origin.name} to ${dest.name}? Essential travel logistics guide: Power plug compatibility (${plugStatus}), ${dest.voltage}V voltage, ${visaStatus} status, eSIM mobile data, and local payment tips.`;
  const canonicalUrl = `https://travellogistics.com/${origin.slug}-to-${dest.slug}`;

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
            ? `Yes. ${origin.name} primarily uses Type ${origin.plugTypes.join(', ')} outlets, while ${dest.name} uses Type ${dest.plugTypes.join(', ')}. You will need a universal power adapter.`
            : `No. Both ${origin.name} and ${dest.name} support compatible plug standards (Type ${plug.sharedPlugs.join(', ')}). Your standard electronics can plug in directly.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the voltage difference between ${origin.name} and ${dest.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${origin.name} operates at ${origin.voltage}V and ${origin.frequency}Hz, while ${dest.name} operates at ${dest.voltage}V and ${dest.frequency}Hz. ${
            plug.needsVoltageConverter
              ? `Because there is a notable voltage gap, ensure high-draw appliances (hair dryers, heating tools) are rated for dual voltage (100–240V) or bring a voltage converter.`
              : `Modern laptops, smartphones, and dual-voltage chargers work seamlessly without a converter.`
          }`,
        },
      },
      {
        '@type': 'Question',
        name: `Do citizens of ${origin.name} need a visa to enter ${dest.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The visa policy for ${origin.name} travelers entering ${dest.name} is categorized as "${visaStatus}". ${
            visa.maxStayDays ? `Permitted stay is typically up to ${visa.maxStayDays} days.` : ''
          } ${visa.notes || ''}`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the best way to get mobile internet data in ${dest.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `For instant internet upon landing in ${dest.name}, an eSIM is the most convenient option. It allows you to maintain your ${origin.name} phone number for SMS authentication while accessing local high-speed 4G/5G data networks without expensive roaming fees.`,
        },
      },
      {
        '@type': 'Question',
        name: `What currency is used in ${dest.name} and do they accept credit cards?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The currency in ${dest.name} is the ${dest.currency.name} (${dest.currency.code} / ${dest.currency.symbol}). Card acceptance level is ${dest.cardAcceptance.replace('_', ' ')}. ${dest.tippingCulture}`,
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
        name: `${origin.name} to ${dest.name}`,
        item: canonicalUrl,
      },
    ],
  };

  return {
    title,
    description,
    canonicalUrl,
    faqSchema,
    breadcrumbSchema,
    visaStatus,
    plugStatus,
  };
}
