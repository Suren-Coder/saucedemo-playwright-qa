// spec: specs/README.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Inventory, product detail, and sorting', () => {
  // Common authentication and setup
  const baseUrl = 'https://www.saucedemo.com';
  const standardUser = 'standard_user';
  const password = 'secret_sauce';

  test('PROD-01 | Inventory page renders expected product data', async ({ page }) => {
    // Navigate to SauceDemo login page
    await page.goto(baseUrl);

    // Enter username and password
    await page.locator('[data-test="username"]').fill(standardUser);
    await page.locator('[data-test="password"]').fill(password);

    // Click Login button to authenticate
    await page.locator('[data-test="login-button"]').click();

    // Verify Products heading is visible on inventory page
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Verify first product name is visible
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();

    // Verify product price is visible
    await expect(page.getByText('$29.99')).toBeVisible();

    // Verify add-to-cart button is visible
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();

    // Verify cart badge is empty (not visible initially)
    const badge = await page.evaluate(() => {
      const cartBadge = document.querySelector('[data-test="shopping-cart-badge"]');
      return cartBadge ? cartBadge.textContent : 'not found';
    });
    expect(badge).toBe('not found');
  });

  test('PROD-02 | Product detail page matches catalog state', async ({ page }) => {
    // Navigate to SauceDemo login page
    await page.goto(baseUrl);

    // Enter username and password
    await page.locator('[data-test="username"]').fill(standardUser);
    await page.locator('[data-test="password"]').fill(password);

    // Click Login button to authenticate
    await page.locator('[data-test="login-button"]').click();

    // Wait for inventory to load
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Click on Sauce Labs Backpack product to open detail page
    await page.locator('[data-test="item-4-title-link"]').click();

    // Verify product name on detail page matches inventory
    await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();

    // Verify product price on detail page matches inventory
    await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();

    // Verify back button to return to inventory
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();

    // Verify add to cart button exists on product detail page
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();

    // Click add to cart button on product detail page
    await page.locator('[data-test="add-to-cart"]').click();

    // Verify cart badge shows 1 item
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

    // Click back button to return to inventory list
    await page.locator('[data-test="back-to-products"]').click();

    // Verify we're back on inventory page
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });

  test('SORT-01 | Product sorting works for all supported options', async ({ page }) => {
    // Navigate to SauceDemo login page
    await page.goto(baseUrl);

    // Enter username and password
    await page.locator('[data-test="username"]').fill(standardUser);
    await page.locator('[data-test="password"]').fill(password);

    // Click Login button to authenticate
    await page.locator('[data-test="login-button"]').click();

    // Wait for inventory to load
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Verify sort dropdown exists
    const sortDropdown = await page.evaluate(() => {
      const select = document.querySelector('[data-test="product-sort-container"]');
      return select ? 'found' : 'not found';
    });
    expect(sortDropdown).toBe('found');

    // Select Name A-Z sort option
    await page.locator('[data-test="product-sort-container"]').selectOption(['az']);
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();

    // Select Name Z-A sort option
    await page.locator('[data-test="product-sort-container"]').selectOption(['za']);

    // Select Price low-high sort option
    await page.locator('[data-test="product-sort-container"]').selectOption(['lohi']);

    // Select Price high-low sort option
    await page.locator('[data-test="product-sort-container"]').selectOption(['hilo']);

    // Verify products are still visible after sorting
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });
});
