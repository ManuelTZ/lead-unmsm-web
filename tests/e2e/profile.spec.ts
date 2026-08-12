import { expect, test } from '@playwright/test';

test('el test exige todas las respuestas', async ({ page }) => {
  await page.goto('/perfil');
  await page.getByRole('button', { name: 'Ver mi perfil' }).click();
  await expect(page.getByText('Responde todas las preguntas')).toBeVisible();
});

test('el test entrega un perfil al completarse', async ({ page }) => {
  await page.goto('/perfil');
  const groups = page.locator('fieldset');
  const count = await groups.count();
  for (let i = 0; i < count; i += 1) {
    await groups.nth(i).getByRole('radio').first().check();
  }
  await page.getByRole('button', { name: 'Ver mi perfil' }).click();
  await expect(page.getByText('Tech & Innovation — provisional')).toBeVisible();
});
