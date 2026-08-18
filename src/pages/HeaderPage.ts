import { expect, Locator, Page } from '@playwright/test';

/** Common header and navigation-menu workflows. */
export class HeaderPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // SauceDemo does not expose a data-test value for this control; use its
    // accessible name as the stable semantic fallback.
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async openMenu() {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }
}
