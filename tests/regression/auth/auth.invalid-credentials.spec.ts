// tests/regression/auth/auth.invalid-credentials.spec.ts
// spec: specs/README.md
// Regression test - invalid credentials rejection (AUTH-02)
// Refactored with proper POM structure

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { INVALID_CREDENTIALS } from '../../../src/data/testUsers';
import { AuthAssertions } from '../../../src/utils/assertions';

test.describe('Authentication and access control', () => {
  test('AUTH-02 | Invalid credentials are rejected', async ({ page }) => {
    // Arrange - Initialize page objects
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    // Act & Assert - Test with valid username, wrong password
    await loginPage.login(
      INVALID_CREDENTIALS.VALID_USERNAME_WRONG_PASSWORD.username,
      INVALID_CREDENTIALS.VALID_USERNAME_WRONG_PASSWORD.password
    );

    // Assert - Error displayed and user stays on login
    await AuthAssertions.assertErrorMessageVisible(
      page,
      'Username and password do not match'
    );
    await AuthAssertions.assertOnLoginPage(page);

    // Act & Assert - Retry with wrong username, valid password
    await loginPage.fillUsername(
      INVALID_CREDENTIALS.WRONG_USERNAME_VALID_PASSWORD.username
    );
    await loginPage.fillPassword(
      INVALID_CREDENTIALS.WRONG_USERNAME_VALID_PASSWORD.password
    );
    await loginPage.clickLogin();

    // Assert - Error still displayed
    await AuthAssertions.assertErrorMessageVisible(
      page,
      'Username and password do not match'
    );
    await AuthAssertions.assertOnLoginPage(page);

    // Verify no inventory content is shown
    const inventoryLabel = page.locator('span:has-text("Products")');
    await expect(inventoryLabel).not.toBeVisible();
  });
});
