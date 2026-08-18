// src/pages/ProductDetailPage.ts
// ProductDetailPage - Workflow-based Page Object Model for product detail flows

import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly backButton: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('[data-test="inventory-item-name"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  /**
   * Verify product detail page is loaded
   */
  async verifyProductDetailPageLoaded() {
    await expect(this.productTitle).toBeVisible();
    await expect(this.productPrice).toBeVisible();
  }

  /**
   * Get product title
   */
  async getProductTitle(): Promise<string | null> {
    return this.productTitle.textContent();
  }

  /**
   * Get product price
   */
  async getProductPrice(): Promise<string | null> {
    return this.productPrice.textContent();
  }

  /**
   * Click add to cart button
   */
  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  /**
   * Click back button to return to inventory
   */
  async clickBackButton() {
    await this.backButton.click();
  }

  /**
   * Verify back button is visible
   */
  async isBackButtonVisible(): Promise<boolean> {
    return this.backButton.isVisible();
  }

  /**
   * Get cart badge count
   */
  async getCartBadgeCount(): Promise<string | null> {
    const badge = this.page.locator('[data-test="shopping-cart-badge"]');
    return badge.textContent().catch(() => null);
  }

  /**
   * Verify product was added to cart (by checking cart link visibility)
   */
  async verifyProductAddedToCart() {
    await expect(this.cartLink).toBeVisible();
  }
}