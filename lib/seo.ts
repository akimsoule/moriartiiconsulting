import { Metadata } from "next";

export const siteConfig = {
  name: "Moriartii Consulting",
  description: "Cabinet de conseil spécialisé en droit des affaires, fiscalité internationale et stratégie d'entreprise. Expertise juridique et fiscale pour les entreprises en France et à l'international.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://moriartiiconsulting.com",
  ogImage: "/og-image.jpg",
  links: {
    facebook: "https://facebook.com/moriartiiconsulting",
    linkedin: "https://linkedin.com/company/moriartiiconsulting",
    twitter: "https://twitter.com/moriartiicons",
  },
  keywords: [
    "consultation juridique",
    "audit fiscal",
    "conseil fiscal",
    "prix de transfert",
    "stratégie fiscale",
    "TVA internationale",
    "droit des affaires",
    "fiscalité internationale",
    "conseil entreprise",
    "expertise comptable",
    "Paris",
    "France"
  ],
  author: "Moriartii Consulting",
  creator: "Moriartii Consulting",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Moriartii Consulting",
    "description": "Cabinet de conseil spécialisé en droit des affaires, fiscalité internationale et stratégie d'entreprise",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://moriartiiconsulting.com",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://moriartiiconsulting.com"}/legal.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-1-XX-XX-XX-XX",
      "contactType": "customer service",
      "availableLanguage": ["French", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressLocality": "Paris"
    },
    "sameAs": [
      "https://linkedin.com/company/moriartiiconsulting",
      "https://facebook.com/moriartiiconsulting"
    ]
  }
};

export function createMetadata({
  title,
  description,
  image = siteConfig.ogImage,
  noIndex = false,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  canonicalUrl,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  canonicalUrl?: string;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const finalDescription = description || siteConfig.description;
  const allKeywords = [...siteConfig.keywords, ...keywords];
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description: finalDescription,
    keywords: allKeywords.join(", "),
    authors: authors ? authors.map(name => ({ name })) : [{ name: siteConfig.author }],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl || siteConfig.url,
    },
    openGraph: {
      type,
      title: fullTitle,
      description: finalDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "fr_FR",
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
        section,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: finalDescription,
      images: [imageUrl],
      creator: "@moriartiicons",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };

  return metadata;
}

export function generateStructuredData(type: string, data: any) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return JSON.stringify(baseData, null, 2);
}

export const breadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => {
  return generateStructuredData("BreadcrumbList", {
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  });
};

export const faqStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return generateStructuredData("FAQPage", {
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });
};

export const serviceStructuredData = (service: {
  name: string;
  description: string;
  provider: string;
  areaServed?: string;
  serviceType?: string;
}) => {
  return generateStructuredData("Service", {
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: service.provider,
    },
    areaServed: service.areaServed || "France",
    serviceType: service.serviceType,
  });
};
