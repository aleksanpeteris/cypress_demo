function getProductDesc(fixture) {
  let product_keys = []
  let product_values = []
  for (var key in fixture) {
    if (fixture[key].attribute) {
      product_keys.push(fixture[key].attribute)
      product_values.push(fixture[key].value)
    }
  }
  return [product_keys, product_values];
}

describe('Ozon page tests', () => {

  let productDetails;
  let pageAddr = "/planshet-apple-ipad-pro-4th-gen-2020-12-9-1000-gb-seryy-171523766"

  beforeEach(() => {
    cy.visit(pageAddr)
    cy.fixture("product_details").then((product) => {
      productDetails = product;
    });
  })

  it('Validate product parameters and characteristics', () => {
    let list_elements = ['dt', 'dd']
    for (const it of list_elements){
      let buf = []
      let values = []
      if (it == 'dt') {
        buf = getProductDesc(productDetails.parameters)[0]
      }
      else {
        buf = getProductDesc(productDetails.parameters)[1]
      }
      cy.get("[data-widget='webCharacteristics']").get("dl").find(it).each(($el, $index) => {
        cy.wrap($el)
         .invoke('text')
         .then(text => {
            values.push(text.trim())
            })
          }).then(() => expect(values).to.deep.eq(buf))
    }
    for (let productState of productDetails.parameters.configurations.states) {
      cy.checkButtonAvailability(productState)
    }
    for (let memory of productDetails.parameters.internalMemory.possibleValues) {
      cy.checkButtonAvailability(memory)
    }
    for (let colour of productDetails.parameters.configurations.colours) {
      cy.checkButtonAvailability(colour.code, true)
    }
    cy.get("[data-widget='webProductHeading']").then(($element) => {
      const text = $element.text()
      const expected_title = productDetails.baseProductName + 
        productDetails.parameters.internalMemory.value + "GB, "
        + productDetails.parameters.configurations.colours[1].word
      expect(text).to.deep.eq(expected_title)
    })
    cy.contains("a", "Перейти к описанию").should('have.attr', 'href').then((href) => {
      cy.visit(pageAddr + href)
    })
  })

  it('Validate product gallery', () => {
    cy.get("[data-widget='webGallery']").find('img').should('be.visible').each(($img) => {
      if ($img[0].naturalWidth < 100) {
        cy.wrap($img).click()
      }
    })
  })

  it('Test links', () => {
    cy.on('window:confirm', cy.stub().as('confirm'))
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.wrap('passed').as('ctrl')
    cy.get("a:not([href*='mailto:]']").each($el => {
      if ($el.prop('href').length > 0) {
        const message = $el.text()
        expect($el, message).to.have.attr("href").not.contain("undefined")                     
      }
    })
  })

  it('Test popups', () => {    
    cy.get('footer').scrollIntoView() 
    cy.get("[aria-label='Подсказка']").each(($btn) => {
        cy.wrap($btn).scrollIntoView().click({force: true})
      })
  })    
      
  it('Test input field', () => {    
    cy.get('input[name="text"]').then(($input) => {
      cy.wrap($input).invoke('attr', 'placeholder').should('contain','Искать на Ozon')
      cy.wrap($input).type('Our Test Data').should('have.value','Our Test Data')
      cy.wrap($input).type('{selectall}{backspace}').should('have.value','')
    })
  })
})
