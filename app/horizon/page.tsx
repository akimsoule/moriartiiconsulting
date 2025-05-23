import { horizonServices } from "@/lib/data";
import PricingCard from "@/components/horizon/PricingCard";

export default function HorizonPage() {
  return (
    <>
      <section className="bg-moriartii-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-moriartii-primary mb-4">
              Horizon
            </h1>
            <p className="text-moriartii-secondary text-lg">
              Chez Moriartii Consulting, nous croyons fermement en la transformation et en la valorisation des entreprises du secteur informel en Afrique.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-serif font-bold text-moriartii-primary mb-4">
              Notre vision
            </h2>
            <p className="text-moriartii-secondary">
              Nous visons à transformer le paysage économique africain en intégrant des millions d'entreprises informelles dans l'économie formelle. En leur offrant les ressources et le soutien nécessaires, nous contribuons à la création d'emplois, à l'amélioration des conditions de vie et à une croissance économique durable.
            </p>
          </div>

          <h2 className="text-2xl font-serif font-bold text-moriartii-primary mb-8 text-center">
            Tableau des prix
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {horizonServices.map((service) => (
              <div key={service.id} className={service.id === 'premium' ? 'lg:col-start-2' : ''}>
                <PricingCard
                  title={service.title}
                  price={service.price}
                  period={service.period}
                  description={service.description}
                  features={service.features}
                  popular={service.popular}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-moriartii-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-serif font-bold text-moriartii-primary mb-6">
                Notre mission à long terme
              </h2>
              <p className="text-moriartii-secondary mb-4">
                Notre mission est de formaliser les activités informelles en les intégrant dans une structure légale et professionnelle, afin de leur offrir des opportunités de croissance et de développement durable.
              </p>
              <p className="text-moriartii-secondary mb-4">
                Nous accompagnons les entrepreneurs dans leur transition vers l'économie formelle en leur offrant :
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-moriartii-secondary">Des conseils juridiques et fiscaux adaptés</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-moriartii-secondary">Une assistance administrative complète</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-moriartii-secondary">Des formations en gestion d'entreprise</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-moriartii-secondary">Un accès facilité aux financements</span>
                </li>
              </ul>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Entrepreneurs africains"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}