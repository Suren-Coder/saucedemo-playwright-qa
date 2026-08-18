// tests/smoke/auth/auth.valid-login.spec.ts
// spec: specs/README.md
// Smoke test - valid login (AUTH-01)
// Refactored with proper POM structure

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { InventoryPage } from '../../../src/pages/InventoryPage';
import { TEST_USERS } from '../../../src/data/testUsers';
import { AuthAssertions } from '../../../src/utils/assertions';

test.describe('Authentication and access control', () => {
  test('AUTH-01 | Valid login for standard user', async ({ page }) => {
    // Arrange - Initialize page objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Act - Navigate and login
    await loginPage.navigate();
    await loginPage.login(
      TEST_USERS.STANDARD_USER.username,
      TEST_USERS.STANDARD_USER.password
    );

    // Assert - Verify inventory page loads
    await AuthAssertions.assertOnInventoryPage(page);
    await expect(inventoryPage.productsLabel).toBeVisible();

    // Assert - Verify 6 products are loaded
    await expect(inventoryPage.productCards).toHaveCount(6);

    // Assert - Verify header is present
    const headerContainer = page.locator('[data-test="primary-header"]');
    await expect(headerContainer).toBeVisible();

    // Assert - Verify no error message
    const errorMessage = page.locator('h3:has-text("Epic sadface")');
    await expect(errorMessage).not.toBeVisible();
  });
});
