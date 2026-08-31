import { expect, test } from '@playwright/test';

test('eventos comunica que todavía no existe una agenda oficial', async ({ page }) => {
  await page.goto('/eventos');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Eventos');
  await expect(page.getByText('Actualmente no hay eventos programados.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Inscribirme' })).toHaveCount(0);
});
