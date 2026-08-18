import { expect, test } from '../../../src/fixtures/authenticatedContext';
import { CART_PRODUCTS } from '../../../src/data/checkoutData';
import { CartPage } from '../../../src/pages/CartPage';

test.describe('Cart behavior', () => {
  test('CART-03 | Refresh and state resilience are acceptable', async ({ authenticatedPage, authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BACKPACK.id);
    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BIKE_LIGHT.id);
    await authenticatedPage.reload();
    await authenticatedInventoryPage.verifyInventoryPageLoaded();
    await authenticatedInventoryPage.verifyCartBadgeCount(2);

    await authenticatedInventoryPage.clickCartLink();
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.verifyCartPageLoaded();
    await expect(cartPage.itemNames).toHaveText([
      CART_PRODUCTS.BACKPACK.name,
      CART_PRODUCTS.BIKE_LIGHT.name,
    ]);
  });
});
