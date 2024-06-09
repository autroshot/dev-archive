import { expect, test } from '@playwright/test';

test('제목이 있다', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Dev Archive');
});
