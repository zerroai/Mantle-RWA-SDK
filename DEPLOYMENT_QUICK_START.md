# Deployment Quick Start

## What You Need - At a Glance

### Accounts & Services
1. **Wallet** with Mantle Sepolia ETH (get from https://faucet.sepolia.mantle.xyz)
2. **WalletConnect Project ID** (get from https://cloud.walletconnect.com)
3. **Deployment Platform** account (Vercel recommended - free tier available)

### Software
- Node.js 18+
- Foundry (`forge --version`)
- Git

---

## 5-Step Deployment Process

### Step 1: Deploy Contracts (5 minutes)

```bash
cd packages/contracts
cp .env.example .env
# Edit .env: Add PRIVATE_KEY and MANTLE_SEPOLIA_RPC_URL

forge build
forge script script/DeployMantleSepolia.s.sol:DeployMantleSepolia \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast -vvvv
```

**Save the 4 contract addresses from output!**

### Step 2: Build SDK (1 minute)

```bash
cd ../..
npm run build:sdk
```

### Step 3: Configure Dashboard (2 minutes)

```bash
cd apps/dashboard
cp .env.example .env.local

# Edit .env.local with:
# - Your contract addresses (from Step 1)
# - WalletConnect Project ID
# - RPC URL and Chain ID
```

Or use helper script:
```bash
./scripts/update-env-after-deployment.sh \
  0x<identity> 0x<compliance> 0x<factory> 0x<impl>
```

### Step 4: Test Locally (2 minutes)

```bash
npm install
npm run dev
```

Visit http://localhost:3000 and verify:
- Wallet connects
- Contract data loads
- Features work

### Step 5: Deploy Dashboard (5 minutes)

**Vercel (Easiest):**
```bash
npm i -g vercel
cd apps/dashboard
vercel
# Follow prompts, then add environment variables in Vercel dashboard
```

**Or Docker:**
```bash
docker build -t mantle-rwa-dashboard .
docker run -p 3000:3000 --env-file .env.local mantle-rwa-dashboard
```

---

## Required Environment Variables

### For Contracts (packages/contracts/.env)
```env
PRIVATE_KEY=your_private_key_without_0x
MANTLE_SEPOLIA_RPC_URL=https://rpc.sepolia.mantle.xyz
```

### For Dashboard (apps/dashboard/.env.local)
```env
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.mantle.xyz
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CHAIN_ID=5003
NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_ASSET_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS=0x...
```

---

## Complete Checklist

### Before You Start
- [ ] Foundry installed (`forge --version`)
- [ ] Node.js 18+ installed
- [ ] Wallet with testnet ETH
- [ ] WalletConnect Project ID
- [ ] Vercel account (or other hosting)

### Contracts
- [ ] `.env` file created in `packages/contracts`
- [ ] Contracts built (`forge build`)
- [ ] Contracts deployed
- [ ] Contract addresses saved

### SDK
- [ ] SDK built (`npm run build:sdk`)

### Dashboard
- [ ] `.env.local` created with all variables
- [ ] Dashboard builds locally (`npm run build`)
- [ ] Local testing passed

### Deployment
- [ ] Dashboard deployed
- [ ] Environment variables set in hosting platform
- [ ] WalletConnect domain whitelisted
- [ ] All features tested on deployed site

---

## Quick Commands Reference

```bash
# Deploy everything (after setup)
cd packages/contracts && forge script script/DeployMantleSepolia.s.sol:DeployMantleSepolia --rpc-url $MANTLE_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast -vvvv

cd ../../ && npm run build:sdk

cd apps/dashboard && npm install && npm run build && vercel
```

---

## Cost Estimate

**Testnet (Mantle Sepolia):**
- Contracts: Free
- Dashboard: Free (Vercel free tier)
- Total: $0

**Mainnet:**
- Contracts: ~$50-200 (one-time)
- Dashboard: $0-20/month
- Total: ~$50-220 first month, then $0-20/month

---

## Need Help?

- Full guide: `COMPLETE_DEPLOYMENT_CHECKLIST.md`
- Contract deployment: `DEPLOY_TO_MANTLE_SEPOLIA.md`
- Dashboard deployment: `DEPLOYMENT.md`
- Troubleshooting: See troubleshooting sections in guides

---

*Estimated total time: 15-20 minutes*
