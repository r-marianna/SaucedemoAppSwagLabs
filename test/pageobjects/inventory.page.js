import { $, $$, expect } from "@wdio/globals";
import Page from "./page.js";

class InventoryPage extends Page {
  get btnCart() {
    return $(".shopping_cart_link");
  }

  get badgeCart() {
    return $('[data-test="shopping-cart-badge"]');
  }

  get btnBurgerMenu() {
    return $("#react-burger-menu-btn");
  }

  get inventoryItemsCards() {
    return $$('[data-test="inventory-item"');
  }

  get inventoryItemsNames() {
    return $$('[data-test="inventory-item-name"]');
  }

  get inventoryAddBttnsInItemsCards() {
    return $$("//button[contains(text(), 'Add to cart')]");
  }

  get dropdownSort() {
    return $('[data-test="product-sort-container"]');
  }

  async open() {
    await super.open("/inventory.html");
  }

  async clickBurgerMenuBtn() {
    await this.btnBurgerMenu.click();
  }

  async clickCartBtn() {
    await this.btnCart.click();
  }

  async clickRandomAddToCartBtn() {
    const itemCards = await this.inventoryItemsCards;
    const randomIndex = Math.floor(Math.random() * itemCards.length);
    const randomCard = itemCards[randomIndex];

    // const name = await randomCard.$('[data-test="inventory-item-name"]').getText();
    const price = await randomCard.$('[data-test="inventory-item-price"]').getText();
    const addBtn = await randomCard.$('button');
    const nameVal = await addBtn.getAttribute('data-test');
    const nameValue = nameVal.slice(12);

    await addBtn.click();
    // console.log('name ' + name);
    console.log('price ' + price);
    return {
      addedItemValue: nameValue,
      price
    };
  }

  async selectSortedOption(val) {
    await this.dropdownSort.selectByAttribute("value", val);
  }

  async returnObjectWithItemData() {
    const elements = await this.inventoryItemsCards;
    const item = {};

    for (const element of elements) {
      let name = await element.$('[data-test="inventory-item-name"]').getText();
      let price = await element
        .$('[data-test="inventory-item-price"]')
        .getText();
      console.log("name: " + name);
      console.log("price: " + price);

      item[name] = price.replace("$", "");
    }

    return item;
  }

  async returnArrayWithDropdownOptions() {
    const options = await this.dropdownSort.$$("option");
    const dropdown = [];

    for (const option of options) {
      dropdown.push(await option.getAttribute("value"));
    }

    return dropdown;
  }

  async sortProductsBy(type) {
    const { ...item } = await this.returnObjectWithItemData();

    switch (type) {
      case "priceAsc":
        return Object.fromEntries(
          Object.entries(item).sort(
            ([, aValue], [, bValue]) => Number(aValue) - Number(bValue)
          )
        );

      case "priceDesc":
        return Object.fromEntries(
          Object.entries(item).sort(
            ([, aValue], [, bValue]) => Number(bValue) - Number(aValue)
          )
        );

      case "nameAsc":
        return Object.fromEntries(
          Object.entries(item).sort(([a], [b]) => a.localeCompare(b))
        );

      case "nameDesc":
        return Object.fromEntries(
          Object.entries(item).sort(([a], [b]) => b.localeCompare(a))
        );
    }
  }

  async assertProductIsAddedToTheCart(item) {
    const bttnRemove = await $(`[data-test="remove-${item}"]`);

    await expect(bttnRemove).toHaveText("Remove");
    // $('button[data-test="remove-sauce-labs-bike-light"]');
  }

  async assertUserIsRedirectedToInventory() {
    const url = await browser.getUrl();

    expect(url).toContain("/inventory.html");
  }

  async assertCartBttnIsDisplayed() {
    await expect(this.btnCart).toBeDisplayed();
  }

  async assertInventoryItemsAreDisplayed() {
    const inventory = await this.inventoryItemsCards;
    for (const item of inventory) {
      await expect(item).toBeDisplayed();
    }
  }

  async assertCartBadgeNumber(number) {
    if (number !== "0") {
      await expect(await this.badgeCart).toHaveText(number);
    } else {
      await expect(await this.badgeCart).not.toBeDisplayed();
    }
  }

  async assertInventoryItemsAreSortedBy(sortKey, sortedItems) {
    const selectedOption = await this.dropdownSort.$('option:checked').getValue();
    await expect(selectedOption).toBe(sortKey);

    const currentItems = await this.returnObjectWithItemData();
    const currentNames = Object.keys(currentItems);
    const expectedNames = Object.keys(sortedItems);

    console.log("current: ", currentNames);
    console.log("expected:", expectedNames);

    for (let i = 0; i < currentNames.length; i++) {
      await expect(currentNames[i]).toBe(expectedNames[i]);
    }
  }
}

export default new InventoryPage();
