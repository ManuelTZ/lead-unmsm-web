import { expect, test } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const eventsDirectory = 'content/events';
const events = readdirSync(eventsDirectory)
  .filter((file) => file.endsWith('.json'))
  .map((file) => ({
    ...(JSON.parse(readFileSync(join(eventsDirectory, file), 'utf8')) as {
      title: string;
      excerpt: string;
    }),
    slug: basename(file, '.json'),
  }));

test('eventos representa la agenda configurada sin depender de que esté vacía', async ({
  page,
}) => {
  await page.goto('/eventos');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Eventos');

  if (events.length === 0) {
    await expect(page.getByText('Actualmente no hay eventos programados.')).toBeVisible();
    await expect(page.locator('article')).toHaveCount(0);
    return;
  }

  for (const event of events) {
    const card = page.locator('article').filter({ hasText: event.title });
    const link = card.getByRole('link', { name: event.title, exact: true });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(`/eventos/${event.slug}`);
    await expect(page.getByRole('heading', { level: 1, name: event.title })).toBeVisible();
    await expect(page.getByText(event.excerpt, { exact: true })).toBeVisible();
    await page.goBack();
  }
});
