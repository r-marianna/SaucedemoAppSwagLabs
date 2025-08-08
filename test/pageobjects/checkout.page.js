import { $, $$, expect } from "@wdio/globals";
import Page from "./page.js";

class CheckoutPage extends Page {

  get inputFirstName() {
    return $('[data-test="firstName"]');
  }

  get inputLastName() {
    return $('[data-test="lastName"]');
  }

  get inputPostalCode() {
    return $('[data-test="postalCode"]');
  }

  get btnContinue() {
    return $('[data-test="continue"]');
  }

  async clickContinue() {
    await this.btnContinue.click();
  }

  async setFirstName(firstName) {
    await this.inputFirstName.setValue(firstName);
  }

  async setLastName(lastName) {
    await this.inputLastName.setValue(lastName);
  }

  async setPostalCode(zip) {
    await this.inputPostalCode.setValue(zip);
  }

  async assertCheckoutFormIsDisplayed() {
    await expect(this.inputFirstName).toBeDisplayed();
    await expect(this.inputLastName).toBeDisplayed();
    await expect(this.inputPostalCode).toBeDisplayed();
  }

  async assertEnteredFirstNameMatch(firstName) {
    await expect(this.inputFirstName).toHaveValue(firstName);
  }

  async assertEnteredLastNameMatch(lastName) {
    await expect(this.inputLastName).toHaveValue(lastName);
  }

  async assertEnteredPostalCodeMatch(zip) {
    await expect(this.inputPostalCode).toHaveValue(zip);
  }
}

export default new CheckoutPage();