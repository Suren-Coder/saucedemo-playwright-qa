// spec: specs/README.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and access control', () => {
  test('AUTH-04 | Empty-field validation is enforced', async ({ page }) => {
    // 1. Submit the login form with empty username, empty password, and both fields empty.
    await page.goto('https://www.saucedemo.com/');
    
    // Attempt login with both fields empty
    await page.locator('#login-button').click();
    
    // expect: The app blocks login submission and shows the relevant validation state.
    const usernameError = page.locator('h3:has-text("Username is required")');
    await expect(usernameError).toBeVisible();
    
    // expect: The user stays on the login page without accessing protected content.
    await expect(page).toHaveURL(/www\.saucedemo\.com\/?$/);

    // Attempt login with username but no password
    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('#login-button').click();

    const passwordError = page.locator('h3:has-text("Password is required")');
    await expect(passwordError).toBeVisible();
    await expect(page).toHaveURL(/www\.saucedemo\.com\/?$/);
  });
});
