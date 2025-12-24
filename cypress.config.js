const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://playground.meshery.io',
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 60000,
    requestTimeout: 45000,
    responseTimeout: 60000,
    specPattern: 'cypress/e2e/**/*.js',
    supportFile: false,
    video: true,
    videoCompression: false,
    screenshot: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: false,
    numTestsKeptInMemory: 0,
    setupNodeEvents(on, config) {
      // GPU acceleration disabled for headless Chrome
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--disable-software-rasterizer');
          launchOptions.args.push('--disable-extensions');
          launchOptions.args.push('--disable-background-networking');
          launchOptions.args.push('--disable-sync');
        }
        return launchOptions;
      });
      return config;
    },
  },
});
