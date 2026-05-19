import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { loginData } from "../Test-data/login";

test.describe("login flow", async () => {
  let loginpage;
  test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    await loginpage.gotoLoginPage();
  });
  test("successfull login with valid credentials", async ({ page }) => {
    await loginpage.login(loginData.username, loginData.password);
    await expect(page).toHaveURL("/inventory.html");
  });
  test("It should dispaly error when login with invalid credentials", async () => {
    await loginpage.login(loginData.invalidUsername, loginData.invalidPassword);
    await loginpage.verifyError();
    expect(await loginpage.ErrorText()).toBe(loginData.wrongcreditionalError);
  });
  test("login with empty username", async () => {
    await loginpage.login("", loginData.password);
    await loginpage.verifyError();
    expect(await loginpage.ErrorText()).toBe(loginData.emptyUsernameError);
  });
  test("login with empty password", async () => {
    await loginpage.login(loginData.username, "");
    await loginpage.verifyError();
    expect(await loginpage.ErrorText()).toBe(loginData.emptyPasswordError);
  });
  test("login With both fields empty", async () => {
    await loginpage.login("", "");
    await loginpage.verifyError();
    expect(await loginpage.ErrorText()).toBe(loginData.bothEmptyError);
  });
  test("Locked User Login Attempt", async () => {
    await loginpage.login(loginData.lockedUsername, loginData.password);
    await loginpage.verifyError();
    expect(await loginpage.ErrorText()).toBe(loginData.lockedUserError);
  });
  test("Verify Login Button Visible", async () => {
    await loginpage.verifyLoginButton();
  });
  test("Verify UserName and Password field Visible", async () => {
    await loginpage.verifyInputFiled();
  });
  test("Verify User Cannot Access Inventory Without Login",async({page})=>{
    await page.goto("/inventory.html");
    await expect(page).toHaveURL("/");
  });
  test("Verify Logout Redirects to Login Page",async({page})=>{
    await loginpage.login(loginData.username, loginData.password);
    await loginpage.logout();
    await expect(page).toHaveURL("/");
  });
  test("Login with Leading/Trailing Spaces",async()=>{
    await loginpage.login(` ${loginData.username} `,loginData.password);
    await loginpage.verifyError();
    expect(await loginpage.ErrorText()).toBe(loginData.wrongcreditionalError);
  });
  
});
