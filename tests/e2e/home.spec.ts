import { expect, test } from '@playwright/test';

test('home muestra navegación y CTA principal', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Liderazgo STEM');
  await expect(page.getByRole('link', { name: 'Explorar eventos' })).toBeVisible();
});

test('puede navegar a eventos y noticias', async ({ page }) => {
  await page.goto('/');

  const menu = page.getByText('Menú', { exact: true });
  if (await menu.isVisible()) {
    await menu.click();
  }

  await page.locator('a[href="/eventos"]:visible').first().click();
  await expect(page).toHaveURL(/\/eventos$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Eventos');

  await page.goto('/noticias');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Noticias');
});
