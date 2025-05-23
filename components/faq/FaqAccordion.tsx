"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/data";

interface FaqAccordionProps {
  faqs: FAQ[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden bg-white"
        >
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-content-${index}`}
          >
            <h3 className="text-lg font-medium text-moriartii-primary">
              {faq.question}
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-moriartii-secondary transition-transform duration-300 ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
          <div
            id={`faq-content-${index}`}
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openIndex === index ? "max-h-96 py-4 px-6" : "max-h-0"
            }`}
          >
            <p className="text-moriartii-secondary">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}