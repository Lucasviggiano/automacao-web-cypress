import { registerPage } from '../support/pages/register.page'

describe('US004 - Registration', () => {
  let users

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data
    })

    registerPage.visit()
  })

  it('CT-US004-01 - should register a new user successfully', () => {
    const uniqueEmail = `lucas.${Date.now()}@ebac.com`
    const password = users.registerUser.password

    registerPage.register(uniqueEmail, password)

    registerPage
      .successContent()
      .assertTextContainsAny(['minha conta', 'my account', 'ola', 'hello', 'dashboard'])
  })

  it('CT-US004-02 - should show an error when email is missing', () => {
    registerPage.fillPassword(users.registerUser.password)
    registerPage.submit()

    registerPage
      .errorMessage()
      .assertTextContainsAny(['erro', 'error', 'email', 'obrigatorio', 'required'])
  })

  it('CT-US004-03 - should show an error when password is missing', () => {
    const uniqueEmail = `lucas.${Date.now()}@ebac.com`

    registerPage.fillEmail(uniqueEmail)
    registerPage.submit()

    registerPage
      .errorMessage()
      .assertTextContainsAny(['erro', 'error', 'senha', 'password', 'obrigatorio', 'required'])
  })
})
