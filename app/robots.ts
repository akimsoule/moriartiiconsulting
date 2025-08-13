import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/', '/auth/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://moriartiiconsulting.com'}/sitemap.xml`,
  }
}
