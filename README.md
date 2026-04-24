# Automacao Web com Cypress

Repositorio de automacao E2E da aplicacao web EBAC Shop, com foco em fluxos criticos de compra e conta do usuario.

## Sumario

- [Visao Geral](#visao-geral)
- [Stack e Versoes](#stack-e-versoes)
- [Arquitetura de Testes](#arquitetura-de-testes)
- [Cenarios Cobertos](#cenarios-cobertos)
- [Pre-requisitos](#pre-requisitos)
- [Instalacao](#instalacao)
- [Execucao dos Testes](#execucao-dos-testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Dados de Teste (Fixtures)](#dados-de-teste-fixtures)
- [Evidencias de Execucao](#evidencias-de-execucao)
- [Troubleshooting](#troubleshooting)
- [Boas Praticas para Evolucao](#boas-praticas-para-evolucao)
- [Autor](#autor)
- [Licenca](#licenca)

## Visao Geral

Este projeto valida funcionalidades principais da loja EBAC com Cypress, incluindo:

- Login de usuario
- Cadastro de usuario
- Adicao de produto ao carrinho
- Fluxo integrado de compra ate checkout
- Atualizacao de detalhes da conta

A automacao foi estruturada para favorecer reuso e manutencao, usando Page Objects e Actions.

## Stack e Versoes

- Node.js: recomendado `20+` (testado tambem com Node `22.15.1`)
- npm: recomendado `10+`
- Cypress: `13.17.0`
- Linguagem: JavaScript

## Arquitetura de Testes

Padroes aplicados:

- **Page Object Pattern** em `cypress/support/pages`
- **Action Layer** em `cypress/support/actions`
- **Custom Commands** em `cypress/support/commands.js`

Configuracao principal em `cypress.config.js`:

- `baseUrl`: `http://lojaebac.ebaconline.art.br/`
- `specPattern`: `cypress/e2e/**/*.cy.js`
- `retries.runMode`: `2`
- `pageLoadTimeout`: `30000`
- `video`: `true`
- `screenshotOnRunFailure`: `true`

## Cenarios Cobertos

### US001 - Adicionar item ao carrinho
Arquivo: `cypress/e2e/add-to-cart.cy.js`

- CT-US001-01: adiciona produto com quantidade valida
- CT-US001-02: valida limite de quantidade
- CT-US001-03: aplica/tenta aplicar cupom
- CT-US001-05: sinaliza restricao quando total excede limite

### US002 - Login na plataforma
Arquivo: `cypress/e2e/login.cy.js`

- CT-US002-01: login com credenciais validas
- CT-US002-02: erro com senha invalida
- CT-US002-04: comportamento apos 3 tentativas invalidas
- CT-US002-05: comportamento com 2 tentativas invalidas

### US003 - Detalhes da conta
Arquivo: `cypress/e2e/detalhes-conta.cy.js`

- CT-US003-01: atualizacao de dados da conta

### Fluxo E2E de compra
Arquivo: `cypress/e2e/e2e-purchase-flow.cy.js`

- autenticacao
- adicao de item ao carrinho
- avanca para checkout
- preenchimento de dados de cobranca

### US004 - Registration
Arquivo: `cypress/e2e/register.cy.js`

- CT-US004-01: cadastro com sucesso
- CT-US004-02: erro sem email
- CT-US004-03: erro sem senha

## Pre-requisitos

1. Node.js instalado
2. npm instalado
3. Acesso a internet para abrir a aplicacao alvo

Verifique versoes:

```bash
node -v
npm -v
```

## Instalacao

No diretorio do projeto:

```bash
npm ci
```

## Execucao dos Testes

### Suite completa (headless)

```bash
npm run test:ui
```

Ou equivalente:

```bash
npm test
```

### Modo interativo

```bash
npm run test:ui:open
```

### Outras opcoes uteis

```bash
npm run cy:headed
npm run cy:chrome
```

### Executar apenas uma spec

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## Estrutura do Projeto

```text
.
|-- cypress/
|   |-- e2e/
|   |   |-- add-to-cart.cy.js
|   |   |-- detalhes-conta.cy.js
|   |   |-- e2e-purchase-flow.cy.js
|   |   |-- login.cy.js
|   |   `-- register.cy.js
|   |-- fixtures/
|   |   |-- checkout.json
|   |   |-- products.json
|   |   `-- users.json
|   |-- support/
|   |   |-- actions/
|   |   |   |-- cart.actions.js
|   |   |   |-- checkout.actions.js
|   |   |   `-- login.actions.js
|   |   |-- pages/
|   |   |   |-- cart.page.js
|   |   |   |-- checkout.page.js
|   |   |   |-- login.page.js
|   |   |   |-- products.page.js
|   |   |   `-- register.page.js
|   |   |-- commands.js
|   |   `-- e2e.js
|-- cypress.config.js
|-- package.json
`-- README.md
```

## Dados de Teste (Fixtures)

- `users.json`: usuarios validos/invalidos e base para criacao de usuarios runtime
- `products.json`: catalogo e combinacoes de produto/quantidade
- `checkout.json`: dados de cobranca para fluxo de checkout

Observacao:

- Alguns testes criam usuarios dinamicos com `Date.now()` para evitar conflito de cadastro.

## Evidencias de Execucao

Por padrao, o Cypress gera:

- Videos em `cypress/videos`
- Screenshots de falha em `cypress/screenshots`

Essas evidencias ajudam na analise de falhas intermitentes e regressao visual de fluxo.

## Troubleshooting

### 1) Timeout de carregamento em pagina remota

Erro comum:

- `Timed out after waiting 30000ms for your remote page to load`

Possiveis causas:

- Lentidao temporaria do ambiente alvo
- Recursos de pagina demorando para carregar

Acoes recomendadas:

- Reexecutar a spec para validar intermitencia
- Rodar em modo headed (`npm run cy:headed`) para depuracao
- Se necessario, elevar `pageLoadTimeout` em `cypress.config.js`

### 2) Warning ao limpar artefatos anteriores

Mensagem comum:

- `We failed to trash the existing run results`

Esse aviso nao altera o resultado final da suite, mas pode ocorrer por bloqueio de arquivo (video/screenshot em uso).

Acoes recomendadas:

- Fechar processos que estejam usando arquivos em `cypress/videos`
- Remover manualmente a pasta de artefatos antigos quando necessario

## Boas Praticas para Evolucao

- Manter seletores encapsulados em Page Objects
- Centralizar fluxos repetidos na camada de Actions
- Reutilizar fixtures para evitar dados hardcoded nos testes
- Priorizar asserts resilientes com mensagens esperadas em PT/EN quando aplicavel
- Incluir evidencia (screenshot/video) ao analisar falhas de pipeline

## Autor

Lucas Viggiano Esteves

## Licenca

ISC
