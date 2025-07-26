"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Libre_Franklin } from "next/font/google";
import CustomLink from "../other/CustomLink";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Nos services d'assistances", href: "/services" },
    { name: "Informel formalité", href: "/horizon" },
    { name: "FAQ & RDV", href: "/faq-rdv" },
    { name: "Articles", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <CustomLink href="/" className="flex items-center">
            <span
              className={`${libreFranklin.className} font-bold text-2xl md:text-3xl text-moriartii-primary`}
            >
              Moriartii Consulting
            </span>
          </CustomLink>

          {/* Desktop Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <CustomLink
                key={link.name}
                href={link.href}
                className="relative text-moriartii-secondary hover:text-moriartii-primary font-medium transition-colors duration-200
    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-moriartii-primary after:transition-all after:duration-300
    active:text-moriartii-primary visited:text-moriartii-accent"
              >
                {link.name}
              </CustomLink>
            ))}
          </nav> */}

          {/* Mobile Drawer Button */}
          <button
            className="text-moriartii-primary"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={50} />
          </button>
        </div>
      </div>

      {/* Drawer Mobile */}
      <div
        className={`drawer drawer-end fixed inset-0 z-[100] ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <input
          type="checkbox"
          className="drawer-toggle"
          checked={isMenuOpen}
          readOnly
        />
        <div
          className={`drawer-side transition-all duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <label
            className="drawer-overlay bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          ></label>
          <div className="relative w-full min-h-full bg-white flex">
            <div className="container mx-auto px-4 py-3">
              <div className="h-full flex flex-col">
                <div className="flex justify-end">
                  <button
                    className=" text-moriartii-primary"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Fermer le menu"
                  >
                    <X size={50} />
                  </button>
                </div>

                <div className="flex-grow flex items-center justify-center">
                  <ul className="menu p-8 w-full flex flex-col gap-6 items-center justify-center">
                    {navLinks.map((link) => (
                      <li key={link.name} className="w-full flex items-center">
                        <CustomLink
                          href={link.href}
                          className="w-full flex justify-center relative font-medium text-moriartii-secondary hover:text-moriartii-primary transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-moriartii-primary after:transition-all after:duration-300 active:text-moriartii-primary visited:text-moriartii-accent text-center"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </CustomLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
