 # SauceDemo Playwright Initial Test Plan

## Application Overview

This test plan covers the live SauceDemo application as it actually behaves in the browser: authentication, product inventory, sorting, cart management, checkout, and logout. The scenarios are based on the real UI and risk areas that matter to users and business outcomes. Priority levels follow a risk-based model: P0 = critical purchase/security flow, P1 = high business impact, P2 = medium regression risk, P3 = low value or exploratory coverage. The plan emphasizes maintainable Playwright automation and follows a public GitHub repository standard.

Scope and boundaries:
- In scope: login and session handling, inventory loading, sorting, add/remove cart actions, cart persistence, checkout data validation, order completion, logout, and end-to-end purchase flow.
- Out of scope: third-party social link behavior, marketing page copy, non-functional branding polish, and low-value static UI checks.

Key automation opportunities:
- Page Object Model (POM): login page, inventory page, cart page, checkout page, confirmation page, menu/header.
- Fixtures: authenticated sessions, seeded user states, cart fixtures, checkout data sets, browser context defaults.
- Data-driven testing: valid/invalid credentials, required checkout fields, sorting combinations, low/high price order assertions.
- Cross-browser testing: Chromium, Firefox, WebKit for the critical user journeys.
- API/network testing: verify login and page transitions, cart action flows, and ensure no unexpected failed requests occur during checkout.

Recommended automation split:
- UI automation: auth, sorting, cart, checkout, logout, E2E purchase flow.
- API/network automation: session transitions, request validation, failed network detection, and regression around page loads.
- Manual/exploratory: performance-glitch user behavior, unusual state transitions, visual sanity checks, and usability around the menu and empty-state behavior.
- Not worth automating: static footer text, purely cosmetic spacing, repeated assertions on marketing copy, non-critical social links.

Scenario matrix summary:
| ID | Feature | Scenario | Priority | Expected Result | Automation Recommendation |
| --- | --- | --- | --- | --- | --- |
| AUTH-01 | Authentication | Valid login for standard user | P0 | User lands on inventory and can browse products | UI automation |
| AUTH-02 | Authentication | Invalid username/password | P0 | Error banner shown and user remains on login page | UI automation |
| AUTH-03 | Authentication | Locked-out user | P0 | Error states are displayed without access to inventory | UI automation |
| AUTH-04 | Authentication | Empty required fields | P1 | Form blocks submission with validation | UI automation |
| PROD-01 | Products | Inventory loads with product cards and prices | P1 | Products display correctly and cart badge is empty initially | UI automation |
| SORT-01 | Sorting | Validate sorting options | P1 | Name/price sort order matches expected ordering | UI automation |
| CART-01 | Cart | Add/remove items and badge count | P1 | Cart count updates and item persists in cart | UI automation |
| CART-02 | Cart | Cart persistence and continue shopping | P2 | Selections remain stable while navigating | UI automation |
| CHECK-01 | Checkout | Happy path checkout | P0 | Checkout completes and confirmation appears | UI automation |
| CHECK-02 | Checkout | Required-field validation | P0 | Missing values block progression and show validation | UI automation |
| LOGOUT-01 | Logout | Logout returns to login page | P1 | Session is cleared and user must re-authenticate | UI automation |
| E2E-01 | End-to-end journey | Full buy flow | P0 | Login -> sort -> add -> cart -> checkout -> finish succeeds | UI automation |
| REG-01 | Regression | Problem/performance user variations | P1 | App remains usable, with performance caveats handled | UI automation + manual exploratory |
| REG-02 | Regression | Refresh/cart state resilience | P2 | Page reload does not corrupt active cart state | UI automation |

The Suite below converts this matrix into executable QA scenarios for Playwright. The plan is intentionally concise but realistic for a public repository and maintainable as the app evolves.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. AUTH-01 | Valid login with standard user | P0 | Critical

**File:** `tests/auth.valid-login.spec.ts`

**Steps:**
  1. Navigate to the SauceDemo login page and sign in with the standard user credentials.
    - expect: The inventory page loads successfully.
    - expect: The visible product list is rendered and the shopping cart icon is present.
  2. Confirm that no error banner is shown after authentication.
    - expect: The user is not redirected back to the login page.
    - expect: The session is accepted for the standard user flow.

#### 1.2. AUTH-02 | Invalid credentials | P0 | Critical

**File:** `tests/auth.invalid-credentials.spec.ts`

**Steps:**
  1. Attempt login with a valid username and an incorrect password, then attempt a wrong username and a valid password.
    - expect: The app displays the error message for invalid credentials.
    - expect: The user remains on the login page and cannot access inventory.
  2. Check the login form after the error state clears or resubmits.
    - expect: The error state is not persistent after a corrected attempt.
    - expect: The user can retry cleanly.

#### 1.3. AUTH-03 | Locked-out user validation | P0 | Critical

**File:** `tests/auth.locked-user.spec.ts`

**Steps:**
  1. Attempt login using the locked-out user account.
    - expect: The login form shows the locked-out error message.
    - expect: The user remains on the login page without entering the inventory page.
  2. Verify that the message is specific and actionable for the user.
    - expect: The message clearly states that the user is locked out and access is denied.

#### 1.4. AUTH-04 | Empty-field validation | P1 | High

**File:** `tests/auth.empty-fields.spec.ts`

**Steps:**
  1. Submit the form with an empty username or empty password.
    - expect: The browser blocks submission or the app shows a validation message.
    - expect: The user is not navigated to inventory.
  2. Repeat with both fields blank to confirm both required fields are enforced.
    - expect: The validation behavior is consistent and does not allow a partial login.

