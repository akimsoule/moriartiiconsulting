export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  url: string;
  html: string;
  excerpt: string;
  date: string;
  author?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  company?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Function to create slugs from titles
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Introduction à la Blockchain',
    slug: 'introduction-a-la-blockchain',
    url: 'https://moriartiiconsulting.com/blog/introduction-a-la-blockchain',
    html: `Bienvenue dans notre introduction à la #blockchain. La blockchain est une technologie révolutionnaire qui a le potentiel de transformer de nombreux secteurs, y compris la finance, la santé, l'immobilier et bien d'autres.

Qu'est-ce que la Blockchain ?

La blockchain est essentiellement un registre numérique décentralisé qui enregistre des transactions de manière sécurisée et transparente. Contrairement aux bases de données traditionnelles, la blockchain est distribuée sur un réseau d'ordinateurs, ce qui la rend extrêmement résistante à la fraude et à la manipulation.

La blockchain peut être comparée à un grand livre numérique décentralisé, accessible à tous les participants du réseau. Contrairement aux bases de données traditionnelles, la blockchain ne repose sur aucune autorité centrale. Au lieu de cela, elle utilise un réseau de nœuds (ordinateurs) qui valident et enregistrent les transactions de manière consensuelle.

Comment fonctionne-t-elle ?

Chaque transaction est regroupée dans un "bloc" et ajoutée à une chaîne de blocs existante, d'où le nom "blockchain". Chaque bloc est cryptographiquement lié au précédent, ce qui rend la modification des données pratiquement impossible.

Une fois qu'un bloc est rempli, il est scellé à l'aide d'une signature cryptographique et relié au bloc précédent, créant ainsi une chaîne continue de blocs. Cette structure en chaîne garantit l'intégrité et la séquentialité des transactions.

La décentralisation et la sécurité sont assurées par un mécanisme de consensus. Différents types de consensus existent, comme la preuve de travail (Proof of Work) ou la preuve d'enjeu (Proof of Stake), visant à valider les transactions de manière équitable et sécurisée.

Les avantages de la Blockchain

La blockchain offre de nombreux avantages, notamment la sécurité accrue, la transparence, l'efficacité et la réduction des coûts. Elle élimine également le besoin d'intermédiaires, ce qui peut accélérer les transactions et réduire les frais.

Applications de la Blockchain

La technologie de la blockchain est utilisée dans divers domaines, tels que les contrats intelligents, les paiements transfrontaliers, la traçabilité des produits, la gestion des identités, la santé, la donnée et bien plus encore.

Les défis à relever

Bien que la blockchain offre de nombreux avantages, il existe également des défis à relever, tels que la scalabilité, la réglementation et l'adoption généralisée. Cependant, de nombreuses entreprises et gouvernements travaillent sur des solutions pour surmonter ces défis.

Conclusion

La blockchain est une technologie révolutionnaire qui promet de transformer de nombreux aspects de notre vie quotidienne. Alors que nous continuons à explorer ses applications potentielles, il est clair que la blockchain est là pour rester et aura un impact significatif sur notre avenir.
`,
    excerpt: `La blockchain est une technologie révolutionnaire qui a le potentiel de transformer de nombreux secteurs, y compris la finance, la santé, l'immobilier et bien d'autres.`,
    date: 'Jan 31, 2024',
    author: 'Moriartii Consulting'
  },
  {
    id: '2',
    title: 'Web 3.0 en 2024 : Une Révolution Cruciale pour Entreprises et Particuliers',
    slug: 'web-3-0-en-2024-une-revolution-cruciale-pour-entreprises-et-particuliers',
    url: 'https://moriartiiconsulting.com/blog/web-3-0-en-2024-une-revolution-cruciale-pour-entreprises-et-particuliers',
    html: `En 2024, le Web 3.0 est sur le point de révolutionner la façon dont les entreprises et les particuliers interagissent avec la technologie. Cette évolution majeure promet d'apporter des changements significatifs dans la manière dont nous utilisons Internet au quotidien. Comprendre les implications du Web 3.0 est crucial pour rester compétitif dans un monde de plus en plus connecté.

Le Web 3.0, également connu sous le nom de Web sémantique, marque une transition vers un Internet plus intelligent, où les données sont interconnectées de manière plus significative. Cette nouvelle ère du Web met l'accent sur l'interopérabilité, la décentralisation et la sécurité des données, offrant ainsi de nouvelles opportunités pour les entreprises et les utilisateurs finaux.

La décentralisation est l'un des piliers du Web 3.0, offrant aux utilisateurs un plus grand contrôle sur leurs données et leur vie numérique. Les technologies de blockchain et de contrats intelligents jouent un rôle clé dans cette transition, offrant des solutions sécurisées et transparentes pour les transactions en ligne.

Les entreprises devront s'adapter à cette nouvelle réalité en repensant leurs modèles commerciaux et en explorant les opportunités offertes par le Web 3.0. La capacité à exploiter efficacement les données interconnectées et à offrir des expériences utilisateur personnalisées deviendra un avantage concurrentiel majeur.

En parallèle, les particuliers bénéficieront d'une plus grande autonomie et d'une meilleure protection de leur vie privée grâce au Web 3.0. Les applications décentralisées offriront de nouvelles façons d'interagir avec les services en ligne, tout en garantissant la souveraineté des données personnelles.

Il est essentiel pour les entreprises et les particuliers de se préparer à cette révolution imminente. La compréhension des concepts clés du Web 3.0, tels que la décentralisation, l'interopérabilité et la sécurité des données, sera cruciale pour tirer parti des opportunités offertes par cette nouvelle ère du Web.

Les développeurs de logiciels et les ingénieurs informatiques joueront un rôle essentiel dans la mise en œuvre de solutions basées sur le Web 3.0. La maîtrise des technologies émergentes telles que les contrats intelligents et les réseaux décentralisés sera une compétence précieuse dans un environnement numérique en évolution.

En conclusion, le Web 3.0 représente une révolution cruciale pour les entreprises et les particuliers. Cette transition vers un Internet plus intelligent et plus sécurisé ouvre de nouvelles perspectives et soulève des défis passionnants. En s'adaptant aux principes du Web 3.0, les acteurs du monde numérique pourront façonner l'avenir de manière innovante et durable.
`,
    excerpt: `En 2024, le Web 3.0 est sur le point de révolutionner la façon dont les entreprises et les particuliers interagissent avec la technologie. Cette évolution majeure promet d'apporter des changements significatifs.`,
    date: 'Jan 30, 2024',
    author: 'Afiz SOULE'
  },
  {
    id: '3',
    title: 'Introduction aux NFTs',
    slug: 'introduction-aux-nfts',
    url: 'https://moriartiiconsulting.com/blog/introduction-aux-nfts',
    html: `Les Tokens Non Fongibles (NFTs) ont émergé comme une force transformative, redéfinissant la propriété numérique et créant de nouvelles opportunités pour les artistes, les créateurs, et les collectionneurs. Dans cet article, nous explorerons en détail ce qu'est un NFT, comment il fonctionne, ses applications et les défis auxquels il fait face.

Qu'est-ce qu'un NFT ?

Les NFTs sont des jetons numériques uniques et non interchangeables créés sur une blockchain, souvent basée sur Ethereum. Chaque NFT est associé à une œuvre numérique spécifique, qu'il s'agisse d'art, de musique, de vidéos, de jeux, ou d'autres formes de contenu. La technologie des contrats intelligents est utilisée pour créer et gérer ces jetons, garantissant leur authenticité, leur propriété, et leur traçabilité.

Fonctionnement des NFTs

Les NFTs utilisent la blockchain pour enregistrer la provenance des œuvres, ce qui signifie que chaque transaction est enregistrée de manière transparente et immuable. Cette fonctionnalité assure l'authenticité de l'œuvre et permet aux créateurs de suivre son historique de propriété. Les NFTs sont souvent achetés et vendus sur des marchés dédiés, offrant une plateforme pour les échanges entre collectionneurs et investisseurs.

Applications des NFTs

Art Numérique : Les NFTs ont transformé le monde de l'art numérique en permettant aux artistes de monétiser directement leur travail. Des artistes numériques émergents aux créateurs renommés, tous ont trouvé dans les NFTs une nouvelle manière de valoriser leurs créations.

Musique et Vidéo : Les musiciens et les vidéastes utilisent également les NFTs pour distribuer et monétiser leurs œuvres. Les droits d'auteur et la propriété sont intégrés au NFT, simplifiant les paiements et les redevances.

Jeux Vidéo : Les NFTs sont intégrés aux jeux vidéo, permettant aux joueurs de posséder des actifs numériques uniques et de les échanger entre eux.

Défis et Controverses

Malgré son succès, l'utilisation des NFTs a suscité des préoccupations. La consommation énergétique élevée des blockchains, en particulier celles utilisant la preuve de travail, a été critiquée. De plus, la spéculation sur les prix, les risques de bulle spéculative, et les questions de droits d'auteur sont des aspects controversés du marché des NFTs.

Le Futur des NFTs

L'avenir des NFTs offre un immense potentiel pour transformer notre façon de percevoir et d'interagir avec les actifs numériques. À mesure que la technologie continue d'évoluer, nous pouvons nous attendre à voir émerger des applications innovantes et de nouveaux cas d'utilisation, étendant davantage la portée des NFTs à travers diverses industries.

Que vous soyez un artiste cherchant à tokeniser vos créations, un collectionneur à la recherche d'actifs numériques uniques, ou simplement curieux du phénomène NFT, le monde des tokens non fongibles offre une multitude d'opportunités à explorer et à exploiter.

Alors que les #NFTs continuent de captiver l'imagination des créateurs et des collectionneurs, il est évident qu'ils ont le potentiel de redéfinir la propriété et la valeur à l'ère numérique. Restez à l'écoute pour plus d'informations et de mises à jour sur l'évolution du paysage des NFTs !
`,
    excerpt: `Les Tokens Non Fongibles (NFTs) ont émergé comme une force transformative, redéfinissant la propriété numérique et créant de nouvelles opportunités pour les artistes, les créateurs, et les collectionneurs.`,
    date: 'Jan 31, 2024',
    author: 'Moriartii Consulting'
  },
  {
    id: '4',
    title: "Optimisez Votre Budget Énergétique : L'Importance des Contrats d'Achats d'Énergies Renouvelables",
    slug: 'optimisez-votre-budget-energetique-importance-des-contrats-achats-energies-renouvelables',
    url: 'https://moriartiiconsulting.com/blog/optimisez-votre-budget-energetique-importance-des-contrats-achats-energies-renouvelables',
    html: `Les contrats d'achats d'énergies renouvelables jouent un rôle crucial dans l'optimisation du budget énergétique des entreprises. En s'engageant à acheter de l'énergie renouvelable, les entreprises peuvent non seulement réduire leur empreinte carbone, mais aussi bénéficier d'avantages financiers significatifs.

Les énergies renouvelables, telles que l'énergie solaire et éolienne, offrent une solution durable et économique pour répondre aux besoins énergétiques des entreprises. En souscrivant à des contrats d'achats d'énergies renouvelables, les entreprises peuvent stabiliser leurs coûts énergétiques et réduire leur dépendance aux sources d'énergie traditionnelles.

Avantages des Contrats d'Achats d'Énergies Renouvelables

1. Réduction des coûts : Les contrats d'achats d'énergies renouvelables permettent aux entreprises de bénéficier de tarifs compétitifs et stables, réduisant ainsi leur exposition aux fluctuations des prix des combustibles fossiles.

2. Image de marque : En s'engageant à utiliser des énergies renouvelables, les entreprises renforcent leur image de responsabilité environnementale, ce qui peut être un avantage concurrentiel important.

3. Stabilité à long terme : Les contrats à long terme offrent une visibilité sur les coûts énergétiques, permettant aux entreprises de mieux planifier leur budget à long terme.

Stratégies pour Optimiser les Contrats d'Achats d'Énergies Renouvelables

1. Évaluation des besoins énergétiques : Il est crucial pour les entreprises d'analyser leurs besoins énergétiques afin de déterminer la quantité d'énergie renouvelable nécessaire pour optimiser leur budget.

2. Négociation compétente : Travailler avec des experts en énergies renouvelables peut aider les entreprises à négocier des contrats avantageux et adaptés à leurs besoins spécifiques.

3. Surveillance constante : La surveillance continue des marchés de l'énergie renouvelable permet aux entreprises de saisir les opportunités d'optimisation de leurs contrats.

En conclusion, les contrats d'achats d'énergies renouvelables offrent aux entreprises une opportunité unique d'optimiser leur budget énergétique tout en contribuant à la transition vers une économie plus durable. En adoptant une approche stratégique et en s'associant à des fournisseurs d'énergies renouvelables fiables, les entreprises peuvent réaliser des économies significatives tout en renforçant leur engagement envers la responsabilité environnementale.
`,
    excerpt: `Les contrats d'achats d'énergies renouvelables jouent un rôle crucial dans l'optimisation du budget énergétique des entreprises.`,
    date: 'Apr 07, 2024',
    author: 'Afiz SOULE'
  },
  {
    id: '5',
    title: "Les Essentiels d'un Contrat International Réussi : Conseils Pratiques",
    slug: 'les-essentiels-d-un-contrat-international-reussi-conseils-pratiques',
    url: 'https://moriartiiconsulting.com/blog/les-essentiels-d-un-contrat-international-reussi-conseils-pratiques',
    html: `La signature d'un contrat international est une étape cruciale pour toute entreprise qui souhaite se développer à l'étranger. Cependant, la rédaction et la négociation d'un tel contrat peuvent être complexes et nécessitent une attention particulière. Dans cet article, nous vous donnerons quelques conseils pratiques pour vous aider à réussir vos contrats internationaux.

Définir clairement les objectifs

Avant de rédiger un contrat international, il est essentiel de définir clairement les objectifs de votre entreprise. Qu'attendez-vous de ce contrat ? Quels sont vos besoins et vos attentes ? Cette étape vous permettra de définir les termes et les conditions du contrat de manière précise.

Choisir la loi applicable

Lors de la rédaction d'un contrat international, il est important de choisir la loi applicable. Cela déterminera les règles juridiques qui régiront le contrat en cas de litige. Il est recommandé de faire appel à un avocat spécialisé dans le droit international pour vous aider dans cette démarche.

Rédiger des clauses claires et précises

Les clauses du contrat doivent être rédigées de manière claire et précise afin d'éviter toute ambiguïté. Utilisez un langage simple et évitez les termes juridiques complexes. N'hésitez pas à faire appel à un traducteur professionnel pour vous assurer que le contrat est compréhensible dans la langue du partenaire commercial.

Négocier avec flexibilité

La négociation est une étape essentielle dans la conclusion d'un contrat international. Il est important de faire preuve de flexibilité et d'ouverture d'esprit. Soyez prêt à faire des compromis et à trouver des solutions qui conviennent aux deux parties.

Vérifier les antécédents du partenaire

Avant de signer un contrat international, il est recommandé de vérifier les antécédents et la réputation du partenaire commercial. Faites des recherches sur son historique, ses références et ses performances passées. Cela vous aidera à prendre une décision éclairée et à minimiser les risques.

Prévoir des clauses de résolution des litiges

Il est important d'inclure des clauses de résolution des litiges dans votre contrat international. Ces clauses spécifient les mécanismes à suivre en cas de différend entre les parties. Il est recommandé d'inclure une clause de médiation ou d'arbitrage pour résoudre les litiges de manière efficace.

Surveiller l'exécution du contrat

Une fois le contrat signé, il est essentiel de surveiller son exécution. Assurez-vous que toutes les parties respectent leurs obligations contractuelles. En cas de non-respect, n'hésitez pas à prendre des mesures appropriées pour protéger vos intérêts.

Renouveler le contrat si nécessaire

En fonction de la durée et de la nature de votre contrat international, il peut être nécessaire de le renouveler à l'expiration de sa période initiale. Anticipez cette échéance et entamez les négociations de renouvellement suffisamment à l'avance pour éviter tout retard ou désaccord.

Conclusion

La réussite d'un contrat international repose sur une préparation minutieuse, une rédaction claire et une négociation efficace. En suivant ces conseils pratiques, vous augmenterez vos chances de conclure des contrats internationaux fructueux et de développer votre entreprise à l'étranger.
`,
    excerpt: `La signature d'un contrat international est une étape cruciale pour toute entreprise qui souhaite se développer à l'étranger.`,
    date: 'Apr 11, 2024',
    author: 'Afiz SOULE'
  },
  {
    id: '6',
    title: 'Réflexes juridiques à avoir pour créer une PME en France',
    slug: 'reflexes-juridiques-a-avoir-pour-creer-une-pme-en-france',
    url: 'https://moriartiiconsulting.com/blog/r-flexes-juridiques---avoir-pour-cr-er-une-pme-en-france',
    html: `Chez Moriartii Consulting, nous comprenons que créer une petite ou moyenne entreprise (PME) en France est un défi passionnant qui nécessite une préparation méticuleuse, en particulier sur le plan juridique. Nous vous proposons un guide complet des principaux réflexes juridiques à adopter pour garantir le succès de votre projet.

1. Choisir la Structure Juridique Appropriée

Le choix de la structure juridique de votre entreprise est déterminant pour sa gestion, son régime fiscal et la responsabilité des associés. Voici les options les plus courantes :

- Entreprise Individuelle (EI) : Simple à créer, elle engage le patrimoine personnel de l'entrepreneur.
- Entreprise Unipersonnelle à Responsabilité Limitée (EURL) : Permet de limiter la responsabilité de l'entrepreneur à ses apports, tout en offrant une certaine souplesse.
- Société à Responsabilité Limitée (SARL) : Idéale pour les PME, avec une responsabilité limitée aux apports et une gestion structurée.
- Société par Actions Simplifiée (SAS) : Flexible et attractive pour les investisseurs, elle est adaptée aux projets à fort potentiel de croissance.

2. Rédiger les Statuts

Les statuts de votre société sont le document fondateur qui définit ses règles de fonctionnement. Ils doivent inclure :

- La dénomination sociale
- L’objet social
- Le siège social
- Le capital social
- La répartition des parts sociales
- Les modalités de prise de décision

3. Procéder à l'Immatriculation

L’immatriculation de votre société au Registre du Commerce et des Sociétés (RCS) est une étape clé pour lui conférer une existence juridique. Cette procédure inclut :

- Le dépôt des statuts au greffe du tribunal de commerce
- La publication d’un avis de constitution dans un journal d’annonces légales
- La soumission du formulaire M0 au Centre de Formalités des Entreprises (CFE)

4. Sécuriser le Financement

Définir les sources de financement est essentiel pour la viabilité de votre entreprise. Les options incluent :

- Apports en capital des associés
- Prêts bancaires : Avec ou sans garanties
- Aides et subventions : Proposées par l’État, les collectivités locales ou l’Union européenne
- Levées de fonds : Particulièrement pour les SAS

5. Protéger la Propriété Intellectuelle

La protection de vos actifs immatériels est cruciale. Les démarches incluent :

- Dépôt de brevets : Pour protéger les innovations techniques
- Enregistrement de marques : Pour protéger vos noms et logos
- Protection des dessins et modèles : Pour vos créations esthétiques

6. Respecter les Obligations Sociales et Fiscales

Assurez-vous de respecter toutes les obligations légales pour éviter des sanctions. Cela comprend :

- Déclaration et paiement des cotisations sociales : URSSAF pour les cotisations patronales et salariales
- Déclarations fiscales : TVA, impôt sur les sociétés, contribution économique territoriale, etc.
- Respect des obligations en droit du travail : Contrats de travail, conditions de travail, santé et sécurité au travail

7. Sécuriser les Relations Commerciales

Encadrez vos relations commerciales avec des contrats bien rédigés, incluant :

- Conditions générales de vente (CGV) : Pour les relations avec vos clients
- Conditions générales d'achat (CGA) : Pour vos fournisseurs
- Clauses de confidentialité et de non-concurrence : Pour protéger les intérêts de votre entreprise

Conclusion

Chez Moriartii Consulting, nous savons que la création d’une PME en France requiert une attention particulière aux aspects juridiques. En suivant ces réflexes juridiques, vous pourrez structurer votre entreprise de manière robuste, minimiser les risques et vous concentrer sur son développement. N’hésitez pas à nous consulter pour bénéficier de notre expertise et sécuriser chaque étape de votre projet entrepreneurial.
`,
    excerpt: `Créer une PME en France est un défi passionnant qui nécessite une préparation méticuleuse, en particulier sur le plan juridique.`,
    date: 'Jun 12, 2024',
    author: 'Afiz SOULE'
  }
];

