# Test info

- Name: Blog CRUD >> Crée un nouvel article
- Location: /Users/akimsoule/Downloads/project 9/tests/blog-crud.spec.ts:28:8

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByText(/Article créé/i)
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByText(/Article créé/i)

    at /Users/akimsoule/Downloads/project 9/tests/blog-crud.spec.ts:34:51
```

# Page snapshot

```yaml
- banner:
  - link "Moriartii Consulting":
    - /url: /
  - button "Ouvrir le menu":
    - img
  - checkbox
  - button "Fermer le menu":
    - img
  - list:
    - listitem:
      - link "Nos services d'assistances":
        - /url: /services
    - listitem:
      - link "Informel formalité":
        - /url: /horizon
    - listitem:
      - link "Équipe":
        - /url: /team
    - listitem:
      - link "FAQ & RDV":
        - /url: /faq-rdv
    - listitem:
      - link "Articles":
        - /url: /blog
    - listitem:
      - link "Contact":
        - /url: /contact
- main:
  - checkbox "Ouvrir le menu close sidebar Fermer le menu"
  - heading "Dashboard" [level=2]
  - navigation:
    - list:
      - listitem:
        - link "Analyse SEO":
          - /url: /dashboard/seo
      - listitem:
        - link "Articles du blog":
          - /url: /dashboard/blog
      - listitem:
        - link "Messages de contact":
          - /url: /dashboard/contact
      - listitem:
        - link "Rendez-vous":
          - /url: /dashboard/calendar
  - button "Se déconnecter":
    - img
    - text: Se déconnecter
  - main:
    - heading "Créer un nouvel article" [level=1]
    - text: Titre
    - textbox: Article de test
    - text: Date
    - textbox
    - text: Contenu
    - button "Édition"
    - button "Aperçu"
    - button "Normal":
      - text: Normal
      - img
    - button:
      - img
    - button:
      - img
    - button:
      - img
    - button:
      - img
    - button:
      - img
    - button:
      - img
    - button:
      - img
    - paragraph: Ceci est un contenu de test pour le blog.
    - button "Annuler"
    - button "Créer"
- contentinfo:
  - heading "Moriartii Consulting" [level=3]
  - paragraph: Expertise en consultation juridique, audit fiscal, et stratégie d'entreprise. Nous accompagnons les entreprises dans leurs défis juridiques et fiscaux en France et à l'international.
  - heading "Navigation" [level=4]
  - list:
    - listitem:
      - link "Nos services d'assistances":
        - /url: /services
    - listitem:
      - link "Informel formalité":
        - /url: /horizon
    - listitem:
      - link "Équipe":
        - /url: /team
    - listitem:
      - link "FAQ & RDV":
        - /url: /faq-rdv
    - listitem:
      - link "Articles":
        - /url: /blog
    - listitem:
      - link "Contact":
        - /url: /contact
  - heading "Services" [level=4]
  - list:
    - listitem:
      - link "Fiscalité Internationale":
        - /url: /services#fiscalite
    - listitem:
      - link "Conseil en TVA":
        - /url: /services#tva
    - listitem:
      - link "Restructuration":
        - /url: /services#restructuration
    - listitem:
      - link "Droit des Affaires":
        - /url: /services#droit-affaires
    - listitem:
      - link "Formation et Veille":
        - /url: /services#formation
  - heading "Contact" [level=4]
  - paragraph: "Email:moriartiiconsulting@proton.me"
  - paragraph: "Téléphone: +33 7 45 72 75 67"
  - link "LinkedIn":
    - /url: "#"
    - img
  - link "Twitter":
    - /url: "#"
    - img
  - paragraph: © 2025 Moriartii Consulting. Tous droits réservés.
  - paragraph:
    - link "Politique de confidentialité":
      - /url: /privacy
    - text: "|"
    - link "Conditions d'utilisation":
      - /url: /terms
  - link "dashboard":
    - /url: /dashboard
    - img
- alert
- iframe
```

# Test source

```ts
   1 | import { test, expect, Page } from '@playwright/test';
   2 |
   3 | const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
   4 | const EMAIL = 'soule_akim@yahoo.fr';
   5 | const PASSWORD = 'akimsoule';
   6 |
   7 | // Fonction utilitaire pour se connecter
   8 | async function login(page: Page) {
   9 |   await page.goto(BASE_URL + '/auth/login');
  10 |   await page.fill('form > div:nth-child(2) > input', EMAIL);
  11 |   await page.fill('form > div:nth-child(3) > input', PASSWORD);
  12 |   await page.waitForTimeout(5000); // Attendre 5 secondes avant la soumission
  13 |   await page.click('form button[type="submit"]');
  14 |   await page.waitForURL(BASE_URL + '/dashboard');
  15 | }
  16 |
  17 | test.describe('Blog CRUD', () => {
  18 |   const article = {
  19 |     title: 'Article de test',
  20 |     content: 'Ceci est un contenu de test pour le blog.',
  21 |     slug: 'article-de-test'
  22 |   };
  23 |
  24 |   test.beforeEach(async ({ page }) => {
  25 |     await login(page);
  26 |   });
  27 |
  28 |   test.only('Crée un nouvel article', async ({ page }) => {
  29 |     await page.goto(BASE_URL + '/dashboard/blog/new');
  30 |     await page.waitForSelector('input[name="title"]', { state: 'visible' });
  31 |     await page.fill('input[name="title"]', article.title);
  32 |     await page.fill('.ql-editor', article.content); // adapte si tu n'utilises pas Quill
  33 |     await page.click('form button[type="submit"]');
> 34 |     await expect(page.getByText(/Article créé/i)).toBeVisible();
     |                                                   ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  35 |     await page.goto(BASE_URL + '/blog');
  36 |     await expect(page.getByText(article.title)).toBeVisible();
  37 |   });
  38 |
  39 |   test('Affiche un article', async ({ page }) => {
  40 |     await page.goto(BASE_URL + '/blog');
  41 |     await page.getByText(article.title).click();
  42 |     await expect(page).toHaveURL(/\/blog\//);
  43 |     await expect(page.getByText(article.title)).toBeVisible();
  44 |     await expect(page.getByText(article.content)).toBeVisible();
  45 |   });
  46 |
  47 |   test('Modifie un article', async ({ page }) => {
  48 |     await page.goto(BASE_URL + '/dashboard/blog');
  49 |     await page.getByText(article.title).locator('..').getByRole('link', { name: /éditer/i }).click();
  50 |     await page.fill('input[name="title"]', 'Article modifié');
  51 |     await page.click('form button[type="submit"]');
  52 |     await expect(page.getByText('Article modifié')).toBeVisible();
  53 |   });
  54 |
  55 |   test('Supprime un article', async ({ page }) => {
  56 |     await page.goto(BASE_URL + '/dashboard/blog');
  57 |     await page.getByText('Article modifié').locator('..').getByRole('button', { name: /supprimer/i }).click();
  58 |     await page.getByRole('button', { name: /confirmer/i }).click();
  59 |     await expect(page.getByText('Article modifié')).not.toBeVisible();
  60 |   });
  61 |
  62 |   test('Teste la pagination', async ({ page }) => {
  63 |     await page.goto(BASE_URL + '/blog?page=2');
  64 |     await expect(page).toHaveURL(/page=2/);
  65 |     await expect(page.locator('.pagination')).toBeVisible();
  66 |   });
  67 | });
```