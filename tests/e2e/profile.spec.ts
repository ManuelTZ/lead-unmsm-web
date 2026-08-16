import { expect, test } from '@playwright/test';

test('el test exige todas las respuestas', async ({ page }) => {
  await page.goto('/perfil');
  await page.getByRole('button', { name: 'Ver mi perfil' }).click();
  await expect(page.getByText('Responde todas las preguntas')).toBeVisible();
});

test('el test entrega un perfil y permite explorar oportunidades', async ({ page }) => {
  await page.goto('/perfil');
  await expect(
    page.getByText('Modelo provisional: las áreas finales deben validarse con LEAD UNMSM.'),
  ).toBeVisible();

  const groups = page.locator('fieldset');
  const count = await groups.count();
  for (let i = 0; i < count; i += 1) {
    await groups.nth(i).getByRole('radio').first().check();
  }
  await page.getByRole('button', { name: 'Ver mi perfil' }).click();

  const result = page.locator('[data-result]');
  await expect(result).toBeVisible();
  await expect(result).toBeFocused();
  await expect(result.getByText('Tech & Innovation — provisional')).toBeVisible();

  await result.getByRole('link', { name: 'Explorar oportunidades' }).click();
  await expect(page).toHaveURL(/\/eventos$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Eventos');
});
