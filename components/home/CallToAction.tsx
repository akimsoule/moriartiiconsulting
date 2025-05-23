import CustomLink from '../CustomLink';

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-moriartii-primary to-moriartii-secondary py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
          Prêt à transformer vos défis en opportunités ?
        </h2>
        <p className="text-white/80 max-w-3xl mx-auto mb-8 text-lg">
          Contactez-nous dès aujourd'hui pour discuter de vos besoins spécifiques et découvrir comment Moriartii Consulting peut vous aider à atteindre vos objectifs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CustomLink 
            href="/contact"
            className="btn bg-white text-moriartii-primary hover:bg-moriartii-accent hover:text-white transition-colors duration-300 px-8 py-3 rounded-md font-medium"
          >
            Nous contacter
          </CustomLink>
          <CustomLink 
            href="/services"
            className="btn border-2 border-white text-white hover:bg-white hover:text-moriartii-primary transition-colors duration-300 px-8 py-3 rounded-md font-medium"
          >
            Explorer nos services
          </CustomLink>
        </div>
      </div>
    </section>
  );
}