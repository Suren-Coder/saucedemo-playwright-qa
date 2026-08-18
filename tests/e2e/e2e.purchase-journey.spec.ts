import { expect, test } from '../../src/fixtures/authenticatedContext';
import {
  CART_PRODUCTS,
  CHECKOUT_CUSTOMER,
  CHECKOUT_TOTALS,
} from '../../src/data/checkoutData';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutCompletePage } from '../../src/pages/CheckoutCompletePage';
import { CheckoutInformationPage } from '../../src/pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../src/pages/CheckoutOverviewPage';
import { HeaderPage } from '../../src/pages/HeaderPage';
import { SortOption } from '../../src/pages/InventoryPage';

test.describe('Purchase journey', () => {
  test('E2E-01 | Completes a purchase and logs out in a clean state', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.sortProducts(SortOption.PRICE_LOW_TO_HIGH);
    await expect(authenticatedInventoryPage.sortDropdown).toHaveValue(SortOption.PRICE_LOW_TO_HIGH);

    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BACKPACK.id);
    await authenticatedInventoryPage.addProductToCart(CART_PRODUCTS.BIKE_LIGHT.id);
    await authenticatedInventoryPage.verifyCartBadgeCount(2);
    await authenticatedInventoryPage.clickCartLink();

    const cartPage = new CartPage(authenticatedInventoryPage.page);
    await cartPage.verifyCartPageLoaded();
    await expect(cartPage.itemNames).toHaveText([
      CART_PRODUCTS.BACKPACK.name,
      CART_PRODUCTS.BIKE_LIGHT.name,
    ]);
    await cartPage.checkout();

    const informationPage = new CheckoutInformationPage(authenticatedInventoryPage.page);
    await informationPage.verifyCheckoutInformationLoaded();
    await informationPage.fillCustomerInformation(CHECKOUT_CUSTOMER);
    await informationPage.continueCheckout();

    const overviewPage = new CheckoutOverviewPage(authenticatedInventoryPage.page);
    await overviewPage.verifyCheckoutOverviewLoaded();
    await overviewPage.verifyItemNames([
      CART_PRODUCTS.BACKPACK.name,
      CART_PRODUCTS.BIKE_LIGHT.name,
    ]);
    await overviewPage.verifySubtotal(CHECKOUT_TOTALS.subtotal);
    await overviewPage.verifyTotal(CHECKOUT_TOTALS.total);
    await overviewPage.finishCheckout();

    const completePage = new CheckoutCompletePage(authenticatedInventoryPage.page);
    await completePage.verifyOrderComplete();

    const headerPage = new HeaderPage(authenticatedInventoryPage.page);
    await headerPage.logout();
    await expect(authenticatedInventoryPage.page).toHaveURL(/https:\/\/www\.saucedemo\.com\/$/);
    await expect(authenticatedInventoryPage.page.locator('[data-test="username"]')).toBeVisible();
  });
});
