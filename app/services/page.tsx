import { services } from "@/lib/data";
import ServiceCard from "@/app/services/ServiceCard";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";
import CustomLink from "@/components/other/CustomLink";
import {
  createMetadata,
  breadcrumbStructuredData,
  serviceStructuredData,
} from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import Image from "next/image";

export const metadata: Metadata = createMetadata({
  title: "Services de Conseil Juridique et Fiscal",
  description:
    "Découvrez nos services de consultation juridique, audit fiscal, prix de transfert et conseils stratégiques. Expertise reconnue pour entreprises et entrepreneurs.",
  keywords: [
    "services juridiques",
    "audit fiscal",
    "conseil fiscal",
    "prix de transfert",
    "TVA internationale",
    "stratégie entreprise",
  ],
});

export default function ServicesPage() {
  const breadcrumbData = breadcrumbStructuredData([
    { name: "Accueil", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  const servicesStructuredData = services.map((service) =>
    serviceStructuredData({
      name: service.title,
      description: service.description,
      provider: "Moriartii Consulting",
      serviceType: "Professional Service",
    })
  );

  return (
    <>
      <StructuredData data={breadcrumbData} />
      {servicesStructuredData.map((data, index) => (
        <StructuredData key={index} data={data} />
      ))}

      <section className="bg-moriartii-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-moriartii-primary mb-4">
              Nos Services d&apos;Assistances
            </h1>
            <p className="text-moriartii-secondary text-lg">
              Chez Moriartii Consulting, nous offrons une gamme complète de
              services de consultation juridique et fiscale pour répondre aux
              besoins spécifiques de votre entreprise.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-moriartii-primary text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">
                Notre Approche
              </h2>
              <p className="text-white/80 text-lg mb-6">
                Chez Moriartii Consulting, nous croyons en une approche
                personnalisée et stratégique pour répondre aux besoins
                spécifiques de chaque client. Notre méthode se distingue par :
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-xl mb-1">
                      Expertise spécialisée
                    </h3>
                    <p className="text-white/80">
                      Notre équipe est composée d&apos;experts dans différents
                      domaines du droit et de la fiscalité, offrant ainsi une
                      expertise pointue et spécialisée.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-xl mb-1">
                      Solutions sur mesure
                    </h3>
                    <p className="text-white/80">
                      Nous développons des stratégies adaptées aux besoins
                      spécifiques de chaque client, prenant en compte leurs
                      objectifs commerciaux et leur environnement réglementaire.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-xl mb-1">
                      Approche proactive
                    </h3>
                    <p className="text-white/80">
                      Nous anticipons les défis et les opportunités, permettant
                      à nos clients de prendre des décisions éclairées et
                      d&apos;éviter les risques potentiels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Image
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Notre équipe en consultation"
              width={1260}
              height={750}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-moriartii-primary mb-4">
              Prêt à transformer vos défis en opportunités ?
            </h2>
            <p className="text-moriartii-secondary mb-8">
              Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins
              spécifiques et découvrir comment Moriartii Consulting peut vous
              aider à atteindre vos objectifs.
            </p>
            <CustomLink
              href="/faq-rdv"
              className="btn btn-primary px-6 py-3 rounded-md inline-flex items-center"
            >
              Prendre rendez-vous
              <ArrowRight className="ml-2 h-5 w-5" />
            </CustomLink>
          </div>
        </div>
      </section>
    </>
  );
}
