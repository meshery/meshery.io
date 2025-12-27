#!/bin/bash
# Troubleshooting script for Meshery Cypress tests

echo "=== Meshery Cypress Test Troubleshooting ==="
echo ""

# Check if Node.js is installed
echo "1. Checking Node.js installation..."
if command -v node &> /dev/null; then
    echo "   ✓ Node.js $(node --version) is installed"
else
    echo "   ✗ Node.js is not installed"
    exit 1
fi

# Check if npm is installed
echo ""
echo "2. Checking npm installation..."
if command -v npm &> /dev/null; then
    echo "   ✓ npm $(npm --version) is installed"
else
    echo "   ✗ npm is not installed"
    exit 1
fi

# Check if Cypress is installed
echo ""
echo "3. Checking Cypress installation..."
if [ -d "node_modules/cypress" ]; then
    echo "   ✓ Cypress is installed locally"
else
    echo "   ✗ Cypress not found, installing..."
    npm install cypress --save-dev
fi

# Check Meshery Playground connectivity
echo ""
echo "4. Checking Meshery Playground connectivity..."
if curl -s -o /dev/null -w "%{http_code}" https://playground.meshery.io | grep -q "200\|301\|302"; then
    echo "   ✓ Meshery Playground (https://playground.meshery.io) is accessible"
else
    echo "   ✗ Meshery Playground is not responding"
    echo "   Please check your internet connection and try again"
fi

# Check for required environment variables
echo ""
echo "5. Checking environment variables..."
if [ -z "$MESHERY_TOKEN" ]; then
    echo "   ✗ MESHERY_TOKEN is not set"
    echo "   Please set: export MESHERY_TOKEN='your-meshery-token'"
else
    echo "   ✓ MESHERY_TOKEN is set"
fi

# Display next steps
echo ""
echo "=== Next Steps ==="
echo "1. Set MESHERY_TOKEN: export MESHERY_TOKEN='your-token'"
echo "2. Run Cypress tests: npx cypress open"
echo "3. Or run in headless mode: npx cypress run --browser chrome --headless"
echo ""
echo "For more information, see CYPRESS_FIX_GUIDE.md"
