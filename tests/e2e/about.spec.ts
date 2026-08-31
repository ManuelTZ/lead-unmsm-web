import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const members = JSON.parse(readFileSync('src/content/members.json', 'utf8')) as {
  items: Array<{ name: string; role: string }>;
};

test('nosotros muestra los integrantes publicados desde el CMS', async ({ page }) => {
  await page.goto('/nosotros');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('LEAD UNMSM');
  await expect(page.locator('[data-member]')).toHaveCount(members.items.length);

  for (const member of members.items) {
    await expect(page.getByRole('heading', { name: member.name })).toBeVisible();
    await expect(page.getByText(member.role, { exact: true })).toBeVisible();
  }
});
