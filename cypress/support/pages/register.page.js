class RegisterPage {
  visit() {
    cy.visit('/minha-conta/', {
      timeout: 90000,
      retryOnNetworkFailure: true,
      retryOnStatusCodeFailure: true
    })

    cy.get('.page-title', { timeout: 20000 })
      .should('be.visible')
      .invoke('text')
      .then((title) => {
        const normalized = String(title)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()

        expect(normalized).to.satisfy((value) =>
          value.includes('minha conta') || value.includes('my account')
        )
      })
  }

  fillEmail(email) {
    cy.get('#reg_email').should('be.visible').clear().type(email)
  }

  fillPassword(password) {
    cy.get('#reg_password').should('be.visible').clear().type(password, { log: false })
  }

  submit() {
    cy.get(':nth-child(4) > .button').click()
  }

  register(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.submit()
  }

  successContent() {
    return cy.get('.woocommerce-MyAccount-content')
  }

  errorMessage() {
    return cy.get('.woocommerce-error')
  }
}

export const registerPage = new RegisterPage()
