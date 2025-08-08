import { usersInfo } from "../testdata/testData.js";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import BurgerMenu from "../pageobjects/burgermenu.page.js";
import CartPage from "../pageobjects/cart.page.js";

const user = usersInfo();

describe("Cart functionality", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(user.username.standard_user, user.password);
    await InventoryPage.open();
  });

  it("Saving the card after logout", async () => {

    await InventoryPage.assertCartBadgeNumber("0");

    const { addedItemValue, price } = await InventoryPage.clickRandomAddToCartBtn();

    await InventoryPage.assertProductIsAddedToTheCart(addedItemValue);
    await InventoryPage.assertCartBadgeNumber("1");
    await InventoryPage.clickBurgerMenuBtn();
    await BurgerMenu.assertBurgerMenuIsDisplayed();
    await BurgerMenu.assertAllLinksInBurgerMenuAreDisplayed();
    await BurgerMenu.clickLogout();
    await LoginPage.assertUserIsRedirectedToLogin();
    await LoginPage.login(user.username.standard_user, user.password);
    await InventoryPage.assertCartBttnIsDisplayed();
    await InventoryPage.assertInventoryItemsAreDisplayed();
    await InventoryPage.clickCartBtn();
    await CartPage.assertUserIsRedirectedToCart();
    await CartPage.assertDisplayedItemMatchesAdded(addedItemValue);
  });
});
