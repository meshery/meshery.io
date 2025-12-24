# Cypress Test Failure Troubleshooting Checklist

## Quick Diagnostics

### ✅ Pre-Test Checks
- [ ] Is `MESHERY_TOKEN` secret configured in GitHub settings?
- [ ] Is the `MESHERY_TOKEN` valid and not expired?
- [ ] Is the design ID (`inputs.contentID`) a valid UUID?
- [ ] Does the design exist in Meshery Playground?
- [ ] Can you manually load the design at `https://playground.meshery.io`?

### ✅ Workflow Configuration
- [ ] Is the workflow file syntax correct (yaml)?
- [ ] Are all input parameters being passed correctly?
- [ ] Is `PR_NUMBER` being set properly?
- [ ] Are environment variables being passed to the action?

### ✅ Meshery Playground
- [ ] Can you access `https://playground.meshery.io` from your browser?
- [ ] Does the playground respond to the health check?
- [ ] Is the Meshery API accepting requests?
- [ ] Is the design accessible with your Meshery account?

## When Tests Fail

### Step 1: Check Artifacts
```bash
# Download from GitHub Actions:
# 1. cypress-screenshots.zip - See what the page looked like
# 2. cypress-video.zip - Watch the test execution
# 3. action/log.txt (if available) - Check for error messages
```

### Step 2: Read the Error
Look for specific error patterns:

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot read properties of undefined (reading 'fit')` | Design canvas didn't load | Check MESHERY_TOKEN, increase timeout |
| `dri3 extension not supported` | GPU rendering issue | GPU is disabled in config, non-critical |
| `Cache service responded with 400` | Concurrent cache access | Non-critical, NPM installed successfully |
| `Connection refused` | Playground not accessible | Check playground status |
| `401 Unauthorized` | Invalid or expired token | Regenerate MESHERY_TOKEN |

### Step 3: Enable Debug Mode
Add this to the workflow before the action step:
```yaml
- name: Enable Cypress Debug
  run: echo "DEBUG=cypress:*" >> $GITHUB_ENV
```

### Step 4: Increase Timeouts Further (if needed)
If designs load slowly:
```yaml
env:
  CYPRESS_defaultCommandTimeout: 30000  # 30 seconds
  CYPRESS_requestTimeout: 45000         # 45 seconds
  CYPRESS_responseTimeout: 60000        # 60 seconds
```

## Secret Setup Guide

### Getting MESHERY_TOKEN
1. Go to https://cloud.meshery.io
2. Sign in with your account
3. Navigate to Account Settings or API Tokens
4. Generate a new token (or copy existing one)
5. Add to GitHub:
   - Repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `MESHERY_TOKEN`
   - Value: Paste the token from Meshery Cloud

### Verifying Token in Workflow
```yaml
- name: Verify Secrets
  run: |
    if [ -z "${{ secrets.MESHERY_TOKEN }}" ]; then
      echo "❌ MESHERY_TOKEN not found"
      exit 1
    fi
    echo "✓ MESHERY_TOKEN is configured"
```

## Common Issues & Solutions

### Issue: Tests Pass Locally, Fail in CI

**Solution:**
- Local: GPU available, more memory
- CI: Headless Chrome, limited resources
- Use `cypress.config.js` with GPU disabled
- Add `--disable-dev-shm-usage` flag

### Issue: Design Not Found (404)

**Solution:**
- Verify design ID is correct
- Ensure design is public or accessible to token owner
- Check design hasn't been deleted
- Validate UUID format

### Issue: Timeout Errors

**Solution:**
- Increase timeout values (see "Step 4" above)
- Check if Meshery Playground is under heavy load
- Try running workflow at off-peak hours
- Add longer waits for slow network conditions

### Issue: MESHERY_TOKEN Rejected (401)

**Solution:**
- Regenerate token in Meshery Cloud
- Ensure token has correct permissions
- Check token hasn't expired
- Verify token is for correct environment (cloud.meshery.io)

## Performance Tuning

### For Slow Networks
```yaml
env:
  CYPRESS_chromeWebSecurity: false
  CYPRESS_defaultCommandTimeout: 30000    # Wait 30s for commands
  CYPRESS_pageLoadTimeout: 60000          # Wait 60s for page load
  CYPRESS_requestTimeout: 45000           # Wait 45s for API responses
  CYPRESS_responseTimeout: 60000          # Wait 60s for server responses
```

### For Large/Complex Designs
```yaml
env:
  CYPRESS_viewportWidth: 1920
  CYPRESS_viewportHeight: 1080
  CYPRESS_numTestsKeptInMemory: 0  # Reduce memory usage
```

## Debugging with Browser

### Test Design Rendering Locally
```javascript
// Open browser console at https://playground.meshery.io
// Run this to check if design canvas exists:
console.log(document.querySelector('[class*="canvas"]'));
console.log(document.querySelector('[class*="design"]'));
console.log(document.querySelector('[data-cy="design-canvas"]'));
```

### Check API Responses
```bash
# Test the Meshery API
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://playground.meshery.io/api/designs/{designId}"

# Check playground health
curl -I https://playground.meshery.io
```

## Reporting Issues

When seeking help, provide:
1. Full error message from workflow logs
2. Screenshot/video artifacts
3. Workflow configuration (sanitized, no secrets)
4. Design ID being tested
5. When the issue started happening

---

**Last Updated:** December 24, 2025  
**Relevant PR:** https://github.com/GaneshPatil7517/meshery.io/pull/new/refactor/split-concerns
