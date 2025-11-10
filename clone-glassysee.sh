#!/bin/bash

# GlassySee Repository Clone Script
# Replace YOUR_TOKEN with your actual GitHub Personal Access Token

echo "=== GlassySee Repository Clone ==="
echo ""

# Configuration
GITHUB_USERNAME="abdelkhalek-lamrhari"
REPO_NAME="glassysee"
# IMPORTANT: Replace YOUR_TOKEN with your actual Personal Access Token
TOKEN="YOUR_TOKEN"

echo "Please follow these steps:"
echo ""
echo "1. Create a Personal Access Token on GitHub:"
echo "   - Go to https://github.com/settings/tokens"
echo "   - Click 'Generate new token (classic)'"
echo "   - Give it a name (e.g., 'GlassySee Dev')"
echo "   - Select 'repo' scope"
echo "   - Generate and copy the token"
echo ""
echo "2. Update the TOKEN variable in this script with your actual token"
echo ""
echo "3. Run this script again to clone your repository"
echo ""

# Check if token is set
if [ "$TOKEN" = "YOUR_TOKEN" ]; then
    echo "⚠️  Please update the TOKEN variable with your actual GitHub token"
    exit 1
fi

# Clone the repository
REPO_URL="https://${TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo "Cloning repository from: ${GITHUB_USERNAME}/${REPO_NAME}"
echo ""

if git clone "$REPO_URL" glassysee-repo; then
    echo "✅ Repository cloned successfully!"
    echo "📁 Contents:"
    ls -la glassysee-repo/
    echo ""
    echo "🔄 You can now explore the code and I'll help you recreate it!"
else
    echo "❌ Failed to clone repository"
    echo "Please check:"
    echo "   - Your token has correct permissions"
    echo "   - Repository URL is correct"
    echo "   - Repository exists and is accessible"
fi