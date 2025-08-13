import ContactForm from "@/components/contact/contact-form";
import { getContactInfo } from "@/lib/contact";
import { Mail, Phone } from "lucide-react";
import { Metadata } from "next";
import { createMetadata, breadcrumbStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = createMetadata({
  title: "Contact - Demande de Conseil Juridique et Fiscal",
  description: "Contactez Moriartii Consulting pour vos besoins en droit des affaires, fiscalité internationale et stratégie d'entreprise. Consultation personnalisée.",
  keywords: ["contact conseil juridique", "consultation fiscale", "demande rendez-vous", "expert fiscal Paris"]
});

export default async function ContactPage() {
  const contactInfo = await getContactInfo();
  
  const breadcrumbData = breadcrumbStructuredData([
    { name: "Accueil", url: "/" },
    { name: "Contact", url: "/contact" }
  ]);

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <section className="bg-moriartii-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-moriartii-primary mb-4">
              Contactez-nous
            </h1>
            <p className="text-moriartii-secondary text-lg">
              Une question, un projet ou besoin d’un accompagnement ? Remplissez
              le formulaire ou utilisez nos coordonnées ci-dessous. Notre équipe
              vous répondra rapidement.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-serif font-bold text-moriartii-primary mb-6">
                Formulaire de contact
              </h2>
              <ContactForm />
            </div>
            <div className="bg-moriartii-light p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-serif font-bold text-moriartii-primary mb-4">
                Nos coordonnées
              </h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-moriartii-primary mr-4" />
                  <div>
                    <p className="text-moriartii-secondary text-sm">
                      Téléphone
                    </p>
                    <p className="text-moriartii-primary font-medium">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-moriartii-primary mr-4" />
                  <div>
                    <p className="text-moriartii-secondary text-sm">Email</p>
                    <p className="text-moriartii-primary font-medium">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-moriartii-secondary text-sm mb-1">
                    Horaires
                  </p>
                  <p className="text-moriartii-primary font-medium">
                    Lundi - Vendredi : 9h00 - 18h00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
