import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { loginData } from "../Test-data/login";
test.describe("Inventory Automation", () => {
  let inventoryPage;
  let login;
  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login(loginData.username, loginData.password);
    inventoryPage = new InventoryPage(page);
  });
  test("Verify Products Are Visible", async ({ page }) => {
    await expect(page).toHaveURL("/inventory.html");
    await inventoryPage.VerifyProductlistVisible();
    await expect(await inventoryPage.countProducts()).toBeGreaterThan(0);
  });
  test("Verify Product Name and Price", async () => {
    await inventoryPage.verifyProductsContainNameAndPrice();
  });
  test("Add Single Product to Cart", async () => {
    await inventoryPage.addFirstProduct();
    await inventoryPage.verifyCartProductCount("1");
  });
  test("Add Multiple Products", async () => {
    await inventoryPage.addMultipleProducts(5);
    await inventoryPage.verifyCartProductCount("5");
  });
  test("Remove Product from Inventory", async () => {
    await inventoryPage.addFirstProduct();
    await inventoryPage.verifyCartProductCount("1");
    await inventoryPage.removeItem();
    await inventoryPage.verifyCartProductCount("0");
  });
  test("Verify Sorting A → Z", async () => {
    await inventoryPage.sortProduct("az");
    const actualNames = await inventoryPage.getPrductNames();
    const expectedNames = [...actualNames].sort();
    expect(actualNames).toEqual(expectedNames);
  });
  test("Verify Sorting Z → A", async () => {
    await inventoryPage.sortProduct("za");
    const actualNames = await inventoryPage.getPrductNames();
    const expectedNames = [...actualNames].sort().reverse();
    expect(actualNames).toEqual(expectedNames);
});
test("Verify Price Low → High",async()=>{
    await inventoryPage.sortProduct("lohi");
    const actualPrices = await inventoryPage.getPrductPrices();
    const expectedPrices = [...actualPrices] .sort((a, b) => a - b);
    expect(actualPrices).toEqual(expectedPrices);
});
test("Verify Price High → Low",async()=>{
    await inventoryPage.sortProduct("hilo");
    const actualPrices = await inventoryPage.getPrductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => b - a);
    expect(actualPrices).toEqual(expectedPrices);
});
});
