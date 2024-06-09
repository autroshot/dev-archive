import { expect, test } from '@playwright/test';

test('인덱스 페이지의 스냅숏이 일치한다', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveScreenshot({ fullPage: true });
});

test('테스트 페이지의 스냅숏이 일치한다', async ({ page }) => {
  await page.goto('/blog/Markdown-Style-Guide/');

  await expect(page).toHaveScreenshot({ fullPage: true });
});
