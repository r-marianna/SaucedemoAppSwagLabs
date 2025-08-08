import { $, $$, expect } from "@wdio/globals";
import Page from "./page.js";

class Footer extends Page {
  get btnTwitter() {
    return $('[data-test="social-twitter"]');
  }

  get btnFacebook() {
    return $('[data-test="social-facebook"]');
  }

  get btnLinkedin() {
    return $('[data-test="social-linkedin"]');
  }

  async clickTwitter() {
    await this.btnTwitter.click();
  }

  async clickFacebook() {
    await this.btnFacebook.click();
  }

  async clickLinkedin() {
    await this.btnLinkedin.click();
  }

  async openLastWindow() {
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[handles.length - 1]);
  }

  async openHomeWindow() {
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[0]);
  }

  async assertTwitterIsOpenedInANewTab() {
    await this.openLastWindow();

    const url = await browser.getUrl();
    await expect(url).toContain('x.com/saucelabs');

    await this.openHomeWindow();
  }

  async assertFacebookIsOpenedInANewTab() {
    await this.openLastWindow();

    const url = await browser.getUrl();
    await expect(url).toContain('facebook.com/saucelabs');

    await this.openHomeWindow();
  }

  async assertLinkedinIsOpenedInANewTab() {
    await this.openLastWindow();

    const url = await browser.getUrl();
    await expect(url).toContain('linkedin.com/company/sauce-labs/');
  }

}

export default new Footer();
