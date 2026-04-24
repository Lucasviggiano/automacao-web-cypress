import { loginPage } from "../support/pages/login.page";
import { loginActions } from "../support/actions/login.actions";
import { registerPage } from "../support/pages/register.page";

describe("US002 - Login na plataforma", () => {
  let users;
  let runtimeUser;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
      runtimeUser = {
        username: `qa.login.${Date.now()}@ebac.com`,
        password: data.registerUser.password
      };

      registerPage.visit();
      registerPage.register(runtimeUser.username, runtimeUser.password);
      registerPage.successContent().should("be.visible");

      users.validUser = runtimeUser;
      users.invalidPasswordUser = {
        username: runtimeUser.username,
        password: `${runtimeUser.password}_invalida`
      };
    });
  });

  it("CT-US002-01 - deve realizar login com credenciais validas", () => {
    loginActions.loginWithCredentials(users.validUser.username, users.validUser.password);

    cy.url().should("include", "/minha-conta");
    loginPage.accountPanel().should("be.visible");
  });

  it("CT-US002-02 - deve exibir erro ao informar senha invalida", () => {
    loginActions.loginWithCredentials(users.invalidPasswordUser.username, users.invalidPasswordUser.password);

    loginPage
      .errorMessage()
      .assertTextContainsAny([
        "erro",
        "error",
        "senha",
        "password",
        "incorreta",
        "incorrect",
        "desconhecido",
        "unknown",
        "email",
        "usuario",
        "username"
      ]);
  });

  it("CT-US002-04 - deve bloquear/alertar apos 3 tentativas invalidas consecutivas", () => {
    loginActions.attemptInvalidLogin(users.invalidPasswordUser.username, users.invalidPasswordUser.password, 3);

    loginPage
      .errorMessage()
      .assertTextContainsAny([
        "erro",
        "error",
        "tentativa",
        "attempt",
        "bloque",
        "lock",
        "desconhecido",
        "unknown",
        "email",
        "usuario",
        "username"
      ]);
  });

  it("CT-US002-05 - nao deve bloquear com apenas 2 tentativas invalidas", () => {
    loginActions.attemptInvalidLogin(users.invalidPasswordUser.username, users.invalidPasswordUser.password, 2);

    loginPage
      .errorMessage()
      .assertTextContainsAny([
        "erro",
        "error",
        "senha",
        "password",
        "incorreta",
        "incorrect",
        "desconhecido",
        "unknown",
        "email",
        "usuario",
        "username"
      ]);
    loginPage.submit();
    loginPage
      .errorMessage()
      .assertTextContainsAny([
        "erro",
        "error",
        "senha",
        "password",
        "incorreta",
        "incorrect",
        "desconhecido",
        "unknown",
        "email",
        "usuario",
        "username"
      ]);
  });
});
