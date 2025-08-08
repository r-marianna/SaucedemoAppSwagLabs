
import { $, $$, expect } from "@wdio/globals";
import Page from "./page.js";

class CheckoutCompletePage extends Page {

  get headerComplete() {
    return $('[data-test="complete-header"]');
  }

  get messageComplete() {
    return $('[data-test="complete-text"]');
  }

  get btnBackToProducts() {
    return $('[data-test="back-to-products"]');
  }

  async clickBackToProducts() {
    await this.btnBackToProducts.click();
  }

  async assertUserIsRedirectedToCheckoutComplete() {
    const url = await browser.getUrl();

    expect(url).toContain("/checkout-complete.html");
  }

  async assertCompleteHeaderIsDisplayed() {
    await expect(this.headerComplete).toBeDisplayed();
  }

  async assertCompleteHeaderContainCorrectText(message) {
    await expect(this.headerComplete).toHaveText(message);
  }

  async assertCompleteMessageIsDisplayed() {
    await expect(this.messageComplete).toBeDisplayed();
  }

  async assertCompleteMessageContainCorrectText(message) {
    await expect(this.messageComplete).toHaveText(message);
  }
}

export default new CheckoutCompletePage();