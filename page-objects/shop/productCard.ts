import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../baseComponent';

export class ProductCard extends BaseComponent {
    constructor(root: Locator, page: Page) {
        super(root, page);
    }

    // Child elements
    get nameElement() { return this.locator('[data-test="inventory-item-name"]'); }
    get priceElement() { return this.locator('.inventory_item_price'); }
    get descriptionElement() { return this.locator('.inventory_item_desc'); }
    get linkElement() { return this.locator('.inventory_item_label a'); }
    get addToCartButton() { return this.root.getByRole('button', { name: 'Add to cart' }); }
    get removeButton() { return this.root.getByRole('button', { name: 'Remove' }); }
    get imageElement() { return this.locator('.inventory_item_img'); }

    /**
     * Get the product name
     */
    async getName(): Promise<string> {
        return this.nameElement.textContent().then(text => text?.trim() || '');
    }

    /**
     * Get the product price
     */
    async getPrice(): Promise<string> {
        return this.priceElement.textContent().then(text => text?.trim() || '');
    }

    /**
     * Get the product description
     */
    async getDescription(): Promise<string> {
        return this.descriptionElement.textContent().then(text => text?.trim() || '');
    }

    /**
     * Get the product URL
     */
    async getLink(): Promise<string> {
        return this.linkElement.getAttribute('href').then(href => href || '');
    }

    /**
     * Add the product to cart
     */
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
        // Wait for the remove button to appear (indicating the item was added)
        await this.removeButton.waitFor({ state: 'visible' });
    }

    /**
     * Remove the product from cart
     */
    async removeFromCart(): Promise<void> {
        await this.removeButton.click();
        // Wait for the add button to reappear
        await this.addToCartButton.waitFor({ state: 'visible' });
    }

    /**
     * Open the product details page
     */
    async openDetails(): Promise<void> {
        await this.nameElement.click();
    }

    async isAddedToCart(): Promise<boolean> {
        const isVisible = await this.removeButton.isVisible();
        return isVisible;
    }
}