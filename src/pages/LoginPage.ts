// src/pages/LoginPage.ts
// LoginPage - Workflow-based Page Object Model for authentication flows

import { Page, Locator } from '@playwright/test';
import { getBaseUrl } from '../config/env';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[data-test="username"]');
    this.passwordInput = page.locator('input[data-test="password"]');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('h3:has-text("Epic sadface")');
  }

  /**
   * Navigate to login page
   */
  async navigate() {
    await this.page.goto(`${getBaseUrl()}/`);
  }

  /**
   * Fill username field
   */
  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Perform complete login workflow
   */
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Check if error message is visible
   */
  async isErrorVisible() {
    return this.errorMessage.isVisible().catch(() => false);
  }

  /**
   * Get error message text
   */
  async getErrorText() {
    return this.errorMessage.textContent().catch(() => '');
  }

  /**
   * Clear username field
   */
  async clearUsername() {
    await this.usernameInput.clear();
  }

  /**
   * Clear password field
   */
  async clearPassword() {
    await this.passwordInput.clear();
  }
}