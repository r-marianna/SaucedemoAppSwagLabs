import { $, expect } from "@wdio/globals";
import Page from "./page.js";

class LoginPage extends Page {
  get inputUsername() {
    return $("#user-name");
  }

  get inputPassword() {
    return $("#password");
  }

  get btnSubmit() {
    return $("#login-button");
  }

  get xIconUsername() {
    return $("//input[@id='user-name']/../*[contains(@class, 'error_icon')]");
  }

  get xIconPassword() {
    return $("//input[@id='password']/../*[contains(@class, 'error_icon')]");
  }

  get errorMessage() {
    return $('[class*="error-message-container"]');
  }

  async open() {
    await super.open("/");
  }

  async setUsername(username) {
    await this.inputUsername.setValue(username);
  }

  async setPassword(password) {
    await this.inputPassword.setValue(password);
  }

  async clickSubmitBtn() {
    await this.btnSubmit.click();
  }
  
  async login(username, password) {
    await this.setUsername(username);
    await this.setPassword(password);
    await this.clickSubmitBtn();
  }

  async assertEnteredUsernameMatch(username) {
    await expect(this.inputUsername).toHaveValue(username);
  }

  async assertEnteredPasswordMatch(password) {
    await expect(this.inputPassword).toHaveValue(password);
  }

  async assertEnteredPasswordIsHidden() {
    await expect(await this.inputPassword.getAttribute("type")).toBe(
      "password"
    );
  }

  async assertXAreDisplayed() {
    await expect(this.xIconUsername).toBeDisplayed();
    await expect(this.xIconPassword).toBeDisplayed();
  }

  async assertFieldsAreHighlightedWithRed() {
    await expect(
      (
        await this.inputUsername.getCSSProperty("border-bottom-color")
      ).value
    ).toBe("rgba(226,35,26,1)");
    await expect(
      (
        await this.inputPassword.getCSSProperty("border-bottom-color")
      ).value
    ).toBe("rgba(226,35,26,1)");
  }

  async assertErrorMessageIsDisplayed(message) {
    await expect(await this.errorMessage.getText()).toBe(message);
  }

  async assertUserIsRedirectedToLogin() {
    const url = await browser.getUrl();

    await expect(url).toBe("https://www.saucedemo.com/");
  }

}

export default new LoginPage();
