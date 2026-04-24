import { loginPage } from "../pages/login.page";

class LoginActions {
  loginWithCredentials(username, password) {
    loginPage.visit();
    loginPage.login(username, password);
  }

  attemptInvalidLogin(username, password, attempts = 1) {
    for (let i = 0; i < attempts; i += 1) {
      loginPage.visit();
      loginPage.login(username, password);
    }
  }
}

export const loginActions = new LoginActions();
