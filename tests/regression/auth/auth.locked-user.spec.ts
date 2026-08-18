// tests/regression/auth/auth.locked-user.spec.ts
// spec: specs/README.md
// Regression test - locked-out user access denial (AUTH-03)
// Refactored with proper POM structure

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { TEST_USERS } from '../../../src/data/testUsers';
import { AuthAssertions } from '../../../src/utils/assertions';

test.describe('Authentication and access control', () => {
  test('AUTH-03 | Locked-out user cannot access the app', async ({ page }) => {
    // Arrange - Initialize page objects
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    // Act - Attempt to sign in with locked-out user
    await loginPage.login(
      TEST_USERS.LOCKED_OUT_USER.username,
      TEST_USERS.LOCKED_OUT_USER.password
    );

    // Assert - Error message shows locked-out status
    await AuthAssertions.assertErrorMessageVisible(
      page,
      'locked out'
    );

    // Assert - User remains on login page
    await AuthAssertions.assertOnLoginPage(page);

    // Verify inventory page is not loaded
    const inventoryLabel = page.locator('span:has-text("Products")');
    await expect(inventoryLabel).not.toBeVisible();

    // Verify login form is still visible
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
