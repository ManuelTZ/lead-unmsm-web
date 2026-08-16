import { expect, test } from '@playwright/test';

test('un evento próximo sin formulario muestra un estado no interactivo', async ({ page }) => {
  await page.goto('/eventos/stem-innovation-day-demo');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('STEM Innovation Day');
  await expect(page.getByText('Formulario pendiente', { exact: true })).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await expect(page.getByRole('link', { name: 'Inscribirme' })).toHaveCount(0);
});

test('un evento pasado no muestra controles de inscripción', async ({ page }) => {
  await page.goto('/eventos/women-in-tech-demo');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Women in Tech');
  await expect(page.getByText('Formulario pendiente', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Inscribirme' })).toHaveCount(0);
});
