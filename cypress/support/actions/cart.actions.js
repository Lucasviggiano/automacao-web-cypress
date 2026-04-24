import { productsPage } from "../pages/products.page";
import { cartPage } from "../pages/cart.page";

class CartActions {
  addProductFromStore(product) {
    productsPage.visitStore();
    productsPage.searchProduct(product.name);
    productsPage.productTitle().should("contain", product.name);
    productsPage.addProductToCart(product.size, product.color, product.quantity);
  }

  goToCart() {
    cartPage.visit();
    cartPage.cartTable().should("be.visible");
  }

  goToCheckout() {
    cartPage.goToCheckout();
  }

  applyCoupon(code) {
    cartPage.fillCoupon(code);
    cartPage.applyCoupon();
  }
}

export const cartActions = new CartActions();
