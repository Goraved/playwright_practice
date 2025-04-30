import { CartItem } from './cartItemComponent';
import { BasePage } from '../basePage';

export class ShoppingCartPage extends BasePage {

  

  // Page elements
  get title() { return this.page.locator('.title'); }
  get checkoutButton() { return this.page.locator('[data-test="checkout"]'); }
  get continueShoppingButton() { return this.page.locator('button[data-test="continue-shopping"]'); }
  
  /**
   * Navigate to the shopping cart page
   */
  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/cart.html');
    await this.title.waitFor({ state: 'visible' });
  }

  /**
   * Get all cart items
   */
  async getCartItems(): Promise<CartItem[]> {
    const itemLocators = await this.page.locator('[data-test="inventory-item"]').all();
    return itemLocators.map(locator => new CartItem(locator, this.page));
  }

  /**
   * Find a cart item by name
   * 
   * @param name The name of the product to find
   */
  async findItemByName(name: string): Promise<CartItem | null> {
    const items = await this.getCartItems();
    
    for (const item of items) {
      const itemName = await item.getName();
      if (itemName === name) {
        return item;
      }
    }
    
    return null;
  }

  /**
   * Get the total number of items in the cart
   */
  async getItemCount(): Promise<number> {
    const items = await this.getCartItems();
    return items.length;
  }

  /**
   * Remove an item from the cart by name
   * 
   * @param name The name of the item to remove
   */
  async removeItem(name: string): Promise<void> {
    const item = await this.findItemByName(name);
    if (!item) {
      throw new Error(`Item "${name}" not found in cart`);
    }
    
    await item.remove();
  }

  /**
   * Calculate the total price of all items in the cart
   */
  async getTotalPrice(): Promise<number> {
    const items = await this.getCartItems();
    let total = 0;
    
    for (const item of items) {
      const priceText = await item.getPrice();
      const price = parseFloat(priceText.replace('$', ''));
      total += price;
    }
    
    return parseFloat(total.toFixed(2)); // Round to 2 decimal places
  }

  /**
   * Proceed to checkout
   */
  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Continue shopping (return to products page)
   */
  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}