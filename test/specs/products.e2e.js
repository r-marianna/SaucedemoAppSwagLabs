import { usersInfo } from "../testdata/testData.js";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";

const user = usersInfo();

describe("Sorting functionality", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(user.username.standard_user, user.password);
    await InventoryPage.open();
  });

  it("Sorting", async () => {
    const sortTypes = ["az", "za", "lohi", "hilo"];
    const expectedSortKeys = ["nameAsc", "nameDesc", "priceAsc", "priceDesc"];

    for (let i = 0; i < sortTypes.length; i++) {
      const dropdownValue = sortTypes[i];
      const sortKey = expectedSortKeys[i];

      await InventoryPage.selectSortedOption(dropdownValue);

      const expectedSortedItems = await InventoryPage.sortProductsBy(sortKey);
      await InventoryPage.assertInventoryItemsAreSortedBy(
        dropdownValue,
        expectedSortedItems
      );
    }
  });
});
