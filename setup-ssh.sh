#!/bin/bash

# SSH Key Generator and GitHub Setup Script
# This script helps you set up SSH access to GitHub

echo "=== SSH Key Generator and GitHub Setup ==="
echo ""

# Check if SSH directory exists
if [ ! -d "$HOME/.ssh" ]; then
    mkdir -p "$HOME/.ssh"
    chmod 700 "$HOME/.ssh"
    echo "✓ Created SSH directory"
fi

# Try to generate SSH key using different methods
echo "Attempting to generate SSH key..."

# Method 1: Try using python to generate keys
if command -v python3 >/dev/null 2>&1; then
    echo "Using Python to generate SSH key..."
    python3 -c "
import os
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.backends import default_backend

# Generate private key
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
    backend=default_backend()
)

# Save private key
with open(os.path.expanduser('~/.ssh/id_rsa'), 'wb') as f:
    f.write(private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    ))

# Generate public key
public_key = private_key.public_key()
with open(os.path.expanduser('~/.ssh/id_rsa.pub'), 'wb') as f:
    f.write(public_key.public_bytes(
        encoding=serialization.Encoding.OpenSSH,
        format=serialization.PublicFormat.OpenSSH
    ))

print('SSH key generated successfully!')
" 2>/dev/null && echo "✓ SSH key generated with Python" || echo "✗ Python method failed"
fi

# Method 2: Try using openssl if available
if [ ! -f "$HOME/.ssh/id_rsa" ] && command -v openssl >/dev/null 2>&1; then
    echo "Using OpenSSL to generate SSH key..."
    openssl genpkey -algorithm RSA -out "$HOME/.ssh/id_rsa" -pkeyopt rsa_keygen_bits:2048 2>/dev/null
    if [ -f "$HOME/.ssh/id_rsa" ]; then
        openssl rsa -pubout -in "$HOME/.ssh/id_rsa" -out "$HOME/.ssh/id_rsa.pub" 2>/dev/null
        chmod 600 "$HOME/.ssh/id_rsa"
        chmod 644 "$HOME/.ssh/id_rsa.pub"
        echo "✓ SSH key generated with OpenSSL"
    else
        echo "✗ OpenSSL method failed"
    fi
fi

# Check if key was generated
if [ -f "$HOME/.ssh/id_rsa" ] && [ -f "$HOME/.ssh/id_rsa.pub" ]; then
    echo ""
    echo "✅ SSH key generated successfully!"
    echo ""
    echo "📋 Your public key (add this to GitHub):"
    echo "-------------------------------------------"
    cat "$HOME/.ssh/id_rsa.pub"
    echo "-------------------------------------------"
    echo ""
    echo "📝 Next steps:"
    echo "1. Copy the public key above"
    echo "2. Go to GitHub → Settings → SSH and GPG keys"
    echo "3. Click 'New SSH key'"
    echo "4. Paste the key and save"
    echo "5. Run: git clone git@github.com:abdelkhalek-lamrhari/glassysee.git"
    echo ""
else
    echo ""
    echo "❌ Could not generate SSH key automatically"
    echo ""
    echo "🔄 Alternative solutions:"
    echo "1. Use Personal Access Token (recommended)"
    echo "2. Install SSH tools manually"
    echo "3. Use GitHub CLI if available"
    echo ""
fi