// Services
export const services: Service[] = [
  {
    id: 'fiscalite',
    title: 'Fiscalité Internationale et Prix de Transfert',
    description: 'Nous accompagnons nos clients dans la gestion de leurs obligations en matière de prix de transfert et optimisation fiscale internationale.',
    icon: 'globe',
    details: [
      'Rédaction et mise à jour des master files et local files',
      'Stratégies d\'optimisation fiscale internationale',
      'Préparation et défense en cas de contrôle fiscal',
      'Évaluation des risques fiscaux lors de fusions, acquisitions ou restructurations'
    ]
  },
  {
    id: 'tva',
    title: 'Conseil en TVA Nationale et Internationale',
    description: 'Solutions adaptées aux transactions internationales et optimisation de la gestion de la TVA pour les entreprises.',
    icon: 'receipt',
    details: [
      'Mise en conformité TVA dans plusieurs juridictions',
      'Gestion des régimes spécifiques de TVA',
      'Identification des opportunités d\'économie fiscale',
      'Application correcte des règles de TVA transfrontalière'
    ]
  },
  {
    id: 'restructuration',
    title: 'Restructuration et Stratégie Fiscale d\'Entreprise',
    description: 'Accompagnement sur mesure pour évaluer les impacts fiscaux des opérations de restructuration et minimiser la charge fiscale.',
    icon: 'building',
    details: [
      'Évaluation des impacts fiscaux des fusions, acquisitions et cessions',
      'Structuration des transactions pour minimiser la charge fiscale',
      'Planification fiscale pour groupes multinationaux',
      'Optimisation des flux financiers et juridiques entre filiales'
    ]
  },
  {
    id: 'droit-affaires',
    title: 'Droit des Affaires et Gouvernance Juridique',
    description: 'Gestion juridique des filiales internationales et support contractuel complet pour sécuriser vos relations commerciales.',
    icon: 'scale',
    details: [
      'Création, structuration et conformité des entités à l\'étranger',
      'Rédaction et négociation de contrats complexes',
      'Support en matière de KYC, compliance et veille réglementaire',
      'Sécurisation des relations commerciales'
    ]
  },
  {
    id: 'formation',
    title: 'Formation et Veille Juridique',
    description: 'Formations sur mesure et veille proactive pour maintenir votre entreprise à la pointe des meilleures pratiques fiscales et juridiques.',
    icon: 'graduationCap',
    details: [
      'Formations sur les prix de transfert, fiscalité internationale et TVA',
      'Veille fiscale des réglementations internationales',
      'Anticipation des changements réglementaires',
      'Ajustement des stratégies fiscales'
    ]
  }
];

