class RegisterPage {
  visit() {
    cy.visit('minha-conta')
    cy.get('.page-title').should('contain', 'Minha conta')
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