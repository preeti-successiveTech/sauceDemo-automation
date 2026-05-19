import { Page, Locator, expect } from "@playwright/test";
export class LoginPage {
  readonly page: Page;
  readonly userInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly logoutButton: Locator;
  readonly menuBar: Locator;
  constructor(page: Page) {
    this.page = page;
    this.userInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('h3[data-test="error"]');
    this.logoutButton = page.locator("#logout_sidebar_link");
    this.menuBar = page.locator('#react-burger-menu-btn');
  }
  async gotoLoginPage() {
    await this.page.goto("/");
  }
  async login(username: string, password: string) {
    await this.userInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  async verifyError() {
    await expect(this.errorMessage).toBeVisible();
  }
  async verifyLoginButton() {
    await expect(this.loginButton).toBeVisible();
  }
  async verifyInputFiled() {
    await expect(this.userInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }
  async ErrorText() {
    let error = await this.errorMessage.textContent();
    return error;
  }
  async logout() {
    await 
    await this.menuBar.click();
    await this.logoutButton.click();
  }
}