// Team Members
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Afiz SOULE',
    role: 'Expert en Fiscalité Internationale et Stratégie Juridique d\'Entreprise',
    bio: 'Fort d\'un Mastère Spécialisé en Management Juridique des Affaires (TBS Education, Toulouse) et d\'un Master en Droit des Affaires et Fiscalité, Afiz SOULE a su transformer ses solides connaissances académiques en solutions concrètes pour les entreprises confrontées à des environnements fiscaux et réglementaires en constante évolution.',
    image: 'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: '#'
  }
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Élodie Martin',
    text: 'Moriartii Consulting m\'a aidé à transformer ma petite entreprise avec des stratégies innovantes et efficaces. Leur expertise et leur compréhension du marché sont inégalables. Grâce à leur aide, j\'ai vu une croissance significative en seulement quelques mois.',
    company: 'Entrepreneur'
  },
  {
    id: '2',
    name: 'Julien Dupont',
    text: 'Faire appel à Moriartii Consulting a été une décision révolutionnaire pour notre entreprise. Leur approche personnalisée et leur profonde connaissance du marché international ont véritablement boosté notre développement.',
    company: 'Dirigeant d\'entreprise'
  },
  {
    id: '3',
    name: 'Aminata Diagne',
    text: 'Moriartii Consulting a fourni des insights et des stratégies exceptionnels qui ont considérablement augmenté notre productivité et notre efficacité, ce qui en fait un partenaire inestimable pour toute entreprise visant à prospérer sur le marché concurrentiel actuel.',
    company: 'Directrice financière'
  }
];

