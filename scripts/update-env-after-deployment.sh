#!/bin/bash

# Script to update .env.local with deployed contract addresses
# Usage: ./scripts/update-env-after-deployment.sh <identity_registry> <compliance_registry> <asset_factory> <rwa_token_impl>

set -e

if [ "$#" -lt 4 ]; then
    echo "Usage: $0 <identity_registry> <compliance_registry> <asset_factory> <rwa_token_impl> [mantle_gold]"
    echo ""
    echo "Example:"
    echo "  $0 0x1234... 0x5678... 0x9abc... 0xdef0..."
    exit 1
fi

IDENTITY_REGISTRY=$1
COMPLIANCE_REGISTRY=$2
ASSET_FACTORY=$3
RWA_TOKEN_IMPL=$4
MANTLE_GOLD=${5:-""}

ENV_FILE="apps/dashboard/.env.local"

# Create .env.local from .env.example if it doesn't exist
if [ ! -f "$ENV_FILE" ]; then
    echo "Creating $ENV_FILE from .env.example..."
    cp apps/dashboard/.env.example "$ENV_FILE"
fi

# Update contract addresses
echo "Updating contract addresses in $ENV_FILE..."

# Use sed to update addresses (works on both macOS and Linux)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS=.*|NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS=$IDENTITY_REGISTRY|" "$ENV_FILE"
    sed -i '' "s|NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS=.*|NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS=$COMPLIANCE_REGISTRY|" "$ENV_FILE"
    sed -i '' "s|NEXT_PUBLIC_ASSET_FACTORY_ADDRESS=.*|NEXT_PUBLIC_ASSET_FACTORY_ADDRESS=$ASSET_FACTORY|" "$ENV_FILE"
    sed -i '' "s|NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS=.*|NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS=$RWA_TOKEN_IMPL|" "$ENV_FILE"
    sed -i '' "s|NEXT_PUBLIC_CHAIN_ID=.*|NEXT_PUBLIC_CHAIN_ID=5003|" "$ENV_FILE"
    sed -i '' "s|NEXT_PUBLIC_RPC_URL=.*|NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.mantle.xyz|" "$ENV_FILE"
    
    if [ -n "$MANTLE_GOLD" ]; then
        sed -i '' "s|NEXT_PUBLIC_MANTLE_GOLD_ADDRESS=.*|NEXT_PUBLIC_MANTLE_GOLD_ADDRESS=$MANTLE_GOLD|" "$ENV_FILE"
    fi
else
    # Linux
    sed -i "s|NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS=.*|NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS=$IDENTITY_REGISTRY|" "$ENV_FILE"
    sed -i "s|NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS=.*|NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS=$COMPLIANCE_REGISTRY|" "$ENV_FILE"
    sed -i "s|NEXT_PUBLIC_ASSET_FACTORY_ADDRESS=.*|NEXT_PUBLIC_ASSET_FACTORY_ADDRESS=$ASSET_FACTORY|" "$ENV_FILE"
    sed -i "s|NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS=.*|NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS=$RWA_TOKEN_IMPL|" "$ENV_FILE"
    sed -i "s|NEXT_PUBLIC_CHAIN_ID=.*|NEXT_PUBLIC_CHAIN_ID=5003|" "$ENV_FILE"
    sed -i "s|NEXT_PUBLIC_RPC_URL=.*|NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.mantle.xyz|" "$ENV_FILE"
    
    if [ -n "$MANTLE_GOLD" ]; then
        sed -i "s|NEXT_PUBLIC_MANTLE_GOLD_ADDRESS=.*|NEXT_PUBLIC_MANTLE_GOLD_ADDRESS=$MANTLE_GOLD|" "$ENV_FILE"
    fi
fi

echo "✅ Updated $ENV_FILE with deployed contract addresses:"
echo ""
echo "  IdentityRegistry: $IDENTITY_REGISTRY"
echo "  ComplianceRegistry: $COMPLIANCE_REGISTRY"
echo "  AssetFactory: $ASSET_FACTORY"
echo "  RWATokenImplementation: $RWA_TOKEN_IMPL"
if [ -n "$MANTLE_GOLD" ]; then
    echo "  MantleGold: $MANTLE_GOLD"
fi
echo ""
echo "Chain ID set to: 5003 (Mantle Sepolia)"
echo "RPC URL set to: https://rpc.sepolia.mantle.xyz"
