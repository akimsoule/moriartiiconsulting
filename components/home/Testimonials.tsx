"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const nextTestimonial = () => {
    if (!animating) {
      setAnimating(true);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const prevTestimonial = () => {
    if (!animating) {
      setAnimating(true);
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-moriartii-primary text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Expériences Réelles, Succès Réels
          </h2>
          <p className="text-moriartii-accent max-w-3xl mx-auto">
            La perspicacité et l'expertise de Moriartii Consulting ont transformé notre stratégie commerciale. Hautement recommandé pour des résultats exceptionnels.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative bg-moriartii-secondary rounded-lg p-8 md:p-12 shadow-xl">
            <Quote className="absolute text-moriartii-accent opacity-20 top-4 left-4 h-24 w-24" />
            
            <div className="relative z-10">
              <div
                className={`transition-opacity duration-500 ${
                  animating ? "opacity-0" : "opacity-100"
                }`}
              >
                <p className="text-lg md:text-xl mb-6 italic">
                  "{testimonials[activeIndex].text}"
                </p>
                <div>
                  <p className="font-semibold">{testimonials[activeIndex].name}</p>
                  {testimonials[activeIndex].company && (
                    <p className="text-moriartii-accent text-sm">{testimonials[activeIndex].company}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="bg-white text-moriartii-primary p-2 rounded-full hover:bg-moriartii-accent hover:text-white transition-colors duration-300"
              aria-label="Témoignage précédent"
              disabled={animating}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!animating) {
                      setAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setAnimating(false), 500);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeIndex === index ? "bg-white" : "bg-moriartii-accent bg-opacity-50 hover:bg-opacity-75"
                  }`}
                  aria-label={`Voir témoignage ${index + 1}`}
                  disabled={animating}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="bg-white text-moriartii-primary p-2 rounded-full hover:bg-moriartii-accent hover:text-white transition-colors duration-300"
              aria-label="Témoignage suivant"
              disabled={animating}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}