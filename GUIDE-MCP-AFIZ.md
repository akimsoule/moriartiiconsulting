# Guide de branchement — Connecteur MCP du site Moriartii Consulting

Ce connecteur permet à vos assistants IA (ChatGPT, Claude) de **lire et modifier directement les contenus de votre site** : articles du blog, FAQ, services, équipe, témoignages et coordonnées. Vous le branchez une seule fois dans chaque application ; ensuite, vous demandez simplement à l'IA, par exemple : « Rédige un article sur la TVA intracommunautaire et ajoute-le au site ».

**Adresse du connecteur (à copier telle quelle) :**

```
https://www.moriartiiconsulting.org/api/mcp
```

---

## 1. Brancher dans ChatGPT

Prérequis : un plan ChatGPT payant (Plus, Pro…) — les connecteurs capables d'écrire exigent le **Developer Mode**.

1. Ouvrez ChatGPT → **Paramètres** → **Applications et connecteurs** (ou « Connecteurs »).
2. Ouvrez les **paramètres avancés** et activez le **Developer Mode**.
3. Cliquez sur **Créer** (nouveau connecteur) :
   - **Nom :** Moriartii Consulting
   - **URL du serveur MCP :** `https://www.moriartiiconsulting.org/api/mcp`
   - **Authentification :** OAuth
4. Cliquez sur **Créer**, puis lancez la connexion. Une page de votre site s'ouvre : c'est la page d'autorisation.
5. Saisissez **votre code personnel** (voir §3) et cliquez sur **Autoriser l'accès**.
6. Vous êtes renvoyé vers ChatGPT : le connecteur est actif. Testez-le : « Liste les derniers articles de mon site ».

## 2. Brancher dans Claude

1. Ouvrez Claude → **Paramètres** → **Connecteurs**.
2. Cliquez sur **Ajouter un connecteur personnalisé** :
   - **Nom :** Moriartii Consulting
   - **URL :** `https://www.moriartiiconsulting.org/api/mcp`
3. Cliquez sur **Se connecter** : la page d'autorisation de votre site s'ouvre.
4. Saisissez **votre code personnel** et cliquez sur **Autoriser l'accès**.
5. Testez : « Quels services sont affichés sur mon site ? »

---

## 3. Votre code personnel : à traiter comme un mot de passe

- Le code personnel vous a été transmis par Akim par un canal sûr. C'est lui qui déverrouille la page d'autorisation : sans lui, personne ne peut connecter une IA à votre site.
- **Ne le partagez jamais** : ni par e-mail ou messagerie ordinaire, ni avec un tiers. Akim n'en a pas besoin pour travailler — ne le lui redonnez pas en clair.
- Ne le saisissez que sur la page d'autorisation de **votre** site (adresse commençant par `https://www.moriartiiconsulting.org/oauth/authorize`), ouverte depuis ChatGPT ou Claude.
- Un doute, un code perdu ou soupçonné d'avoir fuité ? Prévenez Akim : il peut **révoquer immédiatement tous les accès** et vous générer un nouveau code.

## 4. Ce que vos IA peuvent faire (et ne pas faire)

**Possible :** lister, lire, créer, modifier et supprimer des **articles** ; gérer la **FAQ**, les **services**, la page **équipe**, les **témoignages** et les **coordonnées** du site. Toute suppression demande à l'IA une confirmation explicite.

**Pas possible via le connecteur :** toucher aux comptes utilisateurs et mots de passe, lire les messages reçus par le formulaire de contact, changer le design ou les réglages du site, envoyer des images (les photos restent des liens gérés comme aujourd'hui).

**Bon à savoir :** le site n'a pas de système de brouillon — **un article créé par l'IA est immédiatement en ligne**. Demandez à l'IA de vous montrer le texte avant de le publier, ou faites relire l'article dès sa parution.

## 5. Trois exemples de demandes

1. « Rédige un article sur les réflexes juridiques à avoir pour créer une PME, avec un titre et une description SEO, et ajoute-le au site. »
2. « Mets à jour la FAQ avec cette nouvelle question : “…” et sa réponse : “…” »
3. « Change le numéro de téléphone du site pour le +33 … »

---

## Note pour l'administrateur (Akim)

- **Révocation d'un accès :** dans la table `McpToken`, renseigner `revokedAt = maintenant` sur la ou les lignes concernées — le jeton est refusé dès l'appel suivant. Pour tout couper : révoquer toutes les lignes non révoquées.
- **Journal d'audit :** la table `McpAuditLog` trace chaque écriture (outil utilisé, type et identifiant de l'objet, date) — jamais le contenu.
- **Nouveau code personnel :** générer le SHA-256 (hex) du nouveau code et mettre à jour la variable d'environnement `MCP_OWNER_CODE_HASH` sur Vercel, puis redéployer.
- **PAT (clients à en-tête statique) :** `npx tsx scripts/mcp-pat.ts` — le jeton en clair n'est affiché qu'une fois.
- **Variables requises (Vercel) :** `OAUTH_ISSUER`, `MCP_OWNER_CODE_HASH`, `MCP_AUTHOR_ID` (optionnelle, repli sur le compte admin).
