#!/bin/bash

echo "=== SSH Key Setup Complete ==="
echo ""
echo "✅ ED25519 SSH key generated for: lamrhariabdo20@gmail.com"
echo ""
echo "📋 Your SSH public key:"
echo "-------------------------------------------"
cat ~/.ssh/id_ed25519.pub
echo "-------------------------------------------"
echo ""
echo "📝 Next steps:"
echo "1. Copy the SSH public key above"
echo "2. Go to: https://github.com/settings/keys"
echo "3. Click 'New SSH key'"
echo "4. Paste the key and save"
echo "5. Run this script again to test and clone"
echo ""

# Check if we can test the connection
if command -v ssh >/dev/null 2>&1; then
    echo "🔍 Testing SSH connection to GitHub..."
    ssh -T git@github.com
else
    echo "⚠️  SSH client not available, but keys are ready"
    echo ""
    echo "🔄 To clone your repository after adding the key:"
    echo "   git clone git@github.com:abdelkhalek-lamrhari/glassysee.git"
    echo ""
    echo "📋 Alternative (if SSH doesn't work):"
    echo "   Use Personal Access Token with HTTPS"
fi

echo ""
echo "📁 SSH files created:"
ls -la ~/.ssh/