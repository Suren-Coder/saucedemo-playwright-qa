import { test, expect } from '../../../src/fixtures/authenticatedContext';
import { ProductDetailPage } from '../../../src/pages/ProductDetailPage';

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