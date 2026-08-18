// spec: specs/README.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and access control', () => {
  test('AUTH-05 | Direct route access without login is denied', async ({ page }) => {
    // 1. Attempt to navigate directly to the protected inventory route without authenticating.
    await page.goto('https://www.saucedemo.com/inventory.html');

    // expect: The app blocks access and redirects the user to the login page.
    await expect(page).toHaveURL(/www\.saucedemo\.com\/?$/);

    // expect: The user is not able to view product inventory without a valid session.
    const accessDeniedError = page.locator('h3:has-text("You can only access")');
    await expect(accessDeniedError).toBeVisible();
    
    const loginForm = page.locator('input[data-test="username"]');
    await expect(loginForm).toBeVisible();
  });
});
