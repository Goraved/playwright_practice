import { Locator, Page } from '@playwright/test';

export class BaseComponent {
    readonly root: Locator;
    readonly page: Page;

    /**
     * Base class for UI components that are part of a page
     * 
     * @param root The root element that defines the component's scope
     * @param page The Playwright Page instance
     */
    constructor(root: Locator, page: Page) {
        this.root = root;
        this.page = page;
    }

    /**
     * Find a child element within this component's root
     * 
     * @param selector CSS or XPath selector relative to this component's root
     * @returns A Locator for the child element
     */
    locator(selector: string): Locator {
        return this.root.locator(selector);
    }

    /**
     * Check if the component is visible
     */
    async isVisible(): Promise<boolean> {
        return this.root.isVisible();
    }

    /**
     * Check if the component is enabled
     */
    async isEnabled(): Promise<boolean> {
        return !await this.root.isDisabled();
    }

    /**
     * Wait for the component to be visible
     * 
     * @param timeout Timeout in milliseconds
     */
    async waitForVisible(timeout?: number): Promise<void> {
        await this.root.waitFor({ state: 'visible', timeout });
    }

    /**
     * Wait for the component to be hidden
     * 
     * @param timeout Timeout in milliseconds
     */
    async waitForHidden(timeout?: number): Promise<void> {
        await this.root.waitFor({ state: 'hidden', timeout });
    }

    /**
     * Get all matching child elements as components
     * 
     * @param selector CSS or XPath selector to find elements within this component
     * @param componentClass Component class to instantiate for each element
     * @returns Array of component instances
     */
    async getComponents<T extends BaseComponent>(
        selector: string,
        componentClass: new (root: Locator, page: Page) => T
    ): Promise<T[]> {
        const locators = await this.root.locator(selector).all();
        return locators.map(locator => new componentClass(locator, this.page));
    }

    /**
     * Scroll this component into view
     */
    async scrollIntoView(): Promise<void> {
        await this.root.scrollIntoViewIfNeeded();
    }

    /**
     * Click on this component
     */
    async click(options?: { force?: boolean, timeout?: number }): Promise<void> {
        await this.root.click(options);
    }

    /**
     * Get the text content of this component
     */
    async getText(): Promise<string> {
        const text = await this.root.textContent();
        return text ? text.trim() : '';
    }
}