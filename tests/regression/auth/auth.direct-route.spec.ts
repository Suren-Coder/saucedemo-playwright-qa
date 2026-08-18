// tests/regression/auth/auth.direct-route.spec.ts
// spec: specs/README.md
// Regression test - direct route access without login denial (AUTH-05)
// Refactored with proper POM structure

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { AuthAssertions } from '../../../src/utils/assertions';
import { getBaseUrl } from '../../../src/config/env';

test.describe('Authentication and access control', () => {
  test('AUTH-05 | Direct route access without login is denied', async ({ page }) => {
    // Arrange - Initialize page objects
    const loginPage = new LoginPage(page);

    // Act - Attempt direct navigation to inventory without authentication
    await page.goto(`${getBaseUrl()}/inventory.html`);

    // Assert - Redirected to login page
    await AuthAssertions.assertOnLoginPage(page);

    // Assert - Access denied error visible
    await AuthAssertions.assertErrorMessageVisible(
      page,
      "You can only access '/inventory.html' when you are logged in"
    );

    // Assert - User is not able to view product inventory
    const inventoryLabel = page.locator('span:has-text("Products")');
    await expect(inventoryLabel).not.toBeVisible();

    // Assert - Login form is visible for user to authenticate
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
