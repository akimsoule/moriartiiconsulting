"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-gradient-to-b from-moriartii-light to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-moriartii-primary leading-tight">
              Saisissez <span className="text-moriartii-secondary">Succès</span>
            </h1>
            <p className="text-xl md:text-2xl font-serif text-moriartii-secondary">
              Transformez Vos Défis en Opportunités.
            </p>
            <p className="text-moriartii-secondary text-lg">
              Maximisez votre potentiel en transformant les obstacles en succès avec nos solutions de conseil stratégique.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="btn btn-primary px-6 py-3 rounded-md inline-flex items-center justify-center"
              >
                Nos services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="btn btn-outline border-moriartii-primary text-moriartii-primary hover:bg-moriartii-primary hover:text-white px-6 py-3 rounded-md inline-flex items-center justify-center"
              >
                Nous contacter
              </Link>
            </div>
          </div>

          <div
            className={`rounded-lg overflow-hidden shadow-xl transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Consultation professionnelle"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}