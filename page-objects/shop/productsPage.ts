import { Locator } from '@playwright/test';
import { BasePage } from '../basePage';
import { ProductCard } from './productCard';

export class ProductsPage extends BasePage {


    // Locators for form elements
    get cartButton(): Locator { return this.page.locator('#shopping_cart_container'); }
    get sortDropdown() { return this.page.locator('[data-test="product-sort-container"]'); }
    get cartBadge(): Locator { return this.page.locator('[data-test="shopping-cart-badge"]'); }



    /**
     * Get all product cards on the page
     */
    async getProductCards(): Promise<ProductCard[]> {
        const productLocators = await this.page.locator('[data-test="inventory-item"]').all();
        return productLocators.map(locator => new ProductCard(locator, this.page));
    }

    /**
     * Find a product by name
     * 
     * @param name The product name to search for
     */
    async findProductByName(name: string): Promise<ProductCard | null> {
        const products = await this.getProductCards();

        for (const product of products) {
            const productName = await product.getName();
            if (productName === name) {
                return product;
            }
        }

        return null;
    }

    /**
     * Get a product card by index
     * 
     * @param index Zero-based index of the product
     */
    async getProductByIndex(index: number): Promise<ProductCard> {
        const products = await this.getProductCards();

        if (index < 0 || index >= products.length) {
            throw new Error(`Product index ${index} is out of range`);
        }

        return products[index];
    }

    /**
     * Sort products by the given option
     * 
     * @param option The sort option (e.g., 'az', 'za', 'lohi', 'hilo')
     */
    async sortProducts(option: string): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }

    /**
     * Go to the shopping cart
     */
    async goToCart(): Promise<void> {
        await this.cartButton.click();
    }

    /**
     * Get the number of items in the cart
     */
    async getCartCount(): Promise<number> {
        try {
            const text = await this.cartBadge.textContent();
            return text ? parseInt(text, 10) : 0;
        } catch (e) {
            // If the badge doesn't exist, there are 0 items
            return 0;
        }
    }

    /**
     * Add a product to cart by name
     * 
     * @param productName The name of the product to add
     */
    async addProductToCart(productName: string): Promise<void> {
        const product = await this.findProductByName(productName);
        if (!product) {
            throw new Error(`Product "${productName}" not found`);
        }

        await product.addToCart();
    }
}