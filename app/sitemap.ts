import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/services',
    '/contact',
    '/blog',
    '/horizon',
    '/faq-rdv',
    '/team',
  ]

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : route === '/blog' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : route === '/services' ? 0.9 : 0.8,
  }))
}
