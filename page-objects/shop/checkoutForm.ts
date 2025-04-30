import { BasePage } from '../basePage';

export class CheckoutForm extends BasePage {


  // Locators for form elements
  get firstNameInput() { return this.page.locator('//input[@data-test="firstName"]'); }
  get lastNameInput() { return this.page.locator('//input[@data-test="lastName"]'); }
  get zipCodeInput() { return this.page.locator('//input[@data-test="postalCode"]'); }
  get cancelButton() { return this.page.locator('//button[@data-test="cancel"]'); }
  get continueButton() { return this.page.locator('//input[@data-test="continue"]'); }
  get finishButton() { return this.page.locator('//button[@data-test="finish"]'); }
  get ponyExpressImage() { return this.page.locator('//img[@data-test="pony-express"]'); }
  get completeHeader() { return this.page.locator('//h2[@data-test="complete-header"]'); }
  get completeText() { return this.page.locator('//div[@data-test="complete-text"]'); }
  get backToProductsButton() { return this.page.locator('//button[@data-test="back-to-products"]'); }

  /**
   * Navigate to the checkout page
   * 
   * @param url The URL of the checkout page
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Fill the checkout form with customer information
   * 
   * @param firstName Customer's first name
   * @param lastName Customer's last name
   * @param zipCode Customer's zip/postal code
   */
  async fillCustomerInfo(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  /**
   * Complete the checkout process after filling the form
   */
  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Complete the order by clicking the finish button
   */
  async finishOrder(): Promise<void> {
    await this.finishButton.click();
    // Wait for the completion page to appear
    await this.completeHeader.waitFor({ state: 'visible' });
  }

  /**
   * Cancel the checkout process
   */
  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Return to the products page after completing an order
   */
  async returnToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}