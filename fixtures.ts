import { test as base, Page, BrowserContext, Browser } from '@playwright/test';
import { PageManager } from './page-objects/pageManager';

// Extend Playwright's test fixtures with our own
type ShopFixtures = {
  // Custom fixtures
  authenticatedPage: Page;
  pages: PageManager;

};

// Export the extended test fixture
export const test = base.extend<ShopFixtures>({
  // Create a fixture for authenticated page that can be reused
  authenticatedPage: async ({ browser }, use) => {
    // Create a new context and page
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Set up page manager and log in
    const pages = new PageManager(page);
    await pages.loginPage.open();
    await pages.loginPage.usernameInput.fill('standard_user');
    await pages.loginPage.passwordInput.fill('secret_sauce');
    await pages.loginPage.loginButton.click();
    
    // Verify login was successful
    await pages.productsPage.sortDropdown.waitFor({ state: 'visible' });
    
    // Use the authenticated page
    await use(page);
    
    // Clean up after test
    await context.close();
  },
  
  // Create a fixture for page manager with authenticated page
  pages: async ({ authenticatedPage }, use) => {
    // Create page manager using the authenticated page
    const pages = new PageManager(authenticatedPage);
    
    // Use the page manager
    await use(pages);
  },
});

// Export expect for convenience
export { expect } from '@playwright/test';