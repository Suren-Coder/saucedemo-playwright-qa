import { test, expect } from '../src/fixtures/authenticatedContext';
import { ProductDetailPage } from '../src/pages/ProductDetailPage';
import { SortOption } from '../src/pages/InventoryPage';

test.describe('Inventory, product detail, and sorting', () => {
  test('PROD-01 | Inventory page renders expected product data', async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.verifyInventoryPageLoaded();
    await authenticatedInventoryPage.verifyProductCardsVisible();
    await authenticatedInventoryPage.verifyProductPricesVisible();
    await authenticatedInventoryPage.verifyAddToCartButtonsVisible();
    await authenticatedInventoryPage.verifyCartBadgeEmpty();
  });

  test('PROD-02 | Product detail page matches catalog state', async ({ authenticatedInventoryPage }) => {
    const expectedProductName = await authenticatedInventoryPage.getProductNameByIndex(0);
    const [expectedProductPrice] = await authenticatedInventoryPage.getAllProductPrices();
    const productDetailPage = new ProductDetailPage(authenticatedInventoryPage.page);

    await authenticatedInventoryPage.clickFirstProduct();
    await productDetailPage.verifyProductDetailPageLoaded();
    await expect(productDetailPage.productTitle).toHaveText(expectedProductName);
    await expect(productDetailPage.productPrice).toHaveText(expectedProductPrice);
    await expect(productDetailPage.backButton).toBeVisible();
    await expect(productDetailPage.addToCartButton).toBeVisible();

    await productDetailPage.clickAddToCart();
    await productDetailPage.verifyCartBadgeCount(1);

    await productDetailPage.clickBackButton();
    await authenticatedInventoryPage.verifyInventoryPageLoaded();
  });

  test('SORT-01 | Product sorting works for all supported options', async ({ authenticatedInventoryPage }) => {
    await expect(authenticatedInventoryPage.sortDropdown).toBeVisible();

    const productNames = await authenticatedInventoryPage.getAllProductNames();
    const productPrices = await authenticatedInventoryPage.getAllProductPrices();
    const numericPrice = (price: string) => Number(price.replace('$', ''));

    await authenticatedInventoryPage.sortProducts(SortOption.NAME_A_TO_Z);
    expect(await authenticatedInventoryPage.getAllProductNames()).toEqual(
      [...productNames].sort((first, second) => first.localeCompare(second))
    );

    await authenticatedInventoryPage.sortProducts(SortOption.NAME_Z_TO_A);
    expect(await authenticatedInventoryPage.getAllProductNames()).toEqual(
      [...productNames].sort((first, second) => second.localeCompare(first))
    );

    await authenticatedInventoryPage.sortProducts(SortOption.PRICE_LOW_TO_HIGH);
    expect(await authenticatedInventoryPage.getAllProductPrices()).toEqual(
      [...productPrices].sort((first, second) => numericPrice(first) - numericPrice(second))
    );

    await authenticatedInventoryPage.sortProducts(SortOption.PRICE_HIGH_TO_LOW);
    expect(await authenticatedInventoryPage.getAllProductPrices()).toEqual(
      [...productPrices].sort((first, second) => numericPrice(second) - numericPrice(first))
    );
  });
});
