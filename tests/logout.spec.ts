import { expect, test } from '../src/fixtures/authenticatedContext';
import { HeaderPage } from '../src/pages/HeaderPage';

test.describe('Logout', () => {
  test('LOGOUT-01 | Logout clears the session and blocks inventory access', async ({
    authenticatedPage,
  }) => {
    const headerPage = new HeaderPage(authenticatedPage);

    await headerPage.logout();

    await expect(authenticatedPage).toHaveURL(/https:\/\/www\.saucedemo\.com\/$/);
    await expect(authenticatedPage.locator('[data-test="username"]')).toBeVisible();

    await authenticatedPage.goto('https://www.saucedemo.com/inventory.html');

    await expect(authenticatedPage).toHaveURL(/https:\/\/www\.saucedemo\.com\/$/);
    await expect(authenticatedPage.locator('[data-test="login-button"]')).toBeVisible();
  });
});
