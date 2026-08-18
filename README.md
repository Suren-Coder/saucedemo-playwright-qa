# SauceDemo Playwright QA Automation

> Portfolio-grade end-to-end test automation framework built with Playwright and TypeScript, demonstrating practical QA engineering practices, maintainable automation architecture, cross-browser testing, CI/CD, reporting, and AI-assisted test development.

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)


---

## 🎯 Project Overview

This project is a portfolio-focused QA automation framework for [SauceDemo](https://www.saucedemo.com/), a demo e-commerce web application.

The objective was not only to automate functional scenarios, but to design a maintainable Playwright framework that demonstrates how I approach software quality and test automation as a QA Engineer.

The framework focuses on:

- Risk-based test coverage
- Page Object Model
- Reusable Playwright fixtures
- Centralized test data
- Stable locator strategy
- Web-first assertions
- Test isolation
- Smoke, regression, and E2E coverage
- Cross-browser testing
- Failure diagnostics and reporting
- AI-assisted application exploration and test development

---

## 🧪 QA Capabilities Demonstrated

| Area | Implementation |
|---|---|
| Test Design | Risk-based functional test scenarios |
| UI Automation | Playwright + TypeScript |
| Framework Design | Page Object Model |
| Test Organization | Smoke, Regression, and E2E |
| Test Data | Centralized test data |
| Fixtures | Reusable authenticated test context |
| Locators | Stable `data-test` and semantic locators |
| Assertions | Playwright web-first assertions |
| Browser Coverage | Chromium, Firefox, and WebKit |
| Reporting | Playwright HTML Report |
| Diagnostics | screenshots, and test artifacts |
| Version Control | Git + GitHub |
| AI-Assisted Testing | Playwright MCP and Playwright Agents |

---

## 🔍 Test Coverage

### 1. Authentication & Access Control

- Valid user login
- Invalid credentials
- Locked-out user
- Empty credential validation
- Protected-route access
- Logout

### 2. Inventory, Product Details & Sorting

- Inventory page rendering
- Product information validation
- Product detail navigation
- Product detail information validation
- Sort products by name ascending
- Sort products by name descending
- Sort products by price ascending
- Sort products by price descending

### 3. Cart Behavior & Persistence

- Add products to cart
- Remove products from cart
- Cart badge/count validation
- Continue shopping
- Cart persistence
- Cart state validation

### 4. Checkout

- Checkout navigation
- Required field validation
- Checkout information validation
- Checkout overview
- Successful checkout
- Checkout cancellation

### 5. End-to-End Purchase Journey

The framework also covers the complete critical user journey:


Login
  ↓
Browse Products
  ↓
Select Product
  ↓
Add to Cart
  ↓
Review Cart
  ↓
Checkout
  ↓
Order Confirmation
  ↓
Logout


## 📊 Test Evidence & Validation

> **Designed → Implemented → Executed → Validated**

This project includes supporting evidence that demonstrates the automation
framework was not only designed and implemented, but also executed and
validated through Playwright test runs and reporting.

### 🧪 Test Execution

The automated test suites were executed to validate the implemented
functional coverage and confirm the behavior of the test framework.

<div align="center">

![Test Execution](docs\evidence\successful-test-execution.PNG)

</div>

**Evidence demonstrates:**

- Automated test execution
- Test suite results
- Successful scenario validation
- Playwright test runner output

---

### 📈 Playwright HTML Report

Playwright's HTML report provides a detailed view of the test execution,
including individual test results and execution status.

<div align="center">

![Playwright HTML Report](docs\evidence\HTML-report.PNG)

</div>

**Why this matters:**

The report provides a clear and structured way to review automation
results and investigate failed scenarios.

---

## 📋 Test Planning & Documentation

Automation was approached as a **QA engineering process**, rather than
simply writing test scripts.

Before implementation, the application was analyzed and the test
coverage and automation approach were documented.

### 📚 Planning Documents

text
docs/
└── ai-generated/
    ├── initial-test-plan.md
    └── automation-strategy.md

