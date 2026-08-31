import { expect, test } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const newsDirectory = 'content/news';
const articles = readdirSync(newsDirectory)
  .filter((file) => file.endsWith('.json'))
  .map((file) => ({
    ...(JSON.parse(readFileSync(join(newsDirectory, file), 'utf8')) as {
      title: string;
      excerpt: string;
    }),
    slug: basename(file, '.json'),
  }));

test('noticias representa la colección y permite abrir cada publicación', async ({ page }) => {
  await page.goto('/noticias');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Noticias');

  if (articles.length === 0) {
    await expect(page.getByText('Todavía no hay noticias publicadas.')).toBeVisible();
    await expect(page.locator('article')).toHaveCount(0);
    return;
  }

  for (const article of articles) {
    const link = page.getByRole('link', { name: article.title });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(`/noticias/${article.slug}`);
    await expect(page.getByRole('heading', { level: 1, name: article.title })).toBeVisible();
    await expect(page.getByText(article.excerpt, { exact: true })).toBeVisible();
    await page.goBack();
  }
});
