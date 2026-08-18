import { expect, test } from '../../../src/fixtures/authenticatedContext';
import { CART_PRODUCTS } from '../../../src/data/checkoutData';
import { CartPage } from '../../../src/pages/CartPage';

test.describe('Cart behavior', () => {
  test('CART-02 | Continue shopping preserves cart state', async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BACKPACK.id);
    await authenticatedInventoryPage.clickCartLink();

    const cartPage = new CartPage(authenticatedInventoryPage.page);
    await cartPage.verifyCartPageLoaded();
    await cartPage.continueShopping();
    await authenticatedInventoryPage.verifyInventoryPageLoaded();
    await authenticatedInventoryPage.verifyCartBadgeCount(1);

    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BIKE_LIGHT.id);
    await authenticatedInventoryPage.verifyCartBadgeCount(2);
    await authenticatedInventoryPage.clickCartLink();
    await expect(cartPage.itemNames).toHaveText([
      CART_PRODUCTS.BACKPACK.name,
      CART_PRODUCTS.BIKE_LIGHT.name,
    ]);
  });
});
