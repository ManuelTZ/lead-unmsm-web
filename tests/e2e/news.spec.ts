import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const content = JSON.parse(readFileSync('src/content/news.json', 'utf8')) as {
  items: Array<{ slug: string; title: string; excerpt: string }>;
};

test('noticias representa la colección y permite abrir cada publicación', async ({ page }) => {
  await page.goto('/noticias');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Noticias');

  if (content.items.length === 0) {
    await expect(page.getByText('Todavía no hay noticias publicadas.')).toBeVisible();
    await expect(page.locator('article')).toHaveCount(0);
    return;
  }

  for (const article of content.items) {
    const link = page.getByRole('link', { name: article.title });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(`/noticias/${article.slug}`);
    await expect(page.getByRole('heading', { level: 1, name: article.title })).toBeVisible();
    await expect(page.getByText(article.excerpt, { exact: true })).toBeVisible();
    await page.goBack();
  }
});
