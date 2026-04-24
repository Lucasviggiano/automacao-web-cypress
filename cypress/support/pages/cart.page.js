class CartPage {
  visit() {
    cy.visit("carrinho");
  }

  cartTable() {
    return cy.get(".shop_table.cart, table.shop_table");
  }

  notices() {
    const selector = ".woocommerce-message, .woocommerce-error, .woocommerce-info, .woocommerce-notice";

    return cy
      .get("body", { timeout: 10000 })
      .find(selector)
      .should("have.length.greaterThan", 0)
      .first();
  }

  couponInput() {
    return cy.get("#coupon_code");
  }

  fillCoupon(code) {
    this.couponInput().clear().type(code);
  }

  applyCoupon() {
    cy.get(
      'input[name="apply_coupon"], button[name="apply_coupon"], input[value="Apply coupon"], button[value="Apply coupon"], .coupon .button'
    )
      .filter(":visible")
      .first()
      .click({ force: true });
  }

  totalAmount() {
    return cy.get(".order-total .woocommerce-Price-amount, .cart-subtotal .woocommerce-Price-amount");
  }

  proceedToCheckoutButton() {
    return cy.get(".checkout-button, .wc-proceed-to-checkout a");
  }

  goToCheckout() {
    this.proceedToCheckoutButton().should("be.visible").click();
  }
}

export const cartPage = new CartPage();
