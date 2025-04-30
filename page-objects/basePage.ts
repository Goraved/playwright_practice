import { Page, Locator, Response } from '@playwright/test';


// Interface definition for RequestResponseModifier - similar to your Python class
interface RequestResponseModifier {
    // This is a simplified representation - you'd implement actual methods here
    // based on what your Python RequestResponseModifier does
}

export class BasePage {
    readonly page: Page;

    /**
     * A base class for handling common web page actions in Playwright.
     * Provides methods for navigation, finding elements, reloading the page, and handling asynchronous responses.
     * 
     * @param page The Playwright page object.
     */
    constructor(page: Page) {
        this.page = page;
    }


    /**
     * Return a list of component objects found using the provided selector.
     * 
     * @param selector CSS or XPath selector to locate components on the page.
     * @param componentClass The component class to instantiate for each located element.
     * @returns A list of component objects.
     */
    async getListOfComponents<T>(
        selector: string,
        componentClass: new (locator: Locator, page: Page) => T
    ): Promise<T[]> {
        const locators = await this.page.locator(selector).all();
        return locators.map(locator => new componentClass(locator, this.page));
    }
}
