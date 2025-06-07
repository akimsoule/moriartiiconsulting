import { Building, Globe, GraduationCap, Receipt, Scale } from 'lucide-react';
import { Service } from '@/lib/data';

interface ServiceCardProps {
  service: Service;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'globe':
      return <Globe className="h-12 w-12 text-moriartii-primary" />;
    case 'receipt':
      return <Receipt className="h-12 w-12 text-moriartii-primary" />;
    case 'building':
      return <Building className="h-12 w-12 text-moriartii-primary" />;
    case 'scale':
      return <Scale className="h-12 w-12 text-moriartii-primary" />;
    case 'graduationCap':
      return <GraduationCap className="h-12 w-12 text-moriartii-primary" />;
    default:
      return <Globe className="h-12 w-12 text-moriartii-primary" />;
  }
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div id={service.id} className="scroll-mt-20 bg-white rounded-lg shadow-md p-8 border border-gray-100">
      <div className="mb-6">
        {getIcon(service.icon)}
      </div>
      <h3 className="text-2xl font-serif font-bold text-moriartii-primary mb-4">
        {service.title}
      </h3>
      <p className="text-moriartii-secondary mb-6 text-lg">
        {service.description}
      </p>
      <div className="space-y-4">
        {service.details.map((detail, index) => (
          <div key={index} className="flex items-start">
            <svg 
              className="h-6 w-6 text-green-500 mr-3 mt-0.5" 
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
          </div>
        ))}
      </div>
    </div>
  );
}