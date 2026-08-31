import { expect, test } from '@playwright/test';

test('noticias comunica que todavía no existen publicaciones oficiales', async ({ page }) => {
  await page.goto('/noticias');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Noticias');
  await expect(page.getByText('Todavía no hay noticias publicadas.')).toBeVisible();
  await expect(page.locator('article')).toHaveCount(0);
});
