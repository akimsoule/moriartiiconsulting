import CustomLink from '@/components/CustomLink';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-serif font-bold text-moriartii-primary mb-4">404</h1>
        <h2 className="text-2xl font-serif font-semibold text-moriartii-secondary mb-6">Page non trouvée</h2>
        <p className="text-moriartii-secondary mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <CustomLink 
          href="/"
          className="btn btn-primary px-6 py-3 rounded-md inline-flex items-center"
        >
          Retour à l'accueil
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
          </svg>
        </CustomLink>
      </div>
    </div>
  );
}