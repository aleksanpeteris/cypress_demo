# CYPRESS DEMO PROJECT

At the moment this project contains 5 tests for page https://www.ozon.ru/product/planshet-apple-ipad-pro-4th-gen-2020-12-9-1000-gb-seryy-171523766/.
- - - -
## TESTS

Tests path: `cypress_demo/cypress/integration/demo_tests/demo_testsuite.js`

1. Validate product parameters and characteristics
    - Check all elements and theirs values are presented in product characteristics.
    - Check all product configuration buttons are available or not.
    - Check title or product is correlated with product characteristics.
    - Check workability or link to full product characteristics.
2. Validate product gallery
    - Get all images from product gallery/
    - Click all images from gallery and check their appearance in the main image placement.
3. Test links
    - Get all hyperlinks from the page.
    - Check all of them are not empty or undefined.
4. Test popups
    - Get all buttons with "Подсказка" area label.
    - Try to click all of them.
    - Test used to be flaky on Firefox
5. Test input field.
    - Navigate to main search input element.
    - Check its placeholder.
    - Try to put some text.
    - Delete text using hot keys and verify.
- - - -
## DETAILS

- Fixtures for tests are stored in `cypress/fixtures/product_details.json`
- Custom command for tests - `cypress/support/commands.js`

- - - -
## Usage

### Install dependencies
Navigate to project root directory and run `npm install`

### Run tests

To run tests use following commands (for headless mode):

- Chrome browser: `npm run cypress:run:chrome`
- Firefox browser: `npm run cypress:run:firefox`
- Electron environment: `npm run cypress:run:electron`

For GUI mode: `npm run cypress:open`

- - - -
## REPORTING

Testing mocha reports are saved in `report` directory.

## TODO

1. Linter support (eslint plugin)
2. Make environment more reproducable with docker.
