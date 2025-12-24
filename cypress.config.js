const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://playground.meshery.io',
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    specPattern: 'cypress/e2e/**/*.js',
    supportFile: false,
    video: true,
    screenshot: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // GPU acceleration disabled for headless Chrome
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--disable-software-rasterizer');
          launchOptions.args.push('--disable-extensions');
        }
        return launchOptions;
      });
      return config;
    },
  },
});
