// tests/regression/auth/auth.empty-fields.spec.ts
// spec: specs/README.md
// Regression test - empty field validation enforcement (AUTH-04)
// Refactored with proper POM structure

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { TEST_USERS } from '../../../src/data/testUsers';
import { AuthAssertions } from '../../../src/utils/assertions';

test.describe('Authentication and access control', () => {
  test('AUTH-04 | Empty-field validation is enforced', async ({ page }) => {
    // Arrange - Initialize page objects
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    // Act - Submit form with both fields empty
    await loginPage.clickLogin();

    // Assert - Username required validation shown
    await AuthAssertions.assertErrorMessageVisible(
      page,
      'Username is required'
    );
    await AuthAssertions.assertOnLoginPage(page);

    // Act - Enter username but leave password empty
    await loginPage.fillUsername(TEST_USERS.STANDARD_USER.username);
    await loginPage.clickLogin();

    // Assert - Password required validation shown
    await AuthAssertions.assertErrorMessageVisible(
      page,
      'Password is required'
    );
    await AuthAssertions.assertOnLoginPage(page);

    // Verify no inventory content is accessible
    const inventoryLabel = page.locator('span:has-text("Products")');
    await expect(inventoryLabel).not.toBeVisible();

    // Verify login form remains visible for retry
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });
});