### 2. Products and Sorting

**Seed:** `tests/seed.spec.ts`

#### 2.1. PROD-01 | Inventory renders correctly | P1 | High

**File:** `tests/products.inventory.spec.ts`

**Steps:**
  1. Log in as a valid user and wait for the inventory page to render.
    - expect: All expected product cards are visible.
    - expect: Each card includes a name, price, and add-to-cart action.
  2. Verify the initial cart badge is absent or zero before any items are added.
    - expect: The cart icon is visible but shows no active item count until the user adds products.

#### 2.2. SORT-01 | Product sorting by name and price | P1 | High

**File:** `tests/products.sorting.spec.ts`

**Steps:**
  1. On the inventory page, select Name (A to Z), Name (Z to A), Price (low to high), and Price (high to low).
    - expect: The product order changes to match the selected sort option.
    - expect: The sorting is consistent across all visible item cards.
  2. Validate the first and last visible items for each sort mode.
    - expect: The ordering matches expected business logic for the live product list.

#### 2.3. REG-01 | Problem and performance user variations | P1 | High

**File:** `tests/regression.user-variants.spec.ts`

**Steps:**
  1. Log in with the problem user and/or performance glitch user and inspect the core flows.
    - expect: The core actions remain usable, even if the app shows slower or different behavior in some states.
    - expect: The page does not crash or become unresponsive.
  2. Check for obvious functional differences from the standard user experience.
    - expect: The critical flows still allow product selection, cart updates, and checkout completion when the app is working as expected.

### 3. Cart and Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. CART-01 | Add and remove products with cart badge validation | P1 | High

**File:** `tests/cart.operations.spec.ts`

**Steps:**
  1. Add one product to the cart, then add a second product from the inventory list.
    - expect: The cart badge increments to reflect the correct item count.
    - expect: The cart summary matches the selected items.
  2. Open the cart, remove one item, and verify the badge and subtotal are updated.
    - expect: The removed item disappears from the cart.
    - expect: The remaining item count and totals are correct.

#### 3.2. CART-02 | Continue shopping and cart persistence | P2 | Medium

**File:** `tests/cart.continue-shopping.spec.ts`

**Steps:**
  1. Add a product, navigate to cart, then use Continue Shopping to return to the catalog.
    - expect: The user returns to the inventory page without losing the selected cart content.
    - expect: The cart badge is preserved.
  2. Add additional items after returning to the catalog.
    - expect: The cart count and selected products reflect the cumulative state.

#### 3.3. CHECK-01 | Happy path checkout | P0 | Critical

**File:** `tests/checkout.happy-path.spec.ts`

**Steps:**
  1. Add multiple products to the cart, open checkout, and enter valid customer details: first name, last name, postal code.
    - expect: The checkout step advances to the review page.
    - expect: The selected products and totals are visible and accurate.
  2. Complete the order and confirm the final order success state.
    - expect: The confirmation page is displayed, the order is marked complete, and the user can see the success state without errors.

#### 3.4. CHECK-02 | Missing checkout data validation | P0 | Critical

**File:** `tests/checkout.validation.spec.ts`

**Steps:**
  1. Navigate to checkout and leave required fields blank or incomplete.
    - expect: The app blocks progression to the next checkout step and displays field validation.
    - expect: The order is not submitted without required information.
  2. Verify the error state is specific enough to guide the user to the missing data.
    - expect: The user sees actionable feedback for first name, last name, or postal code.

#### 3.5. CHECK-03 | Cancel checkout flow | P2 | Medium

**File:** `tests/checkout.cancel.spec.ts`

**Steps:**
  1. Initiate checkout, then cancel from the information page or review page.
    - expect: The user returns to the cart page or previous state without losing selected items.
    - expect: The cart still contains the products the user chose.
  2. Continue with a later successful purchase to confirm the state is not corrupted after canceling.
    - expect: The user can continue the flow without stale or duplicate cart state.

### 4. Logout and End-to-End User Journeys

**Seed:** `tests/seed.spec.ts`

#### 4.1. LOGOUT-01 | Logout clears session and returns to login | P1 | High

**File:** `tests/logout.spec.ts`

**Steps:**
  1. Log in as a valid user, open the burger menu, and click Logout.
    - expect: The user is returned to the login page.
    - expect: The previous session is no longer valid for inventory access.
  2. Attempt to navigate back to a protected page without re-authenticating.
    - expect: The user is redirected to the login page or otherwise blocked from accessing inventory.

#### 4.2. E2E-01 | Full purchase journey | P0 | Critical

**File:** `tests/e2e.purchase-journey.spec.ts`

**Steps:**
  1. Sign in, sort products, add multiple items to the cart, review the cart, and proceed through checkout with valid data.
    - expect: The transaction completes successfully end-to-end.
    - expect: The confirmation page matches the user’s selected items and purchase state.
  2. Verify the final page state and then log out.
    - expect: The flow ends in a clean state with the login page available for the next user.

#### 4.3. REG-02 | Cart and checkout refresh resilience | P2 | Medium

**File:** `tests/regression.state-persistence.spec.ts`

**Steps:**
  1. Add products, refresh the page, and re-open the cart and checkout flow.
    - expect: The cart state remains stable and consistent with the user’s selected products.
    - expect: No duplicated or missing items are introduced by refresh.
  2. Confirm the checkout flow still behaves correctly after the refresh.
    - expect: The user can continue without unexpected data loss or stale page state.
