# SauceDemo Playwright Test Plan

## Application Overview

Corrected final portfolio-ready SauceDemo QA plan based on actual verified browser behavior. This version removes unsupported assumptions, focuses on the app’s real functionality, and prioritizes the highest-risk user journeys: authentication, product detail, inventory sorting, cart behavior, checkout validation, session logout, and end-to-end purchase flow. It is intentionally maintainable, realistic, and suitable for public GitHub documentation and Playwright automation planning.

Scope and boundaries:
- In scope: login/logout, access control, inventory list, sorting, item detail, add/remove cart actions, cart summary, checkout validation, order confirmation, and core end-to-end purchase flow.
- Out of scope: static footer links, cosmetic branding details, and low-value marketing copy checks.

Risk-based priorities:
- P0 Critical: purchase flow, authentication, session security, required checkout validation.
- P1 High: sorting, detail page, cart state correctness, logout flow.
- P2 Medium: cancel flow, cart persistence after refresh, continue-shopping behavior.
- P3 Low: exploratory and edge-case coverage that does not affect business-critical outcomes.

Automation guidance:
- UI automation: login, sorting, cart interactions, checkout validation, logout, full purchase flow.
- API/network validation: inventory fetches, add-to-cart and checkout request payloads, failed-request detection, session transitions.
- Manual/exploratory testing: usability edge cases, visual polish, unusual browser state transitions, and resilience checks.
- Not worth automating: static footer content, marketing/copy-only checks, cosmetic details unrelated to user flow.

Scenario matrix:
| ID | Feature | Scenario | Priority | Expected Result | Automation Recommendation |
| --- | --- | --- | --- | --- | --- |
| AUTH-01 | Authentication | Valid standard-user login | P0 | Inventory page loads and products are visible | UI automation |
| AUTH-02 | Authentication | Invalid credentials | P0 | Error message shown and user remains on login page | UI automation |
| AUTH-03 | Authentication | Locked-out user | P0 | Access denied without entering inventory | UI automation |
| AUTH-04 | Authentication | Empty required fields | P1 | Submission blocked and validation displayed | UI automation |
| AUTH-05 | Authentication | Direct route access without login | P0 | Protected page access denied | UI automation + API/network |
| PROD-01 | Products | Inventory list renders with names and prices | P1 | Product cards show expected data and add-to-cart controls | UI automation |
| PROD-02 | Products | Product detail page is correct | P1 | Name, price, and back navigation match inventory state | UI automation |
| SORT-01 | Sorting | Validate all sort modes | P1 | Exact order matches name and price logic | UI automation |
| CART-01 | Cart | Add/remove items and badge sync | P1 | Badge count and cart contents remain correct | UI automation |
| CART-02 | Cart | Continue shopping preserves cart state | P2 | Selected cart contents remain visible after returning to inventory | UI automation |
| CART-03 | Cart | Refresh/cart resilience | P2 | Cart remains stable after reload or refresh | UI automation |
| CHECK-01 | Checkout | Happy path checkout | P0 | Validation passes and confirmation appears | UI automation |
| CHECK-02 | Checkout | Required field validation | P0 | Missing values block progression and show validation | UI automation |
| CHECK-03 | Checkout | Cancel checkout flow | P2 | Cart retains items after cancel | UI automation |
| LOGOUT-01 | Logout | Logout clears session | P1 | User is returned to login and must re-authenticate | UI automation |
| E2E-01 | End-to-end | Full purchase journey | P0 | Login to finish completes without user-visible errors | UI automation |
| API-01 | API/network | Inventory and session request validation | P1 | Expected requests resolve without unexpected failures | API/network testing |
| API-02 | API/network | Cart and checkout payload validation | P0 | Cart and checkout requests contain expected item and customer data | API/network testing |

## Test Scenarios

### 1. Authentication and access control

**Seed:** `tests/seed.spec.ts`

#### 1.1. AUTH-01 | Valid login for standard user

**File:** `tests/auth.valid-login.spec.ts`

**Steps:**
  1. Open the SauceDemo login page and sign in with valid credentials for the standard user.
    - expect: The inventory page loads successfully.
    - expect: All visible product cards render, and the cart icon is present.
  2. Verify that the user is not returned to the login page after authentication.
    - expect: The session is accepted for the standard user flow.
    - expect: The inventory experience is available without any login error.

#### 1.2. AUTH-02 | Invalid credentials are rejected

**File:** `tests/auth.invalid-credentials.spec.ts`

**Steps:**
  1. Attempt login with a valid username and wrong password, then retry with a wrong username and valid password.
    - expect: The app displays a credential error and prevents navigation to inventory.
    - expect: The user remains on the login page until valid credentials are entered.

#### 1.3. AUTH-03 | Locked-out user cannot access the app

**File:** `tests/auth.locked-user.spec.ts`

**Steps:**
  1. Attempt to sign in with the locked-out user account.
    - expect: The app shows the locked-out error message.
    - expect: The user remains on the login page and cannot enter inventory.

#### 1.4. AUTH-04 | Empty-field validation is enforced

**File:** `tests/auth.empty-fields.spec.ts`

**Steps:**
  1. Submit the login form with empty username, empty password, and both fields empty.
    - expect: The app blocks login submission and shows the relevant validation state.
    - expect: The user stays on the login page without accessing protected content.

