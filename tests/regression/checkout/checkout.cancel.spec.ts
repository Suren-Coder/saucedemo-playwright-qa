import { expect, test } from '../../../src/fixtures/authenticatedContext';
import { CART_PRODUCTS } from '../../../src/data/checkoutData';
import { CartPage } from '../../../src/pages/CartPage';
import { CheckoutInformationPage } from '../../../src/pages/CheckoutInformationPage';

test.describe('Checkout', () => {
  test('CHECK-03 | Cancel checkout preserves cart state', async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BACKPACK.id);
    await authenticatedInventoryPage.clickCartLink();

    const cartPage = new CartPage(authenticatedInventoryPage.page);
    await cartPage.checkout();
    const checkoutInformationPage = new CheckoutInformationPage(authenticatedInventoryPage.page);
    await checkoutInformationPage.verifyCheckoutInformationLoaded();
    await checkoutInformationPage.cancelCheckout();

    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyItemCount(1);
    await expect(cartPage.itemNames).toHaveText([CART_PRODUCTS.BACKPACK.name]);
  });
});
