// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkButtonAvailability', (pattern, color = false) => {
    var button = (color) ? cy.get("[fill='" + pattern + "']").parents("[type='button']") : cy.contains("[type='button']", pattern)
    button.find('div').then($els => {
      const win = $els[0].ownerDocument.defaultView
      const after = win.getComputedStyle($els[0], '::after')
      const contentValue = after.getPropertyValue('background-image')
      expect(contentValue).to.be.oneOf(['url("https://cdn1.ozone.ru/graphics/assets/svg/diagonal-apparel.svg")', 'none']);
    })
  })