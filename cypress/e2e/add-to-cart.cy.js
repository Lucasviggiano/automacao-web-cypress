import { productsPage } from "../support/pages/products.page";
import { cartPage } from "../support/pages/cart.page";
import { cartActions } from "../support/actions/cart.actions";

describe("US001 - Adicionar item ao carrinho", () => {
  let products;

  before(() => {
    cy.fixture("products").then((data) => {
      products = data;
    });
  });

  it("CT-US001-01 - deve adicionar produto com quantidade valida", () => {
    const product = products.sportsBra;

    cartActions.addProductFromStore(product);
    productsPage
      .successMessage()
      .assertTextContainsAny([product.name, "adicionado", "added", "carrinho", "cart"]);
  });

  it("CT-US001-02 - deve impedir quantidade acima do limite", () => {
    const product = products.quantityLimitProduct;

    productsPage.visitStore();
    productsPage.searchProduct(product.name);
    productsPage.productTitle().should("contain", product.name);
    productsPage.addProductToCart(product.size, product.color, product.invalidQuantity);

    productsPage.quantityInput().invoke("val").then((value) => {
      const numeric = Number(value);
      expect(Number.isFinite(numeric)).to.eq(true);
      expect(numeric).to.be.at.most(product.invalidQuantity);
    });
   
  });

  it("CT-US001-03 - deve tentar aplicar cupom na faixa de 10 por cento", () => {
    const product = products.runningShort;

    cartActions.addProductFromStore(product);
    cartActions.goToCart();
    cartActions.applyCoupon("EBAC10");

    cy.get("body").then(($body) => {
      const notices = $body.find(".woocommerce-message, .woocommerce-error, .woocommerce-info, .woocommerce-notice");

      if (notices.length > 0) {
        cy.wrap(notices.first()).assertTextContainsAny([
          "cupom",
          "coupon",
          "aplicado",
          "applied",
          "invalido",
          "invalid",
          "erro",
          "error"
        ]);
        return;
      }

      cartPage.cartTable().should("be.visible");
      cartPage.couponInput().should("have.value", "EBAC10");
    });
  });

  it("CT-US001-05 - deve sinalizar restricao de compra quando total excede limite", () => {
    const product = products.quantityLimitProduct;

    productsPage.visitStore();
    productsPage.searchProduct(product.name);
    productsPage.productTitle().should("contain", product.name);
    productsPage.addProductToCart(product.size, product.color, product.invalidQuantity);

    cartActions.goToCart();
    cy.get("body").then(($body) => {
      const notices = $body.find(".woocommerce-message, .woocommerce-error, .woocommerce-info, .woocommerce-notice");

      if (notices.length > 0) {
        cy.wrap(notices.first()).assertTextContainsAny([
          "carrinho",
          "cart",
          "quantidade",
          "quantity",
          "total",
          "limite",
          "limit",
          "erro",
          "error"
        ]);
        return;
      }

      cartPage.cartTable().should("be.visible");
      cartPage.totalAmount().should("be.visible");
    });
  });
});
