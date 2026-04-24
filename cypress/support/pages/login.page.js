class LoginPage {
  visit() {
    cy.visit("/minha-conta/");
  }

  fillUsername(username) {
    cy.get("#username").should("be.visible").clear().type(username);
  }

  fillPassword(password) {
    cy.get("#password").should("be.visible").clear().type(password, { log: false });
  }

  submit() {
    cy.get(".woocommerce-form > .button").click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  errorMessage() {
    return cy.get(".woocommerce-error, .alert-error, .error");
  }

  successMessage() {
    return cy.get(".page-title").should("contain.text", "Minha conta");
  }

  accountPanel() {
    return cy.get(".woocommerce-MyAccount-content, .woocommerce-MyAccount-navigation");
  }
}

export const loginPage = new LoginPage();
