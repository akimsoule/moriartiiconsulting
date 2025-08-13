// Utilitaires pour Google Tag Manager - Suivi d'événements spécifiques au cabinet juridique

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const analytics = {
  // Fonction générique pour envoyer des événements GTM
  trackEvent: (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...parameters
      });
    }
  },

  // Suivi des consultations de services
  trackServiceView: (serviceName: string) => {
    analytics.trackEvent('service_view', {
      service_name: serviceName,
      event_category: 'engagement',
      page_location: window.location.pathname
    });
  },

  // Suivi des demandes de contact
  trackContactForm: (formType: 'contact' | 'rdv' | 'consultation') => {
    analytics.trackEvent('form_submit', {
      form_type: formType,
      event_category: 'lead_generation',
      contact_method: formType
    });
  },

  // Suivi de la lecture d'articles de blog
  trackBlogRead: (articleTitle: string, readingTime?: number) => {
    analytics.trackEvent('article_read', {
      article_title: articleTitle,
      reading_time: readingTime,
      event_category: 'content_engagement'
    });
  },

  // Suivi des téléchargements de documents juridiques
  trackDocumentDownload: (documentName: string) => {
    analytics.trackEvent('document_download', {
      document_name: documentName,
      event_category: 'resource_access'
    });
  },

  // Suivi des clics sur les réseaux sociaux
  trackSocialClick: (platform: string) => {
    analytics.trackEvent('social_click', {
      social_platform: platform,
      event_category: 'social_engagement'
    });
  },

  // Suivi des recherches sur le site
  trackSiteSearch: (searchTerm: string) => {
    analytics.trackEvent('site_search', {
      search_term: searchTerm,
      event_category: 'site_search'
    });
  },

  // Suivi des conversions (prise de rendez-vous)
  trackConversion: (conversionType: 'rdv_booked' | 'consultation_requested' | 'quote_requested', value?: number) => {
    analytics.trackEvent('conversion', {
      conversion_type: conversionType,
      event_category: 'business_goal',
      value: value || 1
    });
  },

  // Suivi de la navigation entre pages
  trackPageView: (pagePath: string, pageTitle: string) => {
    analytics.trackEvent('page_view', {
      page_title: pageTitle,
      page_location: pagePath
    });
  },

  // Suivi des erreurs JavaScript
  trackError: (errorMessage: string, errorSource?: string) => {
    analytics.trackEvent('javascript_error', {
      error_message: errorMessage,
      error_source: errorSource,
      event_category: 'technical_issue'
    });
  }
};

// Hook React pour utiliser Analytics facilement
export const useAnalytics = () => {
  return analytics;
};
