import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../baseComponent';

export class CartItem extends BaseComponent {
  constructor(root: Locator, page: Page) {
    super(root, page);
  }

  // Child elements within each cart item
  get nameElement() { return this.locator('[data-test="inventory-item-name"]'); }
  get priceElement() { return this.locator('[data-test="inventory-item-price"]'); }
  get descriptionElement() { return this.locator('[data-test="inventory-item-desc"]'); }
  get quantityElement() { return this.locator('[data-test="item-quantity"]'); }
  get removeButton() { return this.locator('button [data-test="remove-sauce-labs-backpack"]'); }
  get linkButton() { return this.locator('a [data-test="title-link"'); }

  /**
   * Get the name of the item
   */
  async getName(): Promise<string> {
    return this.nameElement.textContent().then(text => text?.trim() || '');
  }

  /**
   * Get the price of the item
   */
  async getPrice(): Promise<string> {
    return this.priceElement.textContent().then(text => text?.trim() || '');
  }

  /**
   * Get the description of the item
   */
  async getDescription(): Promise<string> {
    return this.descriptionElement.textContent().then(text => text?.trim() || '');
  }

  /**
   * Get the quantity of the item
   */
  async getQuantity(): Promise<number> {
    const text = await this.quantityElement.textContent();
    return text ? parseInt(text.trim(), 10) : 0;
  }

  /**
   * Remove this item from the cart
   */
  async remove(): Promise<void> {
    await this.removeButton.click();
  }
}