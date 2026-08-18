// src/utils/assertions.ts
// Common assertions and helpers for authentication tests

import { Page, expect } from '@playwright/test';

export class AuthAssertions {
  /**
   * Assert that user is on login page
   */
  static async assertOnLoginPage(page: Page) {
    await expect(page).toHaveURL(/www\.saucedemo\.com\/?$/);
  }

  /**
   * Assert that user is on inventory page
   */
  static async assertOnInventoryPage(page: Page) {
    await expect(page).toHaveURL(/.*inventory\.html/);
  }

  /**
   * Assert that error message is visible and contains specific text
   */
  static async assertErrorMessageVisible(page: Page, errorText: string) {
    const errorMessage = page.locator('h3:has-text("Epic sadface")');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(errorText);
  }

  /**
   * Assert that inventory page has loaded with products visible
   */
  static async assertInventoryPageLoaded(page: Page) {
    const productsLabel = page.locator('span:has-text("Products")');
    await expect(productsLabel).toBeVisible();
  }
}