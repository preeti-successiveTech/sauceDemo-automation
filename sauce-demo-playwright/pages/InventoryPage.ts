import { Page, Locator, expect } from "@playwright/test";
export class InventoryPage{
    readonly page : Page;
    readonly inventrylist :Locator;
    readonly inventryItem : Locator;
    readonly cartitems: Locator;
    readonly productNames : Locator;
    readonly productPrices : Locator;
    readonly addToCartButton : Locator;
      constructor(page: Page) {
    this.page = page;
    this.inventrylist = page.locator('div[data-test="inventory-list"]');
    this.inventryItem = page.locator('div[data-test="inventory-item"]');
    this.productNames = page.locator('div[data-test="inventory-item-name"]');
    this.productPrices = page.locator('div[data-test="inventory-item-price"]');
        this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');

    }
    async VerifyProductlistVisible()
    {
        await expect(this.inventrylist).toBeVisible();
    
    }
    async countProducts()
    {
        let count = await this.inventryItem.count();
        return count;
    }
    async verifyProductsContainNameAndPrice() {

    const nameCount =
      await this.productNames.count();

    const priceCount =
      await this.productPrices.count();

    expect(nameCount).toBeGreaterThan(0);

    expect(priceCount).toBeGreaterThan(0);
  }
  async addFirstProduct()
  {
    await this.addToCartButton.nth(0).click();
  
  }
}