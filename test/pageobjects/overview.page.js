import { $, $$, expect } from "@wdio/globals";
import Page from "./page.js";

class OverviewPage extends Page {

  get labelItemsNames() {
    return $$('[data-test="inventory-item-name"]');
  }

  get labelItemsPrices() {
    return $$('[data-test="inventory-item-price"]');
  }

  get btnFinish() {
    return $('[data-test="finish"]');
  }

  async clickFinish() {
    await this.btnFinish.click();
  }

  async assertUserIsRedirectedToOverview() {
    const url = await browser.getUrl();

    expect(url).toContain("/checkout-step-two.html");
  }

  async assertDisplayedItemMatchesAdded(item) {
    const name = item.replaceAll('-', ' ');

    const shownText = await this.labelItemsNames[0].getText();
    await expect(shownText.replaceAll('-', ' ').toLowerCase()).toContain(name);
  }

  async assertDisplayedItemPriceMatches(price) {
    const shownText = await this.labelItemsPrices[0].getText();

    await expect(shownText).toBe(price);
  }
}

export default new OverviewPage();