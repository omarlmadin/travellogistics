import countriesData from '@/data/countries.json';
import visaRulesData from '@/data/visa-rules.json';
import { Country, VisaRule, PlugCompatibilityResult, RouteLogistics } from '@/types';

const countries: Country[] = countriesData as Country[];
const visaRules: VisaRule[] = visaRulesData as VisaRule[];

export function getAllCountries(): Country[] {
  return countries;
}

export function getCountryBySlug(slug: string): Country | undefined {
  if (!slug) return undefined;
  return countries.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export function getCountryByCode(code: string): Country | undefined {
  if (!code) return undefined;
  return countries.find((c) => c.code.toUpperCase() === code.toUpperCase());
}

export function parseRouteSlug(slug: string): { origin: Country; destination: Country } | null {
  if (!slug || !slug.includes('-to-')) return null;

  for (const origin of countries) {
    const prefix = `${origin.slug}-to-`;
    if (slug.startsWith(prefix)) {
      const destSlug = slug.slice(prefix.length);
      const destination = countries.find((c) => c.slug === destSlug);
      if (destination && origin.slug !== destination.slug) {
        return { origin, destination };
      }
    }
  }
  return null;
}

export function calculatePlugCompatibility(
  origin: Country,
  dest: Country
): PlugCompatibilityResult {
  const sharedPlugs = origin.plugTypes.filter((plug) =>
    dest.plugTypes.includes(plug)
  );

  const needsAdapter = sharedPlugs.length === 0;
  const voltageDiff = Math.abs(origin.voltage - dest.voltage);
  const needsVoltageConverter = voltageDiff >= 30;

  let advice = '';
  if (needsAdapter && needsVoltageConverter) {
    advice = `You will need both a physical plug adapter (Type ${dest.plugTypes.join('/')}) and a voltage converter if your devices do not support dual voltage (100–240V).`;
  } else if (needsAdapter) {
    advice = `Your plugs (Type ${origin.plugTypes.join('/')}) won't fit into outlets in ${dest.name} (Type ${dest.plugTypes.join('/')}). A universal travel adapter is required.`;
  } else if (needsVoltageConverter) {
    advice = `Your plug shapes match, but voltage differs (${origin.voltage}V vs ${dest.voltage}V). Ensure sensitive appliances (hairdryers, curling irons) are dual-voltage rated.`;
  } else {
    advice = `Great news! Plugs and voltage in ${dest.name} are fully compatible with your devices from ${origin.name}. No adapter needed!`;
  }

  return {
    needsAdapter,
    needsVoltageConverter,
    originPlugs: origin.plugTypes,
    destinationPlugs: dest.plugTypes,
    sharedPlugs,
    originVoltage: origin.voltage,
    destVoltage: dest.voltage,
    originFreq: origin.frequency,
    destFreq: dest.frequency,
    advice,
  };
}

export function getVisaRule(originCode: string, destCode: string): VisaRule {
  const matched = visaRules.find(
    (rule) =>
      rule.originCode.toUpperCase() === originCode.toUpperCase() &&
      rule.destinationCode.toUpperCase() === destCode.toUpperCase()
  );

  if (matched) return matched;

  // Smart heuristic fallback if exact rule isn't in JSON
  return {
    originCode,
    destinationCode: destCode,
    category: 'visa_required',
    notes: 'Please verify entry protocols with official consulate authorities or use the instant eVisa checker below.',
  };
}

export function getRouteLogistics(originSlug: string, destSlug: string): RouteLogistics | null {
  const origin = getCountryBySlug(originSlug);
  const destination = getCountryBySlug(destSlug);

  if (!origin || !destination) return null;

  return {
    origin,
    destination,
    plugCompatibility: calculatePlugCompatibility(origin, destination),
    visaRule: getVisaRule(origin.code, destination.code),
  };
}

export function getAllRouteCombinations(): { slug: string; origin: string; destination: string }[] {
  const routes: { slug: string; origin: string; destination: string }[] = [];

  for (const origin of countries) {
    for (const destination of countries) {
      if (origin.slug !== destination.slug) {
        routes.push({
          slug: `${origin.slug}-to-${destination.slug}`,
          origin: origin.slug,
          destination: destination.slug,
        });
      }
    }
  }

  return routes;
}

export function getPopularRoutes(): { origin: Country; destination: Country }[] {
  const popularPairs = [
    ['united-states', 'japan'],
    ['united-states', 'united-kingdom'],
    ['united-states', 'france'],
    ['united-states', 'thailand'],
    ['united-kingdom', 'united-states'],
    ['united-kingdom', 'thailand'],
    ['united-kingdom', 'spain'],
    ['germany', 'united-states'],
    ['australia', 'japan'],
    ['canada', 'united-states'],
    ['united-arab-emirates', 'united-kingdom'],
    ['saudi-arabia', 'united-arab-emirates'],
  ];

  const results: { origin: Country; destination: Country }[] = [];
  for (const [oSlug, dSlug] of popularPairs) {
    const o = getCountryBySlug(oSlug);
    const d = getCountryBySlug(dSlug);
    if (o && d) {
      results.push({ origin: o, destination: d });
    }
  }
  return results;
}
