export default function CustomHead() {
  return (
    <>
      {/* DNS Prefetch pour améliorer les performances */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//images.pexels.com" />
      
      {/* Preconnect pour Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Viewport meta pour responsive design */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      
      {/* Sécurité et performance */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Couleur de thème pour navigateurs mobiles */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      
      {/* Apple touch icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/legal.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Moriartii Consulting" />
      
      {/* Manifeste pour PWA (optionnel) */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preload critical resources */}
      <link rel="preload" href="/legal.png" as="image" type="image/png" />
    </>
  );
}
