import { test } from '../../../src/fixtures/authenticatedContext';
import { CART_PRODUCTS, CHECKOUT_CUSTOMER } from '../../../src/data/checkoutData';
import { CartPage } from '../../../src/pages/CartPage';
import { CheckoutInformationPage } from '../../../src/pages/CheckoutInformationPage';

test.describe('Checkout', () => {
  test('CHECK-02 | Required checkout fields block progress', async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BACKPACK.id);
    await authenticatedInventoryPage.clickCartLink();

    const cartPage = new CartPage(authenticatedInventoryPage.page);
    await cartPage.checkout();
    const checkoutInformationPage = new CheckoutInformationPage(authenticatedInventoryPage.page);
    await checkoutInformationPage.verifyCheckoutInformationLoaded();

    await checkoutInformationPage.continueCheckout();
    await checkoutInformationPage.verifyValidationError('First Name is required');

    await checkoutInformationPage.firstNameInput.fill(CHECKOUT_CUSTOMER.firstName);
    await checkoutInformationPage.continueCheckout();
    await checkoutInformationPage.verifyValidationError('Last Name is required');

    await checkoutInformationPage.lastNameInput.fill(CHECKOUT_CUSTOMER.lastName);
    await checkoutInformationPage.continueCheckout();
    await checkoutInformationPage.verifyValidationError('Postal Code is required');
  });
});
