import { usersInfo } from "../testdata/testData.js";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import Footer from "../pageobjects/footer.page.js";

const user = usersInfo();

describe("Footer functionality", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(user.username.standard_user, user.password);
    await InventoryPage.open();
  });

  it("Footer Links", async () => {
    await Footer.clickTwitter();
    await Footer.assertTwitterIsOpenedInANewTab();
    await Footer.clickFacebook();
    await Footer.assertFacebookIsOpenedInANewTab();
    await Footer.clickLinkedin();
    await Footer.assertLinkedinIsOpenedInANewTab();
  });
});
