class CheckoutPage {
  billingFirstName() {
    return cy.get('#billing_first_name')
  }

  billingLastName() {
    return cy.get('#billing_last_name')
  }

  billingAddress1() {
    return cy.get('#billing_address_1')
  }

  billingCity() {
    return cy.get('#billing_city')
  }

  billingPostcode() {
    return cy.get('#billing_postcode')
  }

  billingPhone() {
    return cy.get('#billing_phone')
  }

  billingEmail() {
    return cy.get('#billing_email')
  }

  placeOrderButton() {
    return cy.get('#place_order')
  }

  orderSuccessNotice() {
    return cy.get('.woocommerce-notice, .woocommerce-order')
  }

  fillCheckoutForm(data) {
    if (data.firstName) this.billingFirstName().clear().type(data.firstName)
    if (data.lastName) this.billingLastName().clear().type(data.lastName)
    if (data.address) this.billingAddress1().clear().type(data.address)
    if (data.city) this.billingCity().clear().type(data.city)
    if (data.postcode) this.billingPostcode().clear().type(data.postcode)
    if (data.phone) this.billingPhone().clear().type(data.phone)
    if (data.email) this.billingEmail().clear().type(data.email)
  }
}

export const checkoutPage = new CheckoutPage()