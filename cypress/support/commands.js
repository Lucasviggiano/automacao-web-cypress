Cypress.Commands.add('login', (username, password) => {
  cy.get('#username').clear().type(username)
  cy.get('#password').clear().type(password, { log: false })
  cy.get('.woocommerce-form > .button').click()
})

Cypress.Commands.add('register', (email, password) => {
  cy.get('#reg_email').clear().type(email)
  cy.get('#reg_password').clear().type(password, { log: false })
  cy.get(':nth-child(4) > .button').click()
})

const normalizeText = (value = '') =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

Cypress.Commands.add(
  'assertTextContainsAny',
  { prevSubject: 'element' },
  (subject, expectedFragments = []) => {
    const normalizedExpected = expectedFragments
      .map((fragment) => normalizeText(fragment))
      .filter(Boolean)

    cy.wrap(subject)
      .should('be.visible')
      .invoke('text')
      .then((rawText) => {
        const normalizedText = normalizeText(rawText)

        expect(normalizedText, 'mensagem final nao pode estar vazia').to.not.eq('')

        if (normalizedExpected.length === 0) return

        const hasAnyExpectedFragment = normalizedExpected.some((fragment) =>
          normalizedText.includes(fragment)
        )

        expect(
          hasAnyExpectedFragment,
          `mensagem "${rawText}" deve conter ao menos um dos termos: ${expectedFragments.join(', ')}`
        ).to.eq(true)
      })
  }
)
