import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { loginData } from "../Test-data/login";
test.describe("Inventory Automation",()=>{
    let inventoryPage;
    let login;
    test.beforeEach(async({page})=>{
        login = new LoginPage(page);
        await login.gotoLoginPage();
          await login.login(loginData.username, loginData.password);
        inventoryPage = new InventoryPage(page);
    });
    test("Verify Products Are Visible",async({page})=>{
        await expect(page).toHaveURL("/inventory.html");
        await inventoryPage.VerifyProductlistVisible();
        await expect(await inventoryPage.countProducts()).toBeGreaterThan(0);
    });
    test("Verify Product Name and Price",async()=>{
        await inventoryPage.verifyProductsContainNameAndPrice();
    });
    test("Add Single Product to Cart",async()=>{
        await inventoryPage.addFirstProduct();
    });     
})