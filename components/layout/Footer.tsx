import CustomLink from "../CustomLink";
import { Spade } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-moriartii-primary text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-serif font-bold mb-4">
              Moriartii Consulting
            </h3>
            <p className="text-sm mb-4">
              Expertise en consultation juridique, audit fiscal, et stratégie
              d'entreprise. Nous accompagnons les entreprises dans leurs défis
              juridiques et fiscaux en France et à l'international.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <CustomLink
                  href="/services"
                  className="relative text-sm transition-colors duration-200 text-white hover:text-gray-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                    active:text-moriartii-accent visited:text-moriartii-accent"
                >
                  Nos services d'assistances
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/horizon"
                  className="relative text-sm transition-colors duration-200 text-white hover:text-gray-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                    active:text-moriartii-accent visited:text-moriartii-accent"
                >
                  Informel formalité
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/team"
                  className="relative text-sm transition-colors duration-200 text-white hover:text-gray-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                    active:text-moriartii-accent visited:text-moriartii-accent"
                >
                  Équipe
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/faq-rdv"
                  className="relative text-sm transition-colors duration-200 text-white hover:text-gray-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                    active:text-moriartii-accent visited:text-moriartii-accent"
                >
                  FAQ & RDV
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/blog"
                  className="relative text-sm transition-colors duration-200 text-white hover:text-gray-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                    active:text-moriartii-accent visited:text-moriartii-accent"
                >
                  Articles
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/contact"
                  className="relative text-sm transition-colors duration-200 text-white hover:text-gray-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                    active:text-moriartii-accent visited:text-moriartii-accent"
                >
                  Contact
                </CustomLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Services</h4>
            <ul className="space-y-2">
              <li>
                <CustomLink
                  href="/services#fiscalite"
                  className="relative text-sm transition-colors duration-200 text-white hover:text-gray-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                    active:text-moriartii-accent visited:text-moriartii-accent"
                >
                  Fiscalité Internationale
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/services#tva"
                  className="relative text-sm transition-colors duration-200 text-white hover:text-gray-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                    active:text-moriartii-accent visited:text-moriartii-accent"
                >
                  Conseil en TVA
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/services#restructuration"
                  className="relative text-sm transition-colors duration-200 text-white hover:text-gray-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                    active:text-moriartii-accent visited:text-moriartii-accent"
                >
                  Restructuration
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/services#droit-affaires"
                  className="relative text-sm transition-colors duration-200 text-white hover:text-gray-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                    active:text-moriartii-accent visited:text-moriartii-accent"
                >
                  Droit des Affaires
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/services#formation"
                  className="relative text-sm transition-colors duration-200 text-white hover:text-gray-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                    active:text-moriartii-accent visited:text-moriartii-accent"
                >
                  Formation et Veille
                </CustomLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Contact</h4>
            <p className="text-sm break-words break-all">
              Email: contact@moriartiiconsulting.com
            </p>
            <p className="text-sm mb-4">Téléphone: +33 (0)1 XX XX XX XX</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center relative">
          <p className="text-sm">
            © {currentYear} Moriartii Consulting. Tous droits réservés.
          </p>
          <p className="text-xs mt-2">
            <CustomLink
              href="/privacy"
              className="relative hover:text-gray-300 transition-colors duration-200 text-white
                after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                active:text-moriartii-accent visited:text-moriartii-accent"
            >
              Politique de confidentialité
            </CustomLink>
            {" | "}
            <CustomLink
              href="/terms"
              className="relative hover:text-gray-300 transition-colors duration-200 text-white
                after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300
                active:text-moriartii-accent visited:text-moriartii-accent"
            >
              Conditions d'utilisation
            </CustomLink>
          </p>
        </div>

        <div className="flex justify-end h-2 opacity-20">
          {/* Lien discret dashboard, visible uniquement pour le propriétaire (par exemple, via un mot-clé dans le localStorage ou un clic secret) */}
          <a
            href="/dashboard"
            tabIndex={-1}
            aria-label="dashboard"
            className="flex items-center justify-center bg-moriartii-secondary rounded-full hover:opacity-100 transition-opacity duration-300"
          >
            {/* Icône as de pique Lucide React */}
            <Spade size={18} color="white" style={{ display: "block" }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
