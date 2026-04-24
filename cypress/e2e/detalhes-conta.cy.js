import { loginActions } from "../support/actions/login.actions";
import { registerPage } from "../support/pages/register.page";

describe("US003 - Detalhes da conta", () => {
  let runtimeUser;

  before(() => {
    cy.fixture("users").then((data) => {
      runtimeUser = {
        username: `qa.account.${Date.now()}@ebac.com`,
        password: data.registerUser.password
      };

      registerPage.visit();
      registerPage.register(runtimeUser.username, runtimeUser.password);
      cy.url().should("include", "/minha-conta");
      cy.get("body").should(($body) => {
        const accountArea = $body.find(
          ".woocommerce-MyAccount-content, .woocommerce-MyAccount-navigation, .page-title"
        );
        expect(accountArea.length).to.be.greaterThan(0);
      });
    });
  });

  it("CT-US003-01 - deve atualizar detalhes da conta com sucesso", () => {
    const timestamp = Date.now();
    const firstName = `Lucas${timestamp}`;
    const lastName = "QA";
    const displayName = `lucas.qa.${timestamp}`;

    loginActions.loginWithCredentials(runtimeUser.username, runtimeUser.password);

    cy.visit("/minha-conta/edit-account/");
    cy.get("#account_first_name").should("be.visible").clear().type(firstName);
    cy.get("#account_last_name").should("be.visible").clear().type(lastName);
    cy.get("#account_display_name").should("be.visible").clear().type(displayName);
    cy.get('button[name="save_account_details"], .woocommerce-Button').first().click();

    cy.get(".woocommerce-message").should("contain.text", "Detalhes da conta modificados com sucesso");
  });
});
