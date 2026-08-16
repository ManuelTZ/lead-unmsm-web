import { expect, test } from '@playwright/test';

test('home muestra navegación y CTA principal', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Liderazgo STEM');
  await expect(page.getByRole('link', { name: 'Explorar eventos' })).toBeVisible();
});

test('la navegación principal recorre todas las rutas institucionales', async ({ page }) => {
  const routes = [
    { href: '/', heading: 'Liderazgo STEM' },
    { href: '/eventos', heading: 'Eventos' },
    { href: '/noticias', heading: 'Noticias' },
    { href: '/nosotros', heading: 'LEAD UNMSM' },
    { href: '/alianzas', heading: 'Una propuesta de alianza' },
    { href: '/perfil', heading: 'Descubre tu perfil LEAD' },
  ];

  for (const route of routes) {
    await page.goto('/');

    const menu = page.getByText('Menú', { exact: true });
    if (await menu.isVisible()) {
      await menu.click();
    }

    await page.locator(`a[href="${route.href}"]:visible`).first().click();
    await expect(page).toHaveURL((url) => url.pathname === route.href);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(route.heading);
  }
});

test('home muestra un estado observable del countdown', async ({ page }) => {
  await page.goto('/');

  const countdown = page.locator('[data-countdown]');
  await expect(countdown).toBeVisible();
  await expect(countdown.getByText('Cierre de postulaciones', { exact: true })).toBeVisible();
  await expect
    .poll(async () => {
      const unitsVisible = await countdown.locator('[data-units]').isVisible();
      const statusVisible = await countdown.locator('[data-status]').isVisible();
      return unitsVisible || statusVisible;
    })
    .toBe(true);
});