// FAQs
export const faqs: FAQ[] = [
  {
    question: 'Qui peut bénéficier de nos services ?',
    answer: 'Entreprises internationales ayant des enjeux de fiscalité transfrontalière, PME et start-ups souhaitant optimiser leur fiscalité, groupes d\'entreprises concernés par les problématiques de prix de transfert, indépendants et entrepreneurs en quête de conseils fiscaux adaptés.'
  },
  {
    question: 'Quels sont les services proposés par Moriartii Consulting ?',
    answer: 'Conseil en fiscalité internationale et prix de transfert, optimisation fiscale pour entreprises et entrepreneurs, gestion de la TVA et des obligations fiscales en France et à l\'international, accompagnement lors de restructurations, conformité fiscale et veille réglementaire, assistance en contentieux fiscal et contrôles fiscaux.'
  },
  {
    question: 'Proposez-vous un accompagnement pour les déclarations de TVA ?',
    answer: 'Oui, nous offrons la gestion des déclarations de TVA en France et à l\'international, l\'identification des régimes de TVA applicables à votre activité, et le traitement de taxes spécifiques comme l\'octroi de mer, la taxe sur les rentes infra marginales ou encore l\'imposition forfaitaire sur les entreprises de réseaux.'
  },
  {
    question: 'Quels sont vos honoraires ?',
    answer: 'Nos honoraires sont définis en fonction de la complexité et de la nature des missions. Nous proposons des devis personnalisés et des forfaits adaptés à vos besoins. Contactez-nous pour une première consultation.'
  }
];

