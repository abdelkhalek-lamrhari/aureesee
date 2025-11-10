#!/bin/bash

echo "=== GlassySee Repository Clone with Personal Access Token ==="
echo ""

# Check if token is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <your_github_token>"
    echo ""
    echo "📝 How to get a token:"
    echo "1. Go to: https://github.com/settings/tokens"
    echo "2. Click 'Generate new token (classic)'"
    echo "3. Give it a name (e.g., 'GlassySee Access')"
    echo "4. Select scopes: 'repo' (for private repos)"
    echo "5. Generate and copy the token"
    echo "6. Run: $0 your_token_here"
    echo ""
    exit 1
fi

TOKEN="$1"
REPO_URL="https://$TOKEN@github.com/abdelkhalek-lamrhari/glassysee.git"

echo "🔍 Testing repository access..."
if git ls-remote "$REPO_URL" >/dev/null 2>&1; then
    echo "✅ Repository accessible!"
    echo ""
    echo "📥 Cloning GlassySee repository..."
    
    if git clone "$REPO_URL" glassysee-repo; then
        echo ""
        echo "🎉 Successfully cloned GlassySee repository!"
        echo ""
        echo "📁 Repository contents:"
        ls -la glassysee-repo/
        echo ""
        echo "🚀 Ready to explore and recreate functionality!"
    else
        echo "❌ Failed to clone repository"
    fi
else
    echo "❌ Cannot access repository"
    echo "Please check:"
    echo "  - Token has correct permissions"
    echo "  - Repository URL is correct"
    echo "  - Repository exists and is accessible"
fi