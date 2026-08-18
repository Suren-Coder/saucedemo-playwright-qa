import { expect, test } from '../../../src/fixtures/authenticatedContext';
import { CART_PRODUCTS } from '../../../src/data/checkoutData';
import { CartPage } from '../../../src/pages/CartPage';

test.describe('Cart behavior', () => {
  test('CART-01 | Add and remove items with correct badge updates', async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BACKPACK.id);
    await authenticatedInventoryPage.verifyCartBadgeCount(1);
    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BIKE_LIGHT.id);
    await authenticatedInventoryPage.verifyCartBadgeCount(2);

    await authenticatedInventoryPage.clickCartLink();
    const cartPage = new CartPage(authenticatedInventoryPage.page);
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyItemCount(2);
    await expect(cartPage.itemNames).toHaveText([
      CART_PRODUCTS.BACKPACK.name,
      CART_PRODUCTS.BIKE_LIGHT.name,
    ]);

    await cartPage.removeProduct(CART_PRODUCTS.BACKPACK.id);
    await cartPage.verifyItemCount(1);
    await expect(cartPage.itemNames).toHaveText([CART_PRODUCTS.BIKE_LIGHT.name]);
    await authenticatedInventoryPage.verifyCartBadgeCount(1);
  });
});