// Horizon Services
export const horizonServices = [
  {
    id: 'base',
    title: 'Consultation de base',
    price: '30.000 FCFA',
    period: 'Par mois',
    description: 'Nous vous aidons tout au long du processus à créer une société adaptée à vos besoins.',
    features: [
      'Consultation',
      'Création d\'une personne morale',
      'Gestion des documents administratifs (statut de société, procès-verbal, assemblée générale, contrats, etc...)',
      'Suivi mensuel'
    ]
  },
  {
    id: 'contrats',
    title: 'Gestion et management des contrats',
    price: '30.000 FCFA',
    period: 'Par mois',
    description: 'Gestion complète et efficace de vos contrats afin de garantir la conformité et de réduire les risques.',
    features: [
      'Analyse',
      'Conformité et optimisation',
      'Suivi'
    ]
  },
  {
    id: 'tresorerie',
    title: 'Gestion de trésorerie',
    price: '25.000 FCFA',
    period: 'Par service',
    description: 'Service de comptabilité et de gestion fiscale',
    features: [
      'Gestion de trésorerie',
      'Comptabilité',
      'Conformité bancaire',
      'Analyse financière de performance'
    ]
  },
  {
    id: 'numerique',
    title: 'Gestion numérique des données',
    price: '20.000 FCFA',
    period: 'Par mois',
    description: 'Accompagnement à la numérisation des données.',
    features: [
      'Numérisation des documents et des données',
      'Cybersécurité et protection des données',
      'Conformité RGPD',
      'Assistance aux problèmes informatiques courants'
    ]
  },
  {
    id: 'formation',
    title: 'Formation et développement',
    price: '20.000 FCFA',
    period: 'Par mois',
    description: 'Programmes de formation continue pour améliorer les compétences et optimiser sa croissance.',
    features: [
      'Formation en gestion d\'entreprise',
      'Formation en finance (impôt, fiscalité, crédit, trésorerie, levée de fonds)',
      'Formation en droit (droit des affaires et des sociétés, assurance, pratique commerciale et concurrentielle, garantie et sureté, fiscalité internationale, etc...)'
    ]
  },
  {
    id: 'premium',
    title: 'Devenir un(e) dirigeant(e)',
    price: '100.000 FCFA',
    period: 'Par mois',
    description: 'Accompagnement complet tout au long de la vie de la société.',
    features: [
      'Conseil en création et gestion de la société',
      'Gestion et management des contrats',
      'Gestion de trésorerie',
      'Gestion numérique des données',
      'Formation et développement',
      'Support et conseil personnalisé 24H/24'
    ],
    popular: true
  }
];

