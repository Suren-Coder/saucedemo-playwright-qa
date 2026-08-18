import { test, expect } from '../../../src/fixtures/authenticatedContext';
import { SortOption } from '../../../src/pages/InventoryPage';



  test('SORT-01 | Product sorting works for all supported options', async ({ authenticatedInventoryPage }) => {
    await expect(authenticatedInventoryPage.sortDropdown).toBeVisible();

    const productNames = await authenticatedInventoryPage.getAllProductNames();
    const productPrices = await authenticatedInventoryPage.getAllProductPrices();
    const numericPrice = (price: string) => Number(price.replace('$', ''));

    await authenticatedInventoryPage.sortProducts(SortOption.NAME_A_TO_Z);
    expect(await authenticatedInventoryPage.getAllProductNames()).toEqual(
      [...productNames].sort((first, second) => first.localeCompare(second))
    );

    await authenticatedInventoryPage.sortProducts(SortOption.NAME_Z_TO_A);
    expect(await authenticatedInventoryPage.getAllProductNames()).toEqual(
      [...productNames].sort((first, second) => second.localeCompare(first))
    );

    await authenticatedInventoryPage.sortProducts(SortOption.PRICE_LOW_TO_HIGH);
    expect(await authenticatedInventoryPage.getAllProductPrices()).toEqual(
      [...productPrices].sort((first, second) => numericPrice(first) - numericPrice(second))
    );

    await authenticatedInventoryPage.sortProducts(SortOption.PRICE_HIGH_TO_LOW);
    expect(await authenticatedInventoryPage.getAllProductPrices()).toEqual(
      [...productPrices].sort((first, second) => numericPrice(second) - numericPrice(first))
    );
  });