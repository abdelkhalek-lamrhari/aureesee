#!/bin/bash

echo "=== GlassySee Repository Access Solution ==="
echo ""

# Check what we have available
echo "📋 Current Status:"
echo "  ✅ SSH Keys Generated: $(ls ~/.ssh/*.pub 2>/dev/null | wc -l) keys"
echo "  ✅ Git Available: $(git --version)"
echo "  ✅ Curl Available: $(curl --version | head -1)"
echo ""

# Show SSH keys
echo "🔑 Your SSH Public Keys:"
for key in ~/.ssh/*.pub; do
    if [ -f "$key" ]; then
        echo "   $(basename $key): $(cat $key)"
    fi
done
echo ""

# Repository access options
echo "🚀 Repository Access Options:"
echo ""

echo "Option 1: Personal Access Token (RECOMMENDED)"
echo "  1. Go to: https://github.com/settings/tokens"
echo "  2. Click 'Generate new token (classic)'"
echo "  3. Name: 'GlassySee Access'"
echo "  4. Scopes: 'repo' (for private repos)"
echo "  5. Generate and copy token"
echo "  6. Run: export GITHUB_TOKEN='your_token'"
echo "  7. Run: git clone https://\$GITHUB_TOKEN@github.com/abdelkhalek-lamrhari/glassysee.git"
echo ""

echo "Option 2: SSH Key Setup"
echo "  1. Copy your ED25519 public key (shown above)"
echo "  2. Go to: https://github.com/settings/keys"
echo "  3. Click 'New SSH key'"
echo "  4. Paste the key and save"
echo "  5. Run: git clone git@github.com:abdelkhalek-lamrhari/glassysee.git"
echo ""

echo "Option 3: Repository Verification"
echo "  Please verify:"
echo "  - Repository URL: https://github.com/abdelkhalek-lamrhari/glassysee"
echo "  - Repository name: glassysee"
echo "  - Username: abdelkhalek-lamrhari"
echo ""

# Test repository existence
echo "🔍 Testing repository access..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://github.com/abdelkhalek-lamrhari/glassysee")

case $HTTP_STATUS in
    200)
        echo "✅ Repository exists and is public!"
        echo "   Try: git clone https://github.com/abdelkhalek-lamrhari/glassysee.git"
        ;;
    404)
        echo "❌ Repository not found (404)"
        echo "   Please verify the repository URL"
        ;;
    403)
        echo "🔒 Repository is private (403)"
        echo "   Use Personal Access Token or SSH key"
        ;;
    *)
        echo "❓ Unknown status: $HTTP_STATUS"
        ;;
esac

echo ""
echo "🎯 Quick Actions:"
echo "1. Set token: export GITHUB_TOKEN='your_token'"
echo "2. Clone: git clone https://\$GITHUB_TOKEN@github.com/abdelkhalek-lamrhari/glassysee.git"
echo "3. Or tell me what GlassySee does and I'll build it from scratch!"