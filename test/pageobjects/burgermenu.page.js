import { $, $$, expect } from "@wdio/globals";
import Page from "./page.js";

class BurgerMenu extends Page {
    
    get containerBurgerMenu() {
        return $(".bm-menu");
    }
    
    get linkAllItems() {
        return $("#inventory_sidebar_link");
    }
    
    get linkAbout() {
        return $("#about_sidebar_link");
    }
    
    get linkLogout() {
        return $("#logout_sidebar_link");
    }
    
    get linkResetAppState() {
        return $("#reset_sidebar_link");
    }

    async clickLogout() {
        await this.linkLogout.click();
    }

    async assertBurgerMenuIsDisplayed () {
        await expect(this.containerBurgerMenu).toBeDisplayed();
    }

    async assertAllItemsLinkIsDisplayed () {
        await expect(this.linkAllItems).toBeDisplayed();
    }

    async assertAboutLinkIsDisplayed () {
        await expect(this.linkAbout).toBeDisplayed();
    }

    async assertLogoutLinkIsDisplayed () {
        await expect(this.linkLogout).toBeDisplayed();
    }

    async assertResetAppStateLinkIsDisplayed () {
        await expect(this.linkResetAppState).toBeDisplayed();
    }

    async assertAllLinksInBurgerMenuAreDisplayed() {
        await this.assertAllItemsLinkIsDisplayed();
        await this.assertAboutLinkIsDisplayed();
        await this.assertLogoutLinkIsDisplayed();
        await this.assertResetAppStateLinkIsDisplayed();
    }


}

export default new BurgerMenu();