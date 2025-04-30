import { test, expect } from '../fixtures';

test.describe('Shop Tests', () => {
    test('Order T-Shirt', async ({ pages }) => {
        await test.step('Verify the number of products displayed.', async () => {
            const products = await pages.productsPage.getProductCards();
            expect(products.length).toBe(6);
        });

        await test.step('Verify the details of the first product.', async () => {
            const product = (await pages.productsPage.getProductCards())[0];
            expect(await product.getName()).toBe('Sauce Labs Backpack');
        });

        await test.step('Verify the description of the first product.', async () => {
            const product = (await pages.productsPage.getProductCards())[0];
            const description = await product.getDescription();
            expect(description).toBe('carry.allTheThings() with the sleek, streamlined Sly Pack that melds ' +
                'uncompromising style with unequaled laptop and tablet protection.');
        });

        await test.step('Verify the price of the first product.', async () => {
            const product = (await pages.productsPage.getProductCards())[0];
            expect(await product.getPrice()).toBe('$29.99');
        });

        await test.step('Add the first product to the cart and verify.', async () => {
            const product = (await pages.productsPage.getProductCards())[0];
            expect(await product.isAddedToCart()).toBe(false);
            await product.addToCartButton.click();
            expect(await product.isAddedToCart()).toBe(true);
            expect(await pages.productsPage.cartBadge.isVisible()).toBe(true);
            expect(await pages.productsPage.cartBadge.textContent()).toBe('1');
        });

        await test.step('Remove the product from the cart and verify.', async () => {
            const product = (await pages.productsPage.getProductCards())[0];
            await product.removeButton.click();
            expect(await product.isAddedToCart()).toBe(false);
            expect(await pages.productsPage.cartBadge.isVisible()).toBe(false);
        });

        await test.step('Add the product to the cart again and proceed to the cart page.', async () => {
            const product = (await pages.productsPage.getProductCards())[0];
            await product.addToCartButton.click();
            await pages.productsPage.cartButton.click();
            await pages.cartPage.checkoutButton.waitFor({ state: 'visible' });
        });

        await test.step('Verify the cart item details.', async () => {
            const cartItems = await pages.cartPage.getCartItems();
            expect(cartItems.length).toBe(1);

            const cartItem = cartItems[0];
            expect(await cartItem.getName()).toBe('Sauce Labs Backpack');
            expect(await cartItem.getDescription()).toBe('carry.allTheThings() with the sleek, streamlined Sly Pack that melds ' +
                'uncompromising style with unequaled laptop and tablet protection.');
            expect(await cartItem.getPrice()).toBe('$29.99');
            expect(await cartItem.getQuantity()).toBe(1);
        });

        await test.step('Proceed to the checkout form.', async () => {
            await pages.cartPage.checkoutButton.click();
            await pages.checkoutForm.firstNameInput.waitFor({ state: 'visible' });
        });

        await test.step('Fill in the checkout form and continue.', async () => {
            await pages.checkoutForm.firstNameInput.fill('John');
            await pages.checkoutForm.lastNameInput.fill('Doe');
            await pages.checkoutForm.zipCodeInput.fill('12345');
            await pages.checkoutForm.continueButton.click();
        });

        await test.step('Complete the checkout process and verify the confirmation.', async () => {
            await pages.checkoutForm.finishButton.click();
            await pages.checkoutForm.ponyExpressImage.waitFor({ state: 'visible' });

            expect(await pages.checkoutForm.completeHeader.textContent()).toBe('Thank you for your order!');

            const completeText = await pages.checkoutForm.completeText.textContent();
            expect(completeText).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

            expect(await pages.checkoutForm.backToProductsButton.isVisible()).toBe(true);
        });

        await test.step('Return to the products page.', async () => {
            await pages.checkoutForm.backToProductsButton.click();
            await pages.productsPage.sortDropdown.waitFor({ state: 'visible' });
        });
    });
});