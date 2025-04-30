import { Page } from '@playwright/test';
import { LoginForm } from './login/loginForm';
import { ProductsPage } from './shop/productsPage';
import { ShoppingCartPage } from './shop/cartPage';
import { CheckoutForm } from './shop/checkoutForm';

/**
 * PageManager provides centralized access to all page objects in the application.
 * This is similar to the Pages class in the Python code.
 */
export class PageManager {
    readonly page: Page;
    readonly loginPage: LoginForm;
    readonly productsPage: ProductsPage;
    readonly cartPage: ShoppingCartPage;
    readonly checkoutForm: CheckoutForm;

    /**
     * Create a new PageManager with all page objects initialized
     * 
     * @param page The Playwright page object
     */
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginForm(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new ShoppingCartPage(page);
        this.checkoutForm = new CheckoutForm(page);
    }
}