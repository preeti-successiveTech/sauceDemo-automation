import { Page, Locator, expect } from "@playwright/test";
export class InventoryPage {
  readonly page: Page;
  readonly inventrylist: Locator;
  readonly inventryItem: Locator;
  readonly cartitems: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly firstaddToCartButton: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly removeButton: Locator;
  readonly sortDropdown: Locator;
  constructor(page: Page) {
    this.page = page;
    this.inventrylist = page.locator('div[data-test="inventory-list"]');
    this.inventryItem = page.locator('div[data-test="inventory-item"]');
    this.productNames = page.locator('div[data-test="inventory-item-name"]');
    this.productPrices = page.locator('div[data-test="inventory-item-price"]');
    this.sortDropdown = page.locator(
      'select[data-test="product-sort-container"]',
    );
    this.firstaddToCartButton = page.locator(
      "#add-to-cart-sauce-labs-backpack",
    );
    this.cartBadge = page.locator('span[data-test="shopping-cart-badge"]');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.removeButton = page.locator('[data-test^="remove"]');
  }
  async VerifyProductlistVisible() {
    await expect(this.inventrylist).toBeVisible();
  }
  async countProducts() {
    let count = await this.inventryItem.count();
    return count;
  }
  async verifyProductsContainNameAndPrice() {
    const nameCount = await this.productNames.count();

    const priceCount = await this.productPrices.count();

    expect(nameCount).toBeGreaterThan(0);

    expect(priceCount).toBeGreaterThan(0);
  }
  async addFirstProduct() {
    await this.firstaddToCartButton.click();
  }
  async verifyCartProductCount(number: string) {
    if (number === "0") {
      await expect(this.cartBadge).toBeHidden();
      return;
    }
    await expect(this.cartBadge).toBeVisible();
    await expect(await this.cartBadge.textContent()).toBe(number);
  }
  async addMultipleProducts(n: number) {
    for (let i = 0; i < n; i++) {
      await this.addToCartButtons.nth(0).click();
    }
  }
  async removeItem() {
    await this.removeButton.click();
  }
  async sortProduct(value: string) {
    await this.sortDropdown.selectOption(value);
  }
  async getPrductNames() {
    return await this.productNames.allTextContents();
  }
  async getPrductPrices() {
    const prices = await this.productPrices.allTextContents();
    return await prices.map((prices) => Number(prices.replace("$", "")));
  }
}
