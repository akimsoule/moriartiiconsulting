"use client";

import { useEffect, useState } from "react";
import { companyValues } from "@/lib/data";

export default function AboutUs() {
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % companyValues.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-moriartii-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-moriartii-primary mb-6">
              À propos de nous
            </h2>
            <p className="text-moriartii-secondary text-lg mb-6">
              Moriartii Consulting est un cabinet de conseil pluridisciplinaire. Nous offrons une gamme complète de services.
            </p>
            <p className="text-moriartii-secondary mb-8">
              Notre équipe expérimentée est dédiée à fournir des conseils de haute qualité et des solutions sur mesure à nos clients, en les aidant à naviguer dans un environnement juridique complexe et en constante évolution.
            </p>

            <div className="space-y-6">
              <h3 className="text-xl font-serif font-semibold text-moriartii-primary">
                Nos valeurs
              </h3>
              <div className="flex flex-wrap gap-2">
                {companyValues.map((value, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      activeValue === index
                        ? "bg-moriartii-primary text-white"
                        : "bg-white text-moriartii-primary hover:bg-moriartii-secondary hover:text-white"
                    }`}
                    onClick={() => setActiveValue(index)}
                  >
                    {value.title}
                  </button>
                ))}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500">
                <h4 className="text-lg font-serif font-semibold text-moriartii-primary mb-2">
                  {companyValues[activeValue].title}
                </h4>
                <p className="text-moriartii-secondary">
                  {companyValues[activeValue].description}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Notre équipe au travail"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="text-moriartii-primary font-serif font-bold text-2xl">
                10+ ans
              </p>
              <p className="text-moriartii-secondary">
                d'expertise
              </p>
            </div>
            <div className="absolute -top-8 -right-8 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="text-moriartii-primary font-serif font-bold text-2xl">
                100+
              </p>
              <p className="text-moriartii-secondary">
                clients satisfaits
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}