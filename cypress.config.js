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
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          const extraArgs = (process.env.CHROME_EXTRA_ARGS || '')
            .split(' ')
            .filter(Boolean);

          const chromeArgs = [
            '--disable-gpu',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer',
            '--disable-extensions',
            '--disable-background-networking',
            '--disable-sync',
            '--headless=new',
            ...extraArgs,
          ];

          chromeArgs.forEach((arg) => {
            if (!launchOptions.args.includes(arg)) {
              launchOptions.args.push(arg);
            }
          });
        }
        return launchOptions;
      });
      return config;
    },
  },
});
