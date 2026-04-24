import { checkoutPage } from "../pages/checkout.page";

class CheckoutActions {
  fillBillingData(data) {
    checkoutPage.fillCheckoutForm(data);
  }

  placeOrder() {
    cy.get("#terms").check({ force: true });
    checkoutPage.placeOrderButton().click();
  }
}

export const checkoutActions = new CheckoutActions();
