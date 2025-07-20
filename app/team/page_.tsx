import { teamMembers } from "@/lib/data";
import TeamMember from "@/components/team/TeamMember";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import CustomLink from "@/components/other/CustomLink";

export const metadata: Metadata = {
  title: "Équipe | Moriartii Consulting",
  description:
    "Découvrez les experts de Moriartii Consulting, spécialisés en fiscalité internationale, droit des affaires et stratégie d'entreprise. Notre équipe vous accompagne dans vos projets juridiques et fiscaux.",
  openGraph: {
    title: "Équipe | Moriartii Consulting",
    description:
      "Découvrez les experts de Moriartii Consulting, spécialisés en fiscalité internationale, droit des affaires et stratégie d'entreprise.",
    siteName: "Moriartii Consulting",
    type: "website",
  },
};

export default function TeamPage() {
  return (
    <>
      <section className="bg-moriartii-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-moriartii-primary mb-4">
              Rencontrez notre équipe
            </h1>
            <p className="text-moriartii-secondary text-lg">
              Découvrez les experts qui composent l&apos;équipe de Moriartii
              Consulting, dédiée à vous fournir des services de consultation
              juridique et fiscale de premier ordre.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-moriartii-primary mb-6">
              Expert en Fiscalité Internationale et Stratégie Juridique
              d&apos;Entreprise
            </h2>

            <p className="text-moriartii-secondary mb-6">
              Naviguer dans la complexité fiscale et juridique internationale
              nécessite bien plus qu&apos;une simple compréhension des lois : cela
              demande une vision stratégique, une capacité à anticiper les
              risques et à transformer des défis réglementaires en véritables
              leviers de performance. C&apos;est précisément ce que Afiz SOULE
              apporte à ses clients.
            </p>

            <p className="text-moriartii-secondary mb-6">
              Fort d&apos;un Mastère Spécialisé en Management Juridique des Affaires
              (TBS Education, Toulouse) et d&apos;un Master en Droit des Affaires et
              Fiscalité, Afiz SOULE a su transformer ses solides connaissances
              académiques en solutions concrètes pour les entreprises
              confrontées à des environnements fiscaux et réglementaires en
              constante évolution. Ses recherches approfondies, récompensées par
              des mentions très bien, témoignent de son expertise pointue. Son
              mémoire sur « La sécurité juridique des GREEN PPA Intragroupe »
              met en lumière sa maîtrise des défis juridiques liés aux énergies
              renouvelables, tandis que son étude sur « Les méthodes de
              détermination et de contrôle des prix de transfert » reflète sa
              compréhension avancée des enjeux fiscaux internationaux.
            </p>

            <p className="text-moriartii-secondary mb-6">
              Mais c&apos;est sur le terrain que Afiz démontre toute la valeur de son
              expertise. Lors de ses expériences, il a accompagné des
              entreprises dans la gestion stratégique des prix de transfert, la
              conformité TVA en France et à l&apos;international, et l&apos;analyse des
              impacts fiscaux lors de restructurations complexes (fusions,
              acquisitions, cessions). Sa capacité à naviguer entre les
              conventions fiscales internationales (France, Luxembourg, Pologne,
              Italie, Espagne, Allemagne, Afrique) et à identifier des
              opportunités d&apos;optimisation fiscale fait de lui un atout clé pour
              les entreprises opérant à l&apos;échelle mondiale.
            </p>

            <p className="text-moriartii-secondary mb-8">
              Au-delà des aspects techniques, Afiz se distingue par sa vision
              stratégique. Il ne s&apos;agit pas simplement de respecter les
              obligations fiscales, mais de transformer chaque défi
              réglementaire en une opportunité de croissance. Grâce à une veille
              fiscale proactive et à une approche orientée résultats, il
              anticipe les risques, sécurise les opérations et accompagne ses
              clients dans la prise de décisions cruciales.
            </p>

            <div className="flex justify-center">
              <CustomLink
                href="/contact"
                className="btn btn-primary px-6 py-3 rounded-md inline-flex items-center"
              >
                Contactez notre équipe
                <ArrowRight className="ml-2 h-5 w-5" />
              </CustomLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