// Company values
export const companyValues = [
  {
    title: 'Intégrité',
    description: 'Chez Moriartii Consulting, nous croyons que l\'intégrité est la pierre angulaire de notre succès. Nous nous engageons à agir avec honnêteté et transparence dans toutes nos interactions, garantissant ainsi la confiance et le respect de nos clients.'
  },
  {
    title: 'Innovation',
    description: 'Nous valorisons l\'innovation en tant que moteur de croissance et de compétitivité. Notre équipe est constamment à la recherche de nouvelles idées et solutions créatives pour aider nos clients à atteindre leurs objectifs.'
  },
  {
    title: 'Excellence',
    description: 'L\'excellence est au cœur de tout ce que nous faisons. Nous nous efforçons de dépasser les attentes de nos clients en fournissant des services de la plus haute qualité, basés sur une expertise approfondie et une attention méticuleuse aux détails.'
  },
  {
    title: 'Collaboration',
    description: 'Nous croyons en la force de la collaboration pour générer des résultats exceptionnels. En travaillant en étroite coopération avec nos clients, nous développons des stratégies sur mesure qui répondent spécifiquement à leurs besoins uniques.'
  },
  {
    title: 'Responsabilité',
    description: 'Chez Moriartii Consulting, nous prenons la responsabilité de nos actions et de leurs impacts. Nous nous engageons à être des partenaires fiables et à contribuer positivement à la communauté et à l\'environnement.'
  }
];

// Get blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Get paginated blog posts
export const getPaginatedBlogPosts = (page: number, pageSize: number = 6): BlogPost[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return blogPosts.slice(startIndex, endIndex);
};

// Get total number of blog pages
export const getTotalBlogPages = (pageSize: number = 6): number => {
  return Math.ceil(blogPosts.length / pageSize);
};