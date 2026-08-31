import { expect, test } from '@playwright/test';

test('eventos representa la agenda configurada sin depender de que esté vacía', async ({
  page,
}) => {
  await page.goto('/eventos');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Eventos');

  const emptyState = page.getByText('Actualmente no hay eventos programados.');
  const eventLinks = page.getByRole('link', { name: 'Ver evento →' });

  expect((await emptyState.isVisible()) || (await eventLinks.count()) > 0).toBe(true);
});
