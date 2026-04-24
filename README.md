# Automacao Web - Cypress

Repositorio 1 do desmembramento do TCC EBAC QE.

## Objetivo

Validar fluxos criticos da aplicacao web EBAC Shop com testes E2E automatizados.

## Stack

- Cypress
- JavaScript

## Padroes aplicados

- Page Object Pattern em `cypress/support/pages`
- App Actions em `cypress/support/actions`

## Suites principais

- `cypress/e2e/login.cy.js` (US-0002)
- `cypress/e2e/add-to-cart.cy.js` (US-0001)
- `cypress/e2e/detalhes-conta.cy.js` (detalhes da conta)
- `cypress/e2e/e2e-purchase-flow.cy.js` (fluxo integrado)
- `cypress/e2e/register.cy.js` (cadastro)

## Pre-requisitos

- Node.js 20+
- npm 10+

## Instalacao

```bash
npm ci
```

## Execucao

```bash
npm run test:ui
```

Modo interativo:

```bash
npm run test:ui:open
```

## URL alvo

Configurada em `cypress.config.js`:

- `http://lojaebac.ebaconline.art.br/`

## Estrutura

```text
.
|-- cypress/
|   |-- e2e/
|   |-- fixtures/
|   `-- support/
|-- cypress.config.js
|-- package.json
`-- README.md
```
