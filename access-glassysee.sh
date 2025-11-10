#!/bin/bash

# GlassySee Repository Access Script
# This script helps you access your GitHub repository

echo "=== GlassySee Repository Access ==="
echo ""

# Function to test repository access
test_repo_access() {
    local url="$1"
    echo "Testing access to: $url"
    if git ls-remote "$url" >/dev/null 2>&1; then
        echo "✅ Repository is accessible!"
        return 0
    else
        echo "❌ Repository access failed"
        return 1
    fi
}

# Check if repository exists and is public
echo "1. Checking if repository is public..."
if test_repo_access "https://github.com/abdelkhalek-lamrhari/glassysee.git"; then
    echo ""
    echo "🎉 Repository is public! Cloning now..."
    git clone https://github.com/abdelkhalek-lamrhari/glassysee.git glassysee-repo
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Repository cloned successfully!"
        echo "📁 Contents:"
        ls -la glassysee-repo/
        exit 0
    fi
fi

echo ""
echo "📝 Repository requires authentication or doesn't exist"
echo ""
echo "🔧 Solutions:"
echo ""

# Option 1: Personal Access Token
echo "Option 1: Use Personal Access Token (Recommended)"
echo "  1. Go to: https://github.com/settings/tokens"
echo "  2. Click 'Generate new token (classic)'"
echo "  3. Give it a name (e.g., 'GlassySee Access')"
echo "  4. Select scopes: 'repo' (for private repos)"
echo "  5. Generate and copy the token"
echo "  6. Run: export GITHUB_TOKEN='your_token_here'"
echo "  7. Run: git clone https://\$GITHUB_TOKEN@github.com/abdelkhalek-lamrhari/glassysee.git"
echo ""

# Option 2: Check repository details
echo "Option 2: Verify Repository Details"
echo "  1. Check if the repository name is correct"
echo "  2. Verify your GitHub username"
echo "  3. Confirm if the repository is public or private"
echo ""

# Option 3: Manual input
echo "Option 3: Provide Repository Details"
echo "  If the URL is different, please provide:"
echo "  - Correct GitHub username"
echo "  - Correct repository name"
echo ""

# Check if token is already set
if [ -n "$GITHUB_TOKEN" ]; then
    echo ""
    echo "🔑 GitHub token found! Testing access..."
    if test_repo_access "https://$GITHUB_TOKEN@github.com/abdelkhalek-lamrhari/glassysee.git"; then
        echo "Cloning with token..."
        git clone https://$GITHUB_TOKEN@github.com/abdelkhalek-lamrhari/glassysee.git glassysee-repo
        if [ $? -eq 0 ]; then
            echo "✅ Repository cloned successfully with token!"
            ls -la glassysee-repo/
        fi
    else
        echo "❌ Token access failed. Please check token permissions."
    fi
fi

echo ""
echo "📋 SSH Key Information (for manual setup):"
echo "Your SSH public key is ready to add to GitHub:"
echo "-------------------------------------------"
cat ~/.ssh/id_rsa.pub 2>/dev/null || echo "No SSH key found"
echo "-------------------------------------------"