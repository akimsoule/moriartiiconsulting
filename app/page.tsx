import AboutUs from "@/components/home/AboutUs";
import CallToAction from "@/components/home/CallToAction";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import ContactForm from "@/components/ui/contact-form";
import { CheckCircle2, FileText, Shield } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil | Moriartii Consulting",
  description:
    "Moriartii Consulting accompagne les entreprises et entrepreneurs en fiscalité internationale, droit des affaires et stratégie. Découvrez nos services, notre équipe et nos conseils pour une croissance durable.",
  openGraph: {
    title: "Accueil | Moriartii Consulting",
    description:
      "Moriartii Consulting accompagne les entreprises et entrepreneurs en fiscalité internationale, droit des affaires et stratégie. Découvrez nos services, notre équipe et nos conseils pour une croissance durable.",
    siteName: "Moriartii Consulting",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-moriartii-light p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <FileText className="h-10 w-10 text-moriartii-primary mb-4" />
              <h3 className="text-xl font-serif font-bold text-moriartii-primary mb-2">
                Déclarations fiscales
              </h3>
              <p className="text-moriartii-secondary">
                Nous aidons à la préparation et à la soumission des déclarations
                fiscales pour s'assurer qu'elles sont conformes aux lois
                fiscales en vigueur
              </p>
            </div>

            <div className="bg-moriartii-light p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <Shield className="h-10 w-10 text-moriartii-primary mb-4" />
              <h3 className="text-xl font-serif font-bold text-moriartii-primary mb-2">
                Optimisation fiscale
              </h3>
              <p className="text-moriartii-secondary">
                Nous aidons à définir des stratégies pour réduire la charge
                fiscale globale, telles que le choix de la structure juridique
                la plus avantageuse pour une entreprise ou la planification de
                la succession
              </p>
            </div>

            <div className="bg-moriartii-light p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <CheckCircle2 className="h-10 w-10 text-moriartii-primary mb-4" />
              <h3 className="text-xl font-serif font-bold text-moriartii-primary mb-2">
                Audit fiscal
              </h3>
              <p className="text-moriartii-secondary">
                Nous éffectuons un examen approfondi des comptes et des
                déclarations fiscales des entreprises ou des particuliers pour
                vérifier leur conformité avec les lois fiscales en vigueur.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Services />

      <AboutUs />

      <Testimonials />

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-moriartii-primary mb-6">
                Entrer en contact
              </h2>
              <p className="text-moriartii-secondary mb-8">
                Envoyez-nous un message et nous vous répondrons dans les plus
                brefs délais.
              </p>

              <ContactForm />
            </div>

            <div className="bg-moriartii-light p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-serif font-bold text-moriartii-primary mb-4">
                Croissance Durable
              </h3>
              <p className="text-moriartii-secondary mb-6">
                Approche personnalisée, impacts durables. Chez Moriartii
                Consulting, nous offrons des solutions personnalisées pour créer
                des impacts durables et significatifs dans votre entreprise.
              </p>

              <div className="space-y-4">
                {[
                  "Analyse approfondie de votre situation",
                  "Stratégies adaptées à vos besoins",
                  "Suivi personnalisé",
                  "Résultats mesurables",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-moriartii-secondary">{item}</span>
                  </div>
                ))}
              </div>

              <hr className="my-6 border-gray-300" />

              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-moriartii-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-moriartii-secondary text-sm">
                    Téléphonez-nous
                  </p>
                  <p className="text-moriartii-primary font-medium">
                    +33 (0)1 XX XX XX XX
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-moriartii-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-moriartii-secondary text-sm">
                    Envoyez-nous un email
                  </p>
                  <p className="text-moriartii-primary font-medium break-words break-all">
                    contact@moriartiiconsulting.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
