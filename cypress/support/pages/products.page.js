class ProductsPage {
  visitStore() {
    cy.visit("produtos");
  }

  searchProduct(productName) {
    cy.get('[name="s"]').eq(1).clear().type(productName);
    cy.get(".button-search").eq(1).click();
  }

  visitProduct(productSlug) {
    cy.visit(`produtos/${productSlug}`);
  }

  addProductToCart(size, color, quantity) {
    cy.get(`.button-variable-item-${size}`).click();
    cy.get(`.button-variable-item-${color}`).click();
    cy.get(".input-text.qty").clear().type(String(quantity));
    cy.get(".single_add_to_cart_button").click();
  }

  quantityInput() {
    return cy.get(".input-text.qty");
  }

  successMessage() {
    return cy.get(".woocommerce-message");
  }

  errorMessage() {
    return cy.get(".woocommerce-error, .woocommerce-info");
  }

  productTitle() {
    return cy.get(".product_title");
  }

  productsGrid() {
    return cy.get(".products .product");
  }
}

export const productsPage = new ProductsPage();
