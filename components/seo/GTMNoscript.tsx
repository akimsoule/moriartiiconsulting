interface GTMNoscriptProps {
  gtm_id: string
}

export default function GTMNoscript({ gtm_id }: GTMNoscriptProps) {
  if (!gtm_id || gtm_id === "") return null;

  return (
    <noscript>
      <iframe 
        src={`https://www.googletagmanager.com/ns.html?id=${gtm_id}`}
        height="0" 
        width="0" 
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
