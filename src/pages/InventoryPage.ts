// src/pages/InventoryPage.ts
// InventoryPage - Workflow-based Page Object Model for inventory flows

import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productsLabel: Locator;
  readonly productCards: Locator;
  readonly productLinks: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsLabel = page.locator('span:has-text("Products")');
    this.productCards = page.locator('[data-test="inventory-item"]');
    this.productLinks = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"] select');
  }

  /**
   * Check if products label is visible
   */
  async isProductsLabelVisible() {
    return this.productsLabel.isVisible();
  }

  /**
   * Get count of products loaded
   */
  async getProductCount() {
    return this.productLinks.count();
  }

  /**
   * Verify inventory page is loaded (6 products in SauceDemo)
   */
  async verifyInventoryPageLoaded() {
    await this.page.waitForURL(/.*inventory\.html/);
    return this.isProductsLabelVisible();
  }
}