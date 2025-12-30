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

## Debugging Failed Tests

The most recent test run shows the exact error still occurring. Here's how to debug it:

### Step 1: Check the Artifacts
- Download `cypress-video.zip` and `cypress-screenshots.zip` from the workflow artifacts
- View the screenshots to see what state the page was in when it failed
- Check the video to see exactly what happened during the test

### Step 2: Analyze the Error Message
The error `TypeError: Cannot read properties of undefined (reading 'fit')` means:
- The design canvas object is `undefined`
- This happens when the Kanvas design renderer hasn't loaded yet
- Or the Meshery API didn't return the design data

### Step 3: Verify Secrets
Ensure these secrets are configured in your GitHub repository:
1. `GITHUB_TOKEN` - Should be auto-provided by GitHub
2. `MESHERY_TOKEN` - Must be a valid Meshery Cloud token from https://cloud.meshery.io

Check your repository settings:
- Go to Settings → Secrets and variables → Actions
- Verify both tokens are present and not expired

### Step 4: Check Design ID Validity
The `inputs.contentID` must be:
- A valid UUID format
- An existing design ID in Meshery
- Accessible to the Meshery account associated with `MESHERY_TOKEN`

Test the design ID manually by:
1. Login to https://playground.meshery.io
2. Navigate to the Designs section
3. Search for or open the design by ID
4. Verify it loads properly

### Step 5: Local Test Reproduction
If the design loads manually but not in tests:

```bash
# Set environment variables
export MESHERY_TOKEN="your-token"
export CYPRESS_baseUrl="https://playground.meshery.io"
export CYPRESS_chromeWebSecurity=false

# Install and run Cypress
npm install cypress --save-dev
npx cypress run --browser chrome --spec "cypress/e2e/**/*.js" --headless
```

## Enhanced Workflow Features (Latest Update)
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

## Related Files Modified
- `.github/workflows/kanvas.yml` - Added playground health check, extended timeouts, error handling
- `cypress.config.js` - New configuration file for local testing
- `CYPRESS_FIX_GUIDE.md` - This comprehensive troubleshooting guide

## Latest Changes (December 24, 2025)

### Workflow Enhancements
1. **Token Verification Step** - Warns if MESHERY_TOKEN is not configured
2. **Configuration Display** - Shows test setup before running
3. **Continue on Error** - Allows workflow to generate artifacts even on test failure
4. **Extended Timeouts** - Increased to 20-45 seconds for slow-loading designs
5. **Test Result Reporting** - Indicates whether tests passed or if debugging is needed

### Environment Variables Added
```yaml
CYPRESS_viewportWidth: 1920
CYPRESS_viewportHeight: 1080
CYPRESS_defaultCommandTimeout: 20000
CYPRESS_requestTimeout: 30000
CYPRESS_responseTimeout: 45000
```

These ensure the browser viewport matches the test expectations and gives plenty of time for design canvas to render.

## Monitoring
1. Trigger a new workflow run
2. Check the "Wait for Meshery Playground" step output
3. Monitor Cypress test output for progress
4. Review any new error messages in the Cypress logs artifact
