// spec: specs/README.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and access control', () => {
  test('AUTH-03 | Locked-out user cannot access the app', async ({ page }) => {
    // 1. Attempt to sign in with the locked-out user account.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('input[data-test="username"]').fill('locked_out_user');
    await page.locator('input[data-test="password"]').fill('secret_sauce');
    await page.locator('#login-button').click();

    // expect: The app shows the locked-out error message.
    const lockedOutError = page.locator('h3:has-text("locked out")');
    await expect(lockedOutError).toBeVisible();

    // expect: The user remains on the login page and cannot enter inventory.
    await expect(page).toHaveURL(/www\.saucedemo\.com\/?$/);
  });
});
