// src/fixtures/authenticatedContext.ts
// Fixture for authenticated test contexts

import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { TEST_USERS } from '../data/testUsers';

export type AuthFixtures = {
  authenticatedPage: Page;
  authenticatedInventoryPage: InventoryPage;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(TEST_USERS.STANDARD_USER.username, TEST_USERS.STANDARD_USER.password);
    
    // Wait for inventory page to load
    await page.waitForURL(/.*inventory\.html/);
    
    await use(page);
  },

  authenticatedInventoryPage: async ({ authenticatedPage }, use) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';