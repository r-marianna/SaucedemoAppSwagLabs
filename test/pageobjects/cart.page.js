import { $, $$, expect } from "@wdio/globals";
import Page from "./page.js";

class CartPage extends Page {

  get labelItemsCards() {
    return $$('[data-test="inventory-item"]');
  }

  get labelItemsNames() {
    return $$('[data-test="inventory-item-name"]');
  }

  get btnCheckout() {
    return $('[data-test="checkout"]');
  }

  async clickCheckout() {
    await this.btnCheckout.click();
  }

  async assertUserIsRedirectedToCart() {
    const url = await browser.getUrl();

    await expect(url).toBe("https://www.saucedemo.com/cart.html");
  }

  async assertCartIsEmpty() {
    for (const label of await this.labelItemsCards) {
      await expect(label).not.toBeDisplayed();
    }
  }

  async assertDisplayedItemMatchesAdded(item) {
    const name = item.replaceAll('-', ' ');

    const shownText = await this.labelItemsNames[0].getText();
    await expect(shownText.replaceAll('-', ' ').toLowerCase()).toContain(name);
    // console.log('shownText.toString().toLowerCase() ' + shownText.replaceAll('-', ' ').toLowerCase());
  }

  async assertCompleteMessageContainText(message) {
    const messageText = await $('body').getText();
    expect(messageText).toContain(message);
  }
}

export default new CartPage();
