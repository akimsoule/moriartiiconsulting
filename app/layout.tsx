import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecaptchaScript from "@/components/other/RecaptchaScript";
import StructuredData from "@/components/seo/StructuredData";
import CustomHead from "@/components/seo/CustomHead";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import GTMNoscript from "@/components/seo/GTMNoscript";
import { createMetadata, siteConfig } from "@/lib/seo";

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

export const metadata: Metadata = createMetadata({
  title: "Cabinet de Conseil Juridique et Fiscal International",
  description: "Moriartii Consulting offre des services de consultation juridique, audit fiscal, et conseils stratégiques pour les entreprises en France et à l'international.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-theme="moriartii">
      <head>
        <CustomHead />
        <link rel="icon" href="/legal.png" />
        <RecaptchaScript siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />
        <StructuredData data={JSON.stringify(siteConfig.structuredData)} />
        {/* Google Tag Manager - Head */}
        <GoogleAnalytics gtm_id={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans`}
      >
        {/* Google Tag Manager (noscript) - Body */}
        <GTMNoscript gtm_id={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="min-h-[70vh] flex flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
