const assert = require('assert')
const playwright = require('playwright');
require("mocha-allure-reporter");
let mocha = require('mocha');
let browser
let page

before(async () => {
    browser = await playwright.chromium.launch({
//        executablePath:'/usr/bin/chromium',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    })

       context = await browser.newContext();
       page = await context.newPage();
})

const screenshot = allure.createStep("saveScreenshot", async name => {
    const res = await page.screenshot();
    // Webdriver.io produces values as base64-encoded string. Allure expects either plain text
    // string or Buffer. So, we are decoding our value, using constructor of built-in Buffer object
    allure.createAttachment(name, res, "image/png");
});

const openSite = allure.createStep("Open site", async () => {
    const pageUrl = 'http://automationpractice.com/index.php';
    allure.createStep('Open site')
    await page.goto(pageUrl);
    allure.addArgument("pageUrl", pageUrl);
});

const openTShirtCategory = allure.createStep("Open T-Shirt category", async () => {
    await page.click('li:nth-child(3) > a[title="T-shirts"]');
});

const addItemToCartAndProceed = allure.createStep("Open item to cart and proceed", async () => {
    await page.hover('[itemprop="name"]');
    await page.click('[itemprop="name"]');
    await page.click('#add_to_cart');
    await page.click('[title="Proceed to checkout"]');
});

const goToSecondCartStep = allure.createStep("Go to the second cart step", async () => {
    await page.click('p > a.button.btn.btn-default.standard-checkout.button-medium');
});

const register = allure.createStep("Register new account", async () => {
    await page.click("#email_create");
    var rand = Math.random().toString(36).substring(7);
    await page.type("#email_create", `goraved@${rand}.com`);
    await page.click("#SubmitCreate");
    await page.click('[name="id_gender"]');
    await page.click('[name="customer_firstname"]');
    await page.type('[name="customer_firstname"]', "Test");
    await page.type('[name="customer_lastname"]', "Goraved");
    await page.click('[name="passwd"]');
    await page.type('[name="passwd"]', "123asd");
    await page.selectOption("#days", "1");
    await page.selectOption("#months", "1");
    await page.selectOption("#years", "2020");
    await page.click('[name="optin"]');
    await page.click("#newsletter");
    await page.click('[name="firstname"]');
    await page.click('[name="address1"]');
    await page.type('[name="address1"]', "street");
    await page.click("#city");
    await page.type("#city", "test");
    await page.selectOption("#id_state", "1");
    await page.click("#postcode");
    await page.type("#postcode", "11111");
    await page.click("#other");
    await page.type("#other", "123");
    await page.click("#phone_mobile");
    await page.type("#phone_mobile", "123");
    await page.click("#alias");
    await page.click("#alias");
    await page.click("#alias");
    await page.click("#submitAccount");
});

const finishOrder = allure.createStep("Finish order after registration", async () => {
    await page.waitForSelector('#center_column > form > p > button');
    await page.click('#center_column > form > p > button');
    await page.waitForSelector('[name="cgv"]');
    await page.click('[name="cgv"]');
    await page.click("#form > p > button");
    await page.waitForSelector('[title="Pay by bank wire"]');
    await page.click('[title="Pay by bank wire"]');
    await page.waitForSelector("#cart_navigation > button");
    await page.click("#cart_navigation > button");
});

const openProfileOrders = allure.createStep("Open profile orders page", async () => {
    await page.click('[title="View my customer account"]');
    await page.waitForSelector('[title="Orders"]');
    await page.click('[title="Orders"]');
});

const checkOrderPresent = allure.createStep("Check at least 1 order presnt", async () => {
    await page.waitForSelector('#order-list > tbody > tr', {
        visible: true
    });
});

  beforeEach(() => {
    allure.feature("Shop");
  });

describe('Shop', async () => {

    it('Order T-Shirt', async () => {
        await openSite();
        await openTShirtCategory();
        await addItemToCartAndProceed();
        await goToSecondCartStep();
        await register();
        await finishOrder();
        await openProfileOrders();
        await checkOrderPresent();
    }).timeout(200000)

})

afterEach("take screenshot on failure", function() {
    if (this.currentTest.state !== "passed") {
        return screenshot("screenshot on fail");
    }
});

after(async () => {
    await browser.close()
})