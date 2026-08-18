// src/pages/InventoryPage.ts
// InventoryPage - Workflow-based Page Object Model for inventory flows

import { Page, Locator, expect } from '@playwright/test';

export enum SortOption {
  NAME_A_TO_Z = 'az',
  NAME_Z_TO_A = 'za',
  PRICE_LOW_TO_HIGH = 'lohi',
  PRICE_HIGH_TO_LOW = 'hilo',
}

export class InventoryPage {
  readonly page: Page;
  readonly productsLabel: Locator;
  readonly productCards: Locator;
  readonly productLinks: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsLabel = page.locator('[data-test="title"]');
    this.productCards = page.locator('[data-test="inventory-item"]');
    this.productLinks = page.locator('[data-test*="title-link"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  /**
   * Check if products label is visible
   */
  async isProductsLabelVisible(): Promise<boolean> {
    return this.productsLabel.isVisible();
  }

  /**
   * Verify products label contains "Products"
   */
  async verifyProductsLabel() {
    await expect(this.productsLabel).toBeVisible();
  }

  /**
   * Get count of products loaded
   */
  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  /**
   * Verify inventory page is loaded (6 products in SauceDemo)
   */
  async verifyInventoryPageLoaded() {
    await this.page.waitForURL(/.*inventory\.html/);
    await expect(this.productsLabel).toBeVisible();
  }

  /**
   * Verify all product cards are visible with required elements
   */
  async verifyProductCardsVisible() {
    const count = await this.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(this.productCards.first()).toBeVisible();
  }

  /**
   * Click on a specific product by name
   */
  async clickProductByName(productName: string) {
    await this.page.locator(`[data-test*="title-link"]:has-text("${productName}")`).click();
  }

  /**
   * Click on first product (Sauce Labs Backpack)
   */
  async clickFirstProduct() {
    await this.page.locator('[data-test="item-4-title-link"]').click();
  }

  /**
   * Sort products by selected option
   */
  async sortProducts(sortOption: SortOption) {
    await this.sortDropdown.selectOption([sortOption]);
  }

  /**
   * Sort by Name A-Z
   */
  async sortByNameAZ() {
    await this.sortProducts(SortOption.NAME_A_TO_Z);
  }

  /**
   * Sort by Name Z-A
   */
  async sortByNameZA() {
    await this.sortProducts(SortOption.NAME_Z_TO_A);
  }

  /**
   * Sort by Price Low to High
   */
  async sortByPriceLowToHigh() {
    await this.sortProducts(SortOption.PRICE_LOW_TO_HIGH);
  }

  /**
   * Sort by Price High to Low
   */
  async sortByPriceHighToLow() {
    await this.sortProducts(SortOption.PRICE_HIGH_TO_LOW);
  }

  /**
   * Verify sort dropdown is visible
   */
  async isSortDropdownVisible(): Promise<boolean> {
    return this.sortDropdown.isVisible();
  }

  /**
   * Get cart badge count
   */
  async getCartBadgeCount(): Promise<string | null> {
    return this.cartBadge.textContent().catch(() => null);
  }

  /**
   * Verify cart badge is empty (not visible)
   */
  async verifyCartBadgeEmpty() {
    // Cart badge should not be visible when empty
    const badge = await this.cartBadge.isVisible().catch(() => false);
    expect(badge).toBe(false);
  }

  /**
   * Verify cart badge shows count
   */
  async verifyCartBadgeCount(expectedCount: number) {
    await expect(this.cartBadge).toContainText(expectedCount.toString());
  }

  /**
   * Click cart link to open cart
   */
  async clickCartLink() {
    await this.cartLink.click();
  }

  /**
   * Get product name by element index
   */
  async getProductNameByIndex(index: number): Promise<string> {
    return this.productLinks.nth(index).innerText();
  }

  /**
   * Get all visible product names
   */
  async getAllProductNames(): Promise<string[]> {
    return this.productLinks.allTextContents();
  }

  /**
   * Get the visible product prices in their rendered order
   */
  async getAllProductPrices(): Promise<string[]> {
    return this.productPrices.allTextContents();
  }

  /**
   * Add product to cart by button data-test attribute
   */
  async addProductToCart(productId: string) {
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }

  /**
   * Add first product to cart
   */
  async addFirstProductToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  /**
   * Verify product prices are visible
   */
  async verifyProductPricesVisible() {
    await expect(this.productPrices.first()).toBeVisible();
  }

  /**
   * Verify add-to-cart buttons are visible
   */
  async verifyAddToCartButtonsVisible() {
    const addButtons = this.page.locator('[data-test*="add-to-cart"]');
    const count = await addButtons.count();
    expect(count).toBeGreaterThan(0);
  }
}
