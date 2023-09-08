import { test, expect } from '@playwright/test';

test("Simple basic test", async ( { page } ) => {
  await page.goto("https://www.example.com");
  const pageTitle = await page.locator("h1");
  await expect(pageTitle).toContainText("Example Domain");
});


test("Clickin on elements", async ( { page } ) => {
  await page.goto("http://zero.webappsecurity.com/index.html");
  await page.click("#signin_button");
  await page.click("text=Sign in");
  const errorMessage = await page.locator(".alert-error");
  await expect(errorMessage).toContainText("Login and/or password are wrong.");
});

test.skip("Selectors", async ( { page } ) => {
  //text
  await page.click('test=some text');

  //Css selectors
  await page.click('button');
  await page.click('#id');
  await page.click('.class');

  //Only visible css Selector
  await page.click('submit-button:visible');

  //combinations
  await page.click('#username .first');

  //xpath
  await page.click('//button');
});

test.describe("My first test suite", () => {
  
  // Para correr una pruebas marcadas con un tag
  // npx playwright test --grep @mytag 
  test("working with inputs @mytag", async ( { page } )=>{
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#signin_button");
    await page.type('#user_login', 'some username');
    await page.type('#user_password', 'some username');
    await page.click("text=Sign in");
    const errorMessage = await page.locator(".alert-error");
    await expect(errorMessage).toContainText("Login and/or password are wrong.");
  });
  
  test("Assertions @mytag", async ( { page } ) => {
    await page.goto("https://www.example.com");
    await expect(page).toHaveURL("https://www.example.com");
    await expect(page).toHaveTitle('Example Domain');
  
    const element = await page.locator('h1');
    await expect(element).toBeVisible();
    await expect(element).toHaveText('Example Domain');
    await expect(element).toHaveCount(1);
    const nonExistingElement = await page.locator('h5');
    await expect(nonExistingElement).not.toBeVisible();
  });
});