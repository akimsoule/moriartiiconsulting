import { services } from '@/lib/data';
import { Building, Globe, GraduationCap, Receipt, Scale } from 'lucide-react';
import CustomLink from '../CustomLink';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'globe':
      return <Globe className="h-8 w-8 text-moriartii-primary" />;
    case 'receipt':
      return <Receipt className="h-8 w-8 text-moriartii-primary" />;
    case 'building':
      return <Building className="h-8 w-8 text-moriartii-primary" />;
    case 'scale':
      return <Scale className="h-8 w-8 text-moriartii-primary" />;
    case 'graduationCap':
      return <GraduationCap className="h-8 w-8 text-moriartii-primary" />;
    default:
      return <Globe className="h-8 w-8 text-moriartii-primary" />;
  }
};

export default function Services() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-moriartii-primary mb-4">
            Nos Services Spécialisés
          </h2>
          <p className="text-moriartii-secondary max-w-3xl mx-auto">
            Chez Moriartii Consulting, nous offrons une gamme complète de services de consultation juridique et fiscale pour répondre aux besoins spécifiques de votre entreprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="mb-4">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-xl font-serif font-bold text-moriartii-primary mb-3">
                {service.title}
              </h3>
              <p className="text-moriartii-secondary mb-4 flex-grow">
                {service.description}
              </p>
              <ul className="space-y-2 mb-4">
                {service.details.slice(0, 2).map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <svg 
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
              <CustomLink 
                href={`/services#${service.id}`}
                className="text-moriartii-primary font-medium hover:text-moriartii-secondary transition-colors duration-300 inline-flex items-center"
              >
                En savoir plus
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </CustomLink>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <CustomLink 
            href="/services"
            className="btn btn-primary px-6 py-3 rounded-md inline-flex items-center"
          >
            Voir tous nos services
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </CustomLink>
        </div>
      </div>
    </section>
  );
}