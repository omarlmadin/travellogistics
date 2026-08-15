import { MetadataRoute } from 'next';
import { getAllRouteCombinations } from '@/lib/logistics';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://travellogistics.com';
  const routes = getAllRouteCombinations();

  const dynamicRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}/${route.slug}`,
    lastModified: new Date('2026-01-15T00:00:00Z'),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-01-15T00:00:00Z'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...dynamicRoutes,
  ];
}