#### 1.5. AUTH-05 | Direct route access without login is denied

**File:** `tests/auth.direct-route.spec.ts`

**Steps:**
  1. Attempt to navigate directly to the protected inventory route without authenticating.
    - expect: The app blocks access and redirects the user to the login page.
    - expect: The user is not able to view product inventory without a valid session.

### 2. Inventory, product detail, and sorting

**Seed:** `tests/seed.spec.ts`

#### 2.1. PROD-01 | Inventory page renders expected product data

**File:** `tests/products.inventory.spec.ts`

**Steps:**
  1. Log in as a valid user and wait for the inventory page to render.
    - expect: Product cards are visible with names, prices, and add-to-cart controls.
    - expect: The cart badge remains empty until a product is added.

#### 2.2. PROD-02 | Product detail page matches catalog state

**File:** `tests/products.details.spec.ts`

**Steps:**
  1. Open a product detail page from the inventory list and inspect the item details.
    - expect: The selected product name and price match the catalog entry.
    - expect: The user can return to the inventory list using the back navigation.
  2. Add the product from the detail page and verify the cart badge increases.
    - expect: The item is added correctly and the cart count reflects the new selection.

#### 2.3. SORT-01 | Product sorting works for all supported options

**File:** `tests/products.sorting.spec.ts`

**Steps:**
  1. Select Name A-Z, Name Z-A, Price low-high, and Price high-low from the sort dropdown.
    - expect: The visible product order matches the selected sort mode exactly.
    - expect: The order is stable and consistent across all items in the list.

### 3. Cart behavior, persistence, and checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. CART-01 | Add and remove items with correct badge updates

**File:** `tests/cart.operations.spec.ts`

**Steps:**
  1. Add multiple products from the inventory page, then open the cart.
    - expect: The cart badge count matches the number of items selected.
    - expect: The cart contains the expected items in the correct quantity.
  2. Remove one item and confirm the badge and cart contents update.
    - expect: The removed item is no longer listed in the cart.
    - expect: The remaining count and totals reflect the updated selection.

#### 3.2. CART-02 | Continue shopping preserves cart state

**File:** `tests/cart.continue-shopping.spec.ts`

**Steps:**
  1. Add a product, open the cart, then return to the inventory page using Continue Shopping.
    - expect: The user returns to the product list without losing the selected cart state.
    - expect: The cart badge remains accurate after the navigation.

#### 3.3. CART-03 | Refresh and state resilience are acceptable

**File:** `tests/cart.refresh.spec.ts`

**Steps:**
  1. Add products to the cart and refresh the page.
    - expect: The active cart state remains consistent with the user’s selected items.
    - expect: No unexpected duplicate or missing products appear after reload.

#### 3.4. CHECK-01 | Happy path checkout completes successfully

**File:** `tests/checkout.happy-path.spec.ts`

**Steps:**
  1. Add multiple items to the cart, proceed to checkout, and enter valid first name, last name, and postal code.
    - expect: The checkout step advances to the review screen.
    - expect: The selected products and totals appear correctly for the customer.
  2. Finish the order and confirm the order completion screen is shown.
    - expect: The confirmation page loads, and the order completion state is visible without errors.

#### 3.5. CHECK-02 | Required checkout fields block progress

**File:** `tests/checkout.validation.spec.ts`

**Steps:**
  1. Attempt to continue checkout with blank or incomplete customer data.
    - expect: Progression is blocked until the required fields are valid.
    - expect: The validation message clearly identifies the missing or invalid information.

#### 3.6. CHECK-03 | Cancel checkout preserves cart state

**File:** `tests/checkout.cancel.spec.ts`

**Steps:**
  1. Start checkout and then cancel before finishing the order.
    - expect: The user returns to the cart or previous step without losing selected items.
    - expect: The cart remains in a valid state for a later successful purchase.

### 4. Logout, end-to-end flow, and network validation

**Seed:** `tests/seed.spec.ts`

#### 4.1. LOGOUT-01 | Logout clears the active session

**File:** `tests/logout.spec.ts`

**Steps:**
  1. Sign in, open the side menu, and click Logout.
    - expect: The user is returned to the login page.
    - expect: A protected page cannot be accessed without signing in again.

#### 4.2. E2E-01 | Full purchase journey is successful end to end

**File:** `tests/e2e.purchase-journey.spec.ts`

**Steps:**
  1. Sign in, sort products, add multiple items, proceed to checkout, and finish the order.
    - expect: The full purchase flow succeeds without user-visible error states.
    - expect: The order completion page appears at the end of the journey.

#### 4.3. API-01 | Inventory and session requests are valid

**File:** `tests/api.session-and-inventory.spec.ts`

**Steps:**
  1. Observe the login and inventory page loads during the main user flow.
    - expect: The key requests resolve successfully and do not fail unexpectedly.
    - expect: Session and page transitions behave as expected.

#### 4.4. API-02 | Cart and checkout payloads are correct

**File:** `tests/api.cart-and-checkout.spec.ts`

**Steps:**
  1. Inspect the cart and checkout request activity during the purchase flow.
    - expect: Request payloads reflect the customer details and selected products correctly.
    - expect: No unexpected failed requests occur during the critical purchase path.
