import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
const EMAIL = 'soule_akim@yahoo.fr';
const PASSWORD = 'akimsoule';

// Fonction utilitaire pour se connecter
async function login(page: Page) {
  await page.goto(BASE_URL + '/auth/login');
  await page.fill('form > div:nth-child(2) > input', EMAIL);
  await page.fill('form > div:nth-child(3) > input', PASSWORD);
  await page.waitForTimeout(5000); // Attendre 5 secondes avant la soumission
  await page.click('form button[type="submit"]');
  await page.waitForURL(BASE_URL + '/dashboard');
}

test.describe('Blog CRUD', () => {
  const article = {
    title: 'Article de test',
    content: 'Ceci est un contenu de test pour le blog.',
    slug: 'article-de-test'
  };

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test.only('Crée un nouvel article', async ({ page }) => {
    await page.goto(BASE_URL + '/dashboard/blog/new');
    await page.waitForSelector('input[name="title"]', { state: 'visible' });
    await page.fill('input[name="title"]', article.title);
    await page.fill('.ql-editor', article.content); // adapte si tu n'utilises pas Quill
    await page.click('form button[type="submit"]');
    await expect(page.getByText(/Article créé/i)).toBeVisible();
    await page.goto(BASE_URL + '/blog');
    await expect(page.getByText(article.title)).toBeVisible();
  });

  test('Affiche un article', async ({ page }) => {
    await page.goto(BASE_URL + '/blog');
    await page.getByText(article.title).click();
    await expect(page).toHaveURL(/\/blog\//);
    await expect(page.getByText(article.title)).toBeVisible();
    await expect(page.getByText(article.content)).toBeVisible();
  });

  test('Modifie un article', async ({ page }) => {
    await page.goto(BASE_URL + '/dashboard/blog');
    await page.getByText(article.title).locator('..').getByRole('link', { name: /éditer/i }).click();
    await page.fill('input[name="title"]', 'Article modifié');
    await page.click('form button[type="submit"]');
    await expect(page.getByText('Article modifié')).toBeVisible();
  });

  test('Supprime un article', async ({ page }) => {
    await page.goto(BASE_URL + '/dashboard/blog');
    await page.getByText('Article modifié').locator('..').getByRole('button', { name: /supprimer/i }).click();
    await page.getByRole('button', { name: /confirmer/i }).click();
    await expect(page.getByText('Article modifié')).not.toBeVisible();
  });

  test('Teste la pagination', async ({ page }) => {
    await page.goto(BASE_URL + '/blog?page=2');
    await expect(page).toHaveURL(/page=2/);
    await expect(page.locator('.pagination')).toBeVisible();
  });
});