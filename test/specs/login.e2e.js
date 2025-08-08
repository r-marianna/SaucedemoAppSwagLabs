import { usersInfo, generateWord } from "../testdata/testData.js";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import BurgerMenu from "../pageobjects/burgermenu.page.js";
import { USERNAME_AND_PASSWORD_DO_NOT_MATCH } from "../constants/errorMessages.js";

const user = usersInfo();
const generatedWord = generateWord(12);

describe("Login functionality", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it("Valid Login", async () => {
    await LoginPage.setUsername(user.username.standard_user);
    await LoginPage.assertEnteredUsernameMatch(user.username.standard_user);
    await LoginPage.setPassword(user.password);
    await LoginPage.assertEnteredPasswordMatch(user.password);
    await LoginPage.assertEnteredPasswordIsHidden();
    await LoginPage.clickSubmitBtn();
    await InventoryPage.assertUserIsRedirectedToInventory();
    await InventoryPage.assertCartBttnIsDisplayed();
    await InventoryPage.assertInventoryItemsAreDisplayed();
  });

  it("Login with invalid password", async () => {
    await LoginPage.setUsername(user.username.standard_user);
    await LoginPage.assertEnteredUsernameMatch(user.username.standard_user);
    await LoginPage.setPassword(generatedWord);
    await LoginPage.assertEnteredPasswordMatch(generatedWord);
    await LoginPage.assertEnteredPasswordIsHidden();
    await LoginPage.clickSubmitBtn();
    await LoginPage.assertXAreDisplayed();
    await LoginPage.assertFieldsAreHighlightedWithRed();
    await LoginPage.assertErrorMessageIsDisplayed(
      USERNAME_AND_PASSWORD_DO_NOT_MATCH
    );
  });

  it("Login with invalid login", async () => {
    await LoginPage.setUsername(generatedWord);
    await LoginPage.assertEnteredUsernameMatch(generatedWord);
    await LoginPage.setPassword(user.password);
    await LoginPage.assertEnteredPasswordMatch(user.password);
    await LoginPage.assertEnteredPasswordIsHidden();
    await LoginPage.clickSubmitBtn();
    await LoginPage.assertXAreDisplayed();
    await LoginPage.assertFieldsAreHighlightedWithRed();
    await LoginPage.assertErrorMessageIsDisplayed(
      USERNAME_AND_PASSWORD_DO_NOT_MATCH
    );
  });

  it("Logout", async () => {
    await LoginPage.setUsername(user.username.standard_user);
    await LoginPage.assertEnteredUsernameMatch(user.username.standard_user);
    await LoginPage.setPassword(user.password);
    await LoginPage.assertEnteredPasswordMatch(user.password);
    await LoginPage.assertEnteredPasswordIsHidden();
    await LoginPage.clickSubmitBtn();
    await InventoryPage.assertCartBttnIsDisplayed();
    await InventoryPage.assertInventoryItemsAreDisplayed();
    await InventoryPage.clickBurgerMenuBtn();
    await BurgerMenu.assertBurgerMenuIsDisplayed();
    await BurgerMenu.assertAllLinksInBurgerMenuAreDisplayed();
    await BurgerMenu.clickLogout();
    await LoginPage.assertUserIsRedirectedToLogin();
    await LoginPage.assertEnteredUsernameMatch("");
    await LoginPage.assertEnteredPasswordMatch("");
  });
});
