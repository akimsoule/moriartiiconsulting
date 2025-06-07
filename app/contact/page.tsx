import ContactForm from "@/components/contact/contact-form";
import { Mail, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Moriartii Consulting",
  description:
    "Contactez Moriartii Consulting pour toute question ou demande d'accompagnement en fiscalité internationale, droit des affaires et stratégie d'entreprise.",
  openGraph: {
    title: "Contact | Moriartii Consulting",
    description:
      "Contactez Moriartii Consulting pour toute question ou demande d'accompagnement en fiscalité internationale, droit des affaires et stratégie d'entreprise.",
    siteName: "Moriartii Consulting",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
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
                      +33 7 45 72 75 67
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-moriartii-primary mr-4" />
                  <div>
                    <p className="text-moriartii-secondary text-sm">Email</p>
                    <p className="text-moriartii-primary font-medium">
                      moriartiiconsulting@proton.me
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
