import { expect, Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly itemNames: Locator;
  readonly subtotalLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async verifyCheckoutOverviewLoaded() {
    await expect(this.page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
  }

  async verifyItemNames(expectedNames: string[]) {
    await expect(this.itemNames).toHaveText(expectedNames);
  }

  async verifySubtotal(expectedSubtotal: string) {
    await expect(this.subtotalLabel).toHaveText(`Item total: ${expectedSubtotal}`);
  }

  async verifyTotal(expectedTotal: string) {
    await expect(this.totalLabel).toHaveText(`Total: ${expectedTotal}`);
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }
}
