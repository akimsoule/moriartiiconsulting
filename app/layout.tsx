import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecaptchaScript from "@/components/other/RecaptchaScript";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moriartii Consulting | Service de Consultation Juridique et Audit",
  description:
    "Moriartii Consulting offre des services de consultation juridique, audit fiscal, et conseils stratégiques pour les entreprises en France et à l'international.",
  keywords:
    "consultation juridique, audit fiscal, conseil fiscal, prix de transfert, stratégie fiscale, TVA internationale, Moriartii Consulting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-theme="moriartii">
      <head>
        <link rel="icon" href="/legal.png" />
        <RecaptchaScript siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="min-h-[70vh] flex flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
