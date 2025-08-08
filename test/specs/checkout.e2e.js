import { usersInfo, personInfo } from "../testdata/testData.js";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import CartPage from "../pageobjects/cart.page.js";
import CheckoutPage from "../pageobjects/checkout.page.js";
import OverviewPage from "../pageobjects/overview.page.js";
import CheckoutCompletePage from "../pageobjects/checkoutComplete.page.js";
import { SUCCESSFUL_ORDER_TITLE, SUCCESSFUL_ORDER_MESSAGE, CART_IS_EMPTY_MESSAGE } from "../constants/errorMessages.js";

const user = usersInfo();
const person = personInfo();

describe("Checkout functionality", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(user.username.standard_user, user.password);
    await InventoryPage.open();
  });

  it("Valid Checkout", async () => {
    await InventoryPage.assertCartBadgeNumber("0");

    const { addedItemValue, price } = await InventoryPage.clickRandomAddToCartBtn();

    await InventoryPage.assertProductIsAddedToTheCart(addedItemValue);
    await InventoryPage.assertCartBadgeNumber("1");
    await InventoryPage.clickCartBtn();
    await CartPage.assertUserIsRedirectedToCart();
    await CartPage.assertDisplayedItemMatchesAdded(addedItemValue);
    await CartPage.clickCheckout();
    await CheckoutPage.assertCheckoutFormIsDisplayed();
    await CheckoutPage.setFirstName(person.firstName);
    await CheckoutPage.setLastName(person.lastName);
    await CheckoutPage.setPostalCode(person.postalCode);
    await CheckoutPage.assertEnteredFirstNameMatch(person.firstName);
    await CheckoutPage.assertEnteredLastNameMatch(person.lastName);
    await CheckoutPage.assertEnteredPostalCodeMatch(person.postalCode);
    await CheckoutPage.clickContinue();
    await OverviewPage.assertUserIsRedirectedToOverview();
    await OverviewPage.assertDisplayedItemMatchesAdded(addedItemValue);
    await OverviewPage.assertDisplayedItemPriceMatches(price);
    await OverviewPage.clickFinish();
    await CheckoutCompletePage.assertUserIsRedirectedToCheckoutComplete();
    await CheckoutCompletePage.assertCompleteHeaderIsDisplayed();
    await CheckoutCompletePage.assertCompleteHeaderContainCorrectText(SUCCESSFUL_ORDER_TITLE);
    await CheckoutCompletePage.assertCompleteMessageIsDisplayed();
    await CheckoutCompletePage.assertCompleteMessageContainCorrectText(SUCCESSFUL_ORDER_MESSAGE);
    await CheckoutCompletePage.clickBackToProducts();
    await InventoryPage.assertUserIsRedirectedToInventory();
    await InventoryPage.assertInventoryItemsAreDisplayed();
    await InventoryPage.assertCartBadgeNumber("0");
  });


  it("Checkout without products", async () => {
    await InventoryPage.clickCartBtn();
    await CartPage.assertUserIsRedirectedToCart();
    await CartPage.assertCartIsEmpty();
    // The test below will always fail because 
    // the site does not have such functionality
    await CartPage.clickCheckout();
    await CartPage.assertUserIsRedirectedToCart();
    await CartPage.assertCompleteMessageContainText(CART_IS_EMPTY_MESSAGE);
  });
});
