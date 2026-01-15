# Deploy Contracts to Mantle Sepolia

This guide walks you through deploying the RWA contracts to Mantle Sepolia testnet.

## Prerequisites

1. **Funded Account**: You need a wallet with Mantle Sepolia ETH
   - Get testnet ETH from: https://faucet.sepolia.mantle.xyz
   - Or use: https://portal.mantle.xyz/faucet

2. **Environment Setup**:
   ```bash
   cd packages/contracts
   cp .env.example .env
   ```

3. **Set Environment Variables** in `.env`:
   ```bash
   # Your private key (without 0x prefix)
   PRIVATE_KEY=your_private_key_here
   
   # Mantle Sepolia RPC URL
   MANTLE_SEPOLIA_RPC_URL=https://rpc.sepolia.mantle.xyz
   
   # Optional: For contract verification
   MANTLE_API_KEY=your_api_key_here
   ```

## Deployment Steps

### 1. Build Contracts

```bash
cd packages/contracts
forge build
```

### 2. Deploy Contracts

```bash
forge script script/DeployMantleSepolia.s.sol:DeployMantleSepolia \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify \
  -vvvv
```

Or if you have `.env` file loaded:

```bash
source .env
forge script script/DeployMantleSepolia.s.sol:DeployMantleSepolia \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify \
  -vvvv
```

### 3. Save Deployment Addresses

After deployment, the script will output all contract addresses. Save them:

```
IdentityRegistry: 0x...
ComplianceRegistry: 0x...
RWATokenImplementation: 0x...
AssetFactory: 0x...
```

### 4. Update Dashboard .env File

Update `apps/dashboard/.env.local` (or `.env`) with the deployed addresses:

```bash
cd ../../apps/dashboard
cp .env.example .env.local
```

Then edit `.env.local` and update:
- `NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS`
- `NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS`
- `NEXT_PUBLIC_ASSET_FACTORY_ADDRESS`
- `NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS`
- `NEXT_PUBLIC_RPC_URL` (should be `https://rpc.sepolia.mantle.xyz`)
- `NEXT_PUBLIC_CHAIN_ID` (should be `5003`)

## Verification

After deployment, verify contracts on Mantle Sepolia Explorer:
https://explorer.sepolia.mantle.xyz

## Troubleshooting

### Insufficient Funds
- Make sure your account has Mantle Sepolia ETH
- Get testnet ETH from the faucet

### Verification Failed
- Check that `MANTLE_API_KEY` is set correctly
- You can skip verification by removing `--verify` flag

### RPC Errors
- Try alternative RPC: `https://mantle-sepolia.g.alchemy.com/v2/YOUR_KEY`
- Or: `https://rpc.sepolia.mantle.xyz`

## Next Steps

After deployment:
1. Update dashboard `.env.local` with new addresses
2. Test contract interactions in the dashboard
3. Set up initial compliance rules
4. Register test identities
