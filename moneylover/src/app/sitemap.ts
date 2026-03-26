import type { MetadataRoute } from 'next';

// Constants
import { SITE_URL } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/login`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/register`,
      lastModified: new Date(),
    },
    //TODO: Update later...
  ];
}
