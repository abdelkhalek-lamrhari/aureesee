#!/bin/bash

# GitHub Repository Access Setup Script

echo "=== GitHub Repository Access Setup ==="
echo ""

# Check if we can access the repository
echo "1. Checking repository access..."
REPO_URL="https://github.com/abdelkhalek-lamrhari/glassysee.git"

if git ls-remote "$REPO_URL" >/dev/null 2>&1; then
    echo "✓ Repository is accessible!"
else
    echo "✗ Repository requires authentication or doesn't exist"
    echo ""
    echo "To access a private repository, you have several options:"
    echo ""
    echo "Option 1: Use Personal Access Token"
    echo "  1. Go to GitHub → Settings → Developer settings → Personal access tokens"
    echo "  2. Generate a new token with 'repo' permissions"
    echo "  3. Use: git clone https://TOKEN@github.com/username/repo.git"
    echo ""
    echo "Option 2: Use SSH (requires SSH key setup)"
    echo "  1. Create SSH key: ssh-keygen -t ed25519 -C 'your-email@example.com'"
    echo "  2. Add public key to GitHub"
    echo "  3. Use: git clone git@github.com:username/repo.git"
    echo ""
    echo "Option 3: Use GitHub CLI"
    echo "  1. Install: gh auth login"
    echo "  2. Clone: gh repo clone username/repo"
    echo ""
fi

echo ""
echo "Current working directory: $(pwd)"
echo "Project directory contents:"
ls -la