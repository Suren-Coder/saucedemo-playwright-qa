export const CHECKOUT_CUSTOMER = {
  firstName: 'Taylor',
  lastName: 'Tester',
  postalCode: '10001',
};

export const CART_PRODUCTS = {
  BACKPACK: {
    id: 'sauce-labs-backpack',
    name: 'Sauce Labs Backpack',
    price: '$29.99',
  },
  BIKE_LIGHT: {
    id: 'sauce-labs-bike-light',
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
  },
} as const;

export const CHECKOUT_TOTALS = {
  subtotal: '$39.98',
  total: '$43.18',
};
