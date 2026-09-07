import { expect, test } from '@playwright/test';

test('solo el inicio muestra el formulario de contacto listo para Netlify', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Contáctanos' })).toBeVisible();
  await expect(page.getByText('leadunmsm@gmail.com', { exact: true })).toHaveCount(0);

  const form = page.locator('form[name="contacto-lead-unmsm"]');
  await expect(form).toHaveAttribute('method', 'POST');
  await expect(form).toHaveAttribute('data-netlify', 'true');
  await expect(form).toHaveAttribute('action', '/gracias');
  await expect(form.locator('input[name="form-name"]')).toHaveValue('contacto-lead-unmsm');

  await expect(page.getByLabel('Nombre Completo')).toHaveAttribute('placeholder', 'Tu nombre');
  await expect(page.getByLabel('Correo Electrónico')).toHaveAttribute(
    'placeholder',
    'ejemplo@email.com',
  );
  await expect(page.getByLabel('Asunto')).toHaveValue('');
  await expect(page.getByLabel('Mensaje')).toHaveAttribute(
    'placeholder',
    'Escribe tu mensaje aquí...',
  );
  await expect(page.getByRole('button', { name: 'Enviar Mensaje' })).toBeVisible();

  await page.goto('/alianzas');
  await expect(page.getByRole('heading', { name: 'Contáctanos' })).toHaveCount(0);
  await expect(page.locator('form[name="contacto-lead-unmsm"]')).toHaveCount(0);
});

test('la confirmación del formulario ofrece volver al inicio', async ({ page }) => {
  await page.goto('/gracias');

  await expect(page.getByRole('heading', { level: 1, name: 'Mensaje recibido' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/');
});
