import ContactForm from "@/components/ui/contact-form";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { faqs } from "@/lib/data";
import { Calendar, Mail, Phone } from "lucide-react";

export default function FaqPage() {
  return (
    <>
      <section className="bg-moriartii-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-moriartii-primary mb-4">
              FAQ & RDV
            </h1>
            <p className="text-moriartii-secondary text-lg">
              Une Assistance Juridique Complète et Spécialisée - Trouvez les réponses à vos questions et prenez rendez-vous avec nos experts.
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
                    <span className="text-moriartii-secondary">+33 (0)1 XX XX XX XX</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-moriartii-primary mr-3" />
                    <span className="text-moriartii-secondary">contact@moriartiiconsulting.com</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-moriartii-primary mr-3" />
                    <span className="text-moriartii-secondary">Lundi - Vendredi : 9h00 - 18h00</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-serif font-semibold text-moriartii-primary mb-4">
                Nous Contacter
              </h3>
              <p className="text-moriartii-secondary mb-6">
                Contactez-nous en utilisant le formulaire ci-dessous. Nous sommes impatients de vous entendre et de vous aider avec vos besoins.
              </p>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}