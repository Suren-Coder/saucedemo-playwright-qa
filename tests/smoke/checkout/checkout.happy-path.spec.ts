import { test } from '../../../src/fixtures/authenticatedContext';
import {
  CART_PRODUCTS,
  CHECKOUT_CUSTOMER,
  CHECKOUT_TOTALS,
} from '../../../src/data/checkoutData';
import { CartPage } from '../../../src/pages/CartPage';
import { CheckoutCompletePage } from '../../../src/pages/CheckoutCompletePage';
import { CheckoutInformationPage } from '../../../src/pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../../src/pages/CheckoutOverviewPage';

test.describe('Checkout', () => {
  test('CHECK-01 | Happy path checkout completes successfully', async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BACKPACK.id);
    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BIKE_LIGHT.id);
    await authenticatedInventoryPage.clickCartLink();

    const cartPage = new CartPage(authenticatedInventoryPage.page);
    await cartPage.checkout();
    const checkoutInformationPage = new CheckoutInformationPage(authenticatedInventoryPage.page);
    await checkoutInformationPage.verifyCheckoutInformationLoaded();
    await checkoutInformationPage.fillCustomerInformation(CHECKOUT_CUSTOMER);
    await checkoutInformationPage.continueCheckout();

    const checkoutOverviewPage = new CheckoutOverviewPage(authenticatedInventoryPage.page);
    await checkoutOverviewPage.verifyCheckoutOverviewLoaded();
    await checkoutOverviewPage.verifyItemNames([
      CART_PRODUCTS.BACKPACK.name,
      CART_PRODUCTS.BIKE_LIGHT.name,
    ]);
    await checkoutOverviewPage.verifySubtotal(CHECKOUT_TOTALS.subtotal);
    await checkoutOverviewPage.verifyTotal(CHECKOUT_TOTALS.total);
    await checkoutOverviewPage.finishCheckout();

    const checkoutCompletePage = new CheckoutCompletePage(authenticatedInventoryPage.page);
    await checkoutCompletePage.verifyOrderComplete();
  });
});
