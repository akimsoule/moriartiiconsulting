import FaqAccordion from "@/components/faq/FaqAccordion";
import { faqs } from "@/lib/data";
import { getContactInfo } from "@/lib/contact";
import { Calendar, Mail, Phone } from "lucide-react";
import { Metadata } from "next";
import PublicRdvForm from "@/app/faq-rdv/PublicRdvForm";
import { createMetadata, breadcrumbStructuredData, faqStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = createMetadata({
  title: "FAQ et Prise de Rendez-vous",
  description: "Questions fréquentes sur nos services juridiques et fiscaux. Prenez rendez-vous avec nos experts en droit des affaires et fiscalité internationale.",
  keywords: ["FAQ conseil juridique", "rendez-vous expert fiscal", "questions juridiques", "consultation personnalisée"]
});

export default async function FaqPage() {
  const contactInfo = await getContactInfo();
  
  const breadcrumbData = breadcrumbStructuredData([
    { name: "Accueil", url: "/" },
    { name: "FAQ & RDV", url: "/faq-rdv" }
  ]);

  const faqData = faqStructuredData(faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <StructuredData data={faqData} />
      <section className="bg-moriartii-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-moriartii-primary mb-4">
              FAQ & RDV
            </h1>
            <p className="text-moriartii-secondary text-lg">
              Une Assistance Juridique Complète et Spécialisée - Trouvez les
              réponses à vos questions et prenez rendez-vous avec nos experts.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif font-bold text-moriartii-primary mb-6">
                FAQ
              </h2>
              <FaqAccordion faqs={faqs} />
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-moriartii-primary mb-6">
                Prise de rendez-vous
              </h2>

              <div className="bg-moriartii-light p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-serif font-semibold text-moriartii-primary mb-4">
                  Nos coordonnées
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-moriartii-primary mr-3" />
                    <span className="text-moriartii-secondary">
                      {contactInfo.phone}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-moriartii-primary mr-3" />
                    <span className="text-moriartii-secondary">
                      {contactInfo.email}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-moriartii-primary mr-3" />
                    <span className="text-moriartii-secondary">
                      Lundi - Vendredi : 9h00 - 18h00
                    </span>
                  </div>
                </div>
              </div>

              {/* Formulaire de prise de rendez-vous public */}
              <div className="mt-10">
                <h3 className="text-xl font-serif font-semibold text-moriartii-primary mb-4">
                  Prendre rendez-vous
                </h3>
                <PublicRdvForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
