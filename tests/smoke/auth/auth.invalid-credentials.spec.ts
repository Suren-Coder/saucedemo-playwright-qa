// spec: specs/README.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and access control', () => {
  test('AUTH-02 | Invalid credentials are rejected', async ({ page }) => {
    // 1. Attempt login with a valid username and wrong password, then retry with a wrong username and valid password.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('input[data-test="password"]').fill('wrong_password');
    await page.locator('#login-button').click();

    // expect: The app displays a credential error and prevents navigation to inventory.
    const errorMessage = page.locator('h3:has-text("Epic sadface")');
    await expect(errorMessage).toBeVisible();
    await expect(page).toHaveURL(/www\.saucedemo\.com\/?$/);

    // expect: The user remains on the login page until valid credentials are entered.
    // Retry with wrong username and correct password
    await page.locator('input[data-test="username"]').fill('wrong_user');
    await page.locator('input[data-test="password"]').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Verify error is still displayed and user is still on login page
    await expect(errorMessage).toBeVisible();
    await expect(page).toHaveURL(/www\.saucedemo\.com\/?$/);
  });
});
