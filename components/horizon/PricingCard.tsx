import { CheckCircle2 } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative ${
        popular
          ? "border-2 border-moriartii-primary ring-2 ring-moriartii-primary/20"
          : "border border-gray-200"
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-moriartii-primary text-white text-xs font-bold uppercase py-1 px-3 transform translate-x-2 -translate-y-0 rotate-45 origin-bottom-left">
          Populaire
        </div>
      )}

      <div className="p-6 md:p-8">
        <h3
          className={`text-xl font-serif font-bold ${
            popular ? "text-moriartii-primary" : "text-moriartii-secondary"
          } mb-2`}
        >
          {title}
        </h3>

        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold text-moriartii-primary">{price}</span>
          <span className="text-moriartii-secondary ml-2">{period}</span>
        </div>

        <p className="text-gray-600 mb-6">{description}</p>

        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-300 ${
            popular
              ? "bg-moriartii-primary text-white hover:bg-moriartii-secondary"
              : "bg-moriartii-light text-moriartii-primary hover:bg-moriartii-primary hover:text-white"
          }`}
        >
          Sélectionner ce plan
        </button>
      </div>
    </div>
  );
}