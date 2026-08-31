import { expect, test } from '@playwright/test';

test('home muestra navegación y CTA principal', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Liderazgo STEM');
  await expect(page.getByRole('link', { name: 'Explorar eventos' })).toBeVisible();
});

test('home publica metadatos sociales coherentes', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Inicio · LEAD UNMSM');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /Comunidad universitaria/,
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Inicio · LEAD UNMSM',
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    'content',
    /Comunidad universitaria/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});

test('el prototipo bloquea el rastreo automatico', async ({ request }) => {
  const response = await request.get('/robots.txt');

  expect(response.ok()).toBe(true);
  await expect(response.text()).resolves.toBe(['User-agent: *', 'Disallow: /', ''].join('\n'));
});

test('la imagen social publica esta disponible', async ({ request }) => {
  const response = await request.get('/brand/social-share.png');

  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toBe('image/png');
});

test('permite saltar la navegación principal con teclado', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Saltar al contenido principal' });
  await expect(skipLink).toBeVisible();
  await expect(skipLink).toBeFocused();

  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('el menu movil comunica su estado y se cierra con Escape', async ({ page }) => {
  await page.goto('/');

  const disclosure = page.locator('details.mobile-nav');
  const control = disclosure.locator('summary');
  test.skip(!(await control.isVisible()), 'Comportamiento exclusivo de la navegación móvil');

  await expect(control).toHaveAttribute('aria-controls', 'mobile-navigation');
  await expect(control).toHaveAttribute('aria-expanded', 'false');
  await expect(control).toHaveAttribute('aria-label', 'Abrir menú');

  await control.focus();
  await page.keyboard.press('Enter');
  await expect(disclosure).toHaveAttribute('open', '');
  await expect(control).toHaveAttribute('aria-expanded', 'true');
  await expect(control).toHaveAttribute('aria-label', 'Cerrar menú');

  await page.keyboard.press('Escape');
  await expect(disclosure).not.toHaveAttribute('open', '');
  await expect(control).toHaveAttribute('aria-expanded', 'false');
  await expect(control).toHaveAttribute('aria-label', 'Abrir menú');
  await expect(control).toBeFocused();
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
    const currentLinks = page.locator('nav a[aria-current="page"]');
    await expect(currentLinks).toHaveCount(2);
    await expect(currentLinks.nth(0)).toHaveAttribute('href', route.href);
    await expect(currentLinks.nth(1)).toHaveAttribute('href', route.href);
  }
});

test('home comunica que la convocatoria no está abierta', async ({ page }) => {
  await page.goto('/');

  const countdown = page.locator('[data-countdown]');
  await expect(countdown).toBeVisible();
  await expect(countdown.getByText('Actualmente no hay convocatoria abierta.')).toBeVisible();
  await expect(countdown.locator('[data-units]')).toBeHidden();
});

test('footer enlaza las redes oficiales', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'instagram' })).toHaveAttribute(
    'href',
    'https://www.instagram.com/lead_unmsm/',
  );
  await expect(page.getByRole('link', { name: 'linkedin' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/company/lead-unmsm',
  );
});

test('el countdown no interrumpe al lector de pantalla cada segundo', async ({ page }) => {
  await page.goto('/');

  const countdown = page.locator('[data-countdown]');
  await expect(countdown).not.toHaveAttribute('aria-live', /.+/);
  await expect(countdown.locator('[data-units]')).toHaveAttribute('role', 'timer');
  await expect(countdown.locator('[data-units]')).toHaveAttribute('aria-label', 'Tiempo restante');
  await expect(countdown.locator('[data-status]')).toHaveAttribute('role', 'status');
  await expect(countdown.locator('[data-status]')).toHaveAttribute('aria-atomic', 'true');
});
