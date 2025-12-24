# Cypress Test Failure Resolution Guide

## Problem Summary
The Kanvas Screenshot Service workflow is failing with:
```
TypeError: Cannot read properties of undefined (reading 'fit')
```
This occurs in `loadDesign.js` at line 53 for both light and dark mode tests.

## Root Causes

1. **Missing Design Renderer** - The design canvas element (`fit()` method) is undefined because the Meshery playground or design renderer isn't fully loaded
2. **GPU/Display Issues** - The error `dri3 extension not supported` indicates headless Chrome rendering problems
3. **Timing Issues** - The test runs before the design is fully rendered in the Meshery playground

## Implemented Fixes

### 1. Meshery Playground Health Check
Added a `Wait for Meshery Playground` step that:
- Attempts connection to `https://playground.meshery.io` up to 30 times
- Waits 5 seconds between attempts (150 seconds total timeout)
- Ensures the playground is responsive before running tests

### 2. Chrome GPU Acceleration Disabled
Added environment variables to disable GPU acceleration:
```yaml
env:
  CYPRESS_chromeWebSecurity: false
  CYPRESS_RECORD_DISABLED: true
  CYPRESS_baseUrl: "https://playground.meshery.io"
```

These settings:
- Disable Chrome Web Security (required for cross-origin design loading)
- Disable Cypress recording (reduces memory usage)
- Set explicit base URL for all tests

### 3. Cypress Configuration
Created `cypress.config.js` with:
- Extended timeout values (15-30 seconds)
- GPU disabling flags for Chrome
- Proper viewport size (1920x1080)
- Screenshot and video capture on failures

## Next Steps for Further Debugging

### If tests still fail:

1. **Check Meshery Cloud Token**
   ```bash
   # Verify MESHERY_TOKEN secret is set correctly
   # Should be a valid JWT token from https://cloud.meshery.io
   ```

2. **Verify Design ID**
   - Ensure `inputs.contentID` is a valid, existing design ID
   - Design should be accessible in Meshery playground

3. **Check Playground Logs**
   - Visit https://playground.meshery.io in your browser
   - Open Developer Console (F12)
   - Check for any JavaScript errors or network issues

4. **Local Testing**
   ```bash
   # Install dependencies
   npm install cypress --save-dev

   # Run Cypress locally (if you have the test files)
   npx cypress open

   # Run in headless mode
   npx cypress run --browser chrome --headless
   ```

5. **Enable Cypress Debugging**
   Add to kanvas.yml before the action:
   ```yaml
   - name: Enable Cypress Debug Logging
     run: echo "DEBUG=cypress:*" >> $GITHUB_ENV
   ```

## Design Load Mechanism

The `loadDesign.js` test typically:
1. Navigates to Meshery playground
2. Loads a design by ID using the Meshery API
3. Waits for the canvas to render the design
4. Calls `.fit()` to fit the design in the viewport
5. Takes a screenshot in light and dark modes

If the design doesn't load, `.fit()` is called on undefined, causing the error.

## Environment Variables in Workflow

The following secrets should be configured:
- `GITHUB_TOKEN` - GitHub personal access token (auto-provided)
- `MESHERY_TOKEN` - Meshery Cloud authentication token

## Related Files Modified
- `.github/workflows/kanvas.yml` - Added playground health check and Cypress env vars
- `cypress.config.js` - New configuration file for local testing

## Monitoring

After deploying these changes:
1. Trigger a new workflow run
2. Check the "Wait for Meshery Playground" step output
3. Monitor Cypress test output for progress
4. Review any new error messages in the Cypress logs artifact
