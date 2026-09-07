import { expect, test } from '@playwright/test';

test('el popup configurado se cierra y no reaparece durante la sesión', async ({ page }) => {
  await page.goto('/alianzas');

  const popup = page.getByRole('dialog', { name: 'Conversemos sobre alianzas' });
  await expect(popup).toBeVisible();
  await expect(popup.getByRole('link', { name: 'Ir a contacto' })).toHaveAttribute(
    'href',
    '/#contacto',
  );

  await popup.getByRole('button', { name: 'Cerrar aviso' }).click();
  await expect(popup).toBeHidden();

  await page.reload();
  await expect(popup).toBeHidden();
});
