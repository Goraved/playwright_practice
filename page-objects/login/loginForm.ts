import { BasePage } from '../basePage';

export class LoginForm extends BasePage {


    // Locators for form elements
    get usernameInput() { return this.page.locator('[data-test="username"]'); }
    get passwordInput() { return this.page.locator('[data-test="password"]'); }
    get loginButton() { return this.page.locator('[data-test="login-button"]'); }


    /**
     * Navigate to the login page
     * 
     * @param url The URL of the login page
     */
    async open(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }


    /**
     * Fill the login form with username and password
     * 
     * @param username The username to log in
     * @param password The password to log in
     */
    async fillLoginForm(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }
}