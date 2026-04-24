const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 90000,
  requestTimeout: 15000,
  responseTimeout: 15000,
  execTimeout: 60000,
  taskTimeout: 60000,
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: false,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  retries: {
    runMode: 2,
    openMode: 0
  },
  reporter: 'spec',
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    specPattern: 'cypress/e2e/**/*.cy.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: true,
    setupNodeEvents(on, config) {
      return config
    }
  }
})
