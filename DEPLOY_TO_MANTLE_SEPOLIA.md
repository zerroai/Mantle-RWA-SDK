# Quick Guide: Deploy to Mantle Sepolia

## Step 1: Prepare Environment

```bash
# 1. Set up contracts environment
cd packages/contracts
cp .env.example .env
# Edit .env and add your PRIVATE_KEY
```

## Step 2: Get Testnet ETH

Visit https://faucet.sepolia.mantle.xyz and get testnet ETH for your deployer address.

## Step 3: Deploy Contracts

```bash
cd packages/contracts

# Load environment variables
source .env

# Build contracts
forge build

# Deploy to Mantle Sepolia
forge script script/DeployMantleSepolia.s.sol:DeployMantleSepolia \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  -vvvv
```

## Step 4: Save Contract Addresses

After deployment, copy the addresses from the output:

```
IdentityRegistry: 0x...
ComplianceRegistry: 0x...
RWATokenImplementation: 0x...
AssetFactory: 0x...
```

## Step 5: Update Dashboard .env

### Option A: Use the helper script

```bash
# From project root
./scripts/update-env-after-deployment.sh \
  0x<identity_registry> \
  0x<compliance_registry> \
  0x<asset_factory> \
  0x<rwa_token_impl>
```

### Option B: Manual update

```bash
cd apps/dashboard
cp .env.example .env.local
# Edit .env.local and update:
# - NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS
# - NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS
# - NEXT_PUBLIC_ASSET_FACTORY_ADDRESS
# - NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS
# - NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.mantle.xyz
# - NEXT_PUBLIC_CHAIN_ID=5003
```

## Step 6: Test the Dashboard

```bash
cd apps/dashboard
npm install
npm run dev
```

Visit http://localhost:3000 and test:
- Wallet connection
- Viewing contract data
- Identity management (if you have registrar role)

## Verification

Check your deployed contracts on:
https://explorer.sepolia.mantle.xyz

## Troubleshooting

### "Insufficient funds"
- Get testnet ETH from the faucet

### "Contract verification failed"
- You can skip verification by removing `--verify` flag
- Or set `MANTLE_API_KEY` in `.env`

### "RPC errors"
- Try alternative RPC: `https://mantle-sepolia.g.alchemy.com/v2/YOUR_KEY`
- Or use: `https://rpc.sepolia.mantle.xyz`

## Next Steps

After successful deployment:
1. Set up initial compliance rules in the dashboard
2. Register test identities
3. Deploy a test asset
4. Test the full flow
