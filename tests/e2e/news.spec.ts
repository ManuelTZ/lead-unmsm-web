import { expect, test } from '@playwright/test';

test('noticias navega del listado a un detalle generado', async ({ page }) => {
  await page.goto('/noticias');

  const articleLink = page.getByRole('link', {
    name: 'Mujeres que están transformando la tecnología — demo',
  });
  await expect(articleLink).toBeVisible();
  await articleLink.click();

  await expect(page).toHaveURL(/\/noticias\/mujeres-tecnologia-demo$/);
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Mujeres que están transformando la tecnología — demo',
    }),
  ).toBeVisible();
  await expect(page.getByText('Referentes', { exact: true })).toBeVisible();
  await expect(page.getByText(/Equipo editorial — demo/)).toBeVisible();
  await expect(
    page.getByText('Contenido de demostración. Reemplazar antes del lanzamiento.'),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Volver a noticias' }).click();
  await expect(page).toHaveURL(/\/noticias$/);
});
