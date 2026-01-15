# Complete Deployment Checklist

This guide covers everything you need to deploy the entire Mantle RWA SDK stack: contracts, SDK, and dashboard.

---

## Prerequisites

### Required Accounts & Services

1. **Wallet with Funds**
   - Deployer wallet with Mantle Sepolia ETH (for testnet) or Mantle ETH (for mainnet)
   - Get testnet ETH: https://faucet.sepolia.mantle.xyz

2. **WalletConnect Project ID**
   - Sign up at: https://cloud.walletconnect.com
   - Create a project and get your Project ID
   - Add your domain to allowed domains

3. **RPC Endpoint**
   - Mantle Sepolia: `https://rpc.sepolia.mantle.xyz`
   - Mantle Mainnet: `https://rpc.mantle.xyz`
   - Or use Alchemy/Infura endpoints

4. **Deployment Platform** (for dashboard)
   - Vercel (recommended)
   - Or Docker/other hosting

### Required Software

- Node.js 18+ installed
- npm/yarn/pnpm installed
- Foundry installed (`forge --version` should work)
- Git installed

---

## Step 1: Deploy Smart Contracts

### 1.1 Setup Contracts Environment

```bash
cd packages/contracts

# Create .env file
cp .env.example .env

# Edit .env and add:
# PRIVATE_KEY=your_private_key_without_0x
# MANTLE_SEPOLIA_RPC_URL=https://rpc.sepolia.mantle.xyz
# MANTLE_API_KEY=your_api_key (optional, for verification)
```

### 1.2 Get Testnet ETH

Visit https://faucet.sepolia.mantle.xyz and request testnet ETH for your deployer address.

### 1.3 Build Contracts

```bash
cd packages/contracts
forge build
```

### 1.4 Deploy Contracts

```bash
# Load environment variables
source .env

# Deploy to Mantle Sepolia
forge script script/DeployMantleSepolia.s.sol:DeployMantleSepolia \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  -vvvv
```

### 1.5 Save Contract Addresses

After deployment, you'll see output like:
```
IdentityRegistry: 0x...
ComplianceRegistry: 0x...
RWATokenImplementation: 0x...
AssetFactory: 0x...
```

**Save these addresses!** You'll need them for the dashboard.

### 1.6 Setup Initial Compliance Rule (Optional)

```bash
# Deploy compliance rule setup script
forge script script/SetupComplianceRule.s.sol:SetupComplianceRule \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  -vvvv
```

### 1.7 Deploy Mantle Gold Token (Optional)

```bash
# Update script with your contract addresses first
# Then deploy:
forge script script/DeployMantleGold.s.sol:DeployMantleGold \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  -vvvv
```

**Save the Mantle Gold address if deployed.**

---

## Step 2: Build and Publish SDK

### 2.1 Build SDK

```bash
cd packages/sdk
npm install
npm run build
```

This creates the `dist/` folder with compiled SDK.

### 2.2 Test SDK Build

```bash
# Verify build output
ls -la dist/
# Should see: index.js, index.mjs, index.d.ts, index.d.mts
```

### 2.3 Publish SDK (Optional - if publishing to npm)

```bash
# Login to npm
npm login

# Publish (if ready for public release)
npm publish

# Or publish as private package
npm publish --access restricted
```

**Note**: For local development, the dashboard uses the local SDK package, so publishing is optional.

---

## Step 3: Configure Dashboard

### 3.1 Update Environment Variables

```bash
cd apps/dashboard

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values:
```

**Required Variables:**
```env
# RPC Configuration
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.mantle.xyz

# WalletConnect (REQUIRED)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=5003

# Contract Addresses (from Step 1.5)
NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS=0x2B091b4E4D65123200723eC129f93b42b3e1cba9
NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS=0xC638309139e4985e6483730aAd417edd87402aeE
NEXT_PUBLIC_ASSET_FACTORY_ADDRESS=0xA2ad6661C9d9010C6b9Ec8C01047b70C824142C1
NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS=0x645A3b6D2de7E3f09fcF97988b17eDE049D925c2

# Optional: Mantle Gold address (if deployed)
NEXT_PUBLIC_MANTLE_GOLD_ADDRESS=0x...
```

### 3.2 Use Helper Script (Alternative)

```bash
# From project root
./scripts/update-env-after-deployment.sh \
  0x<identity_registry> \
  0x<compliance_registry> \
  0x<asset_factory> \
  0x<rwa_token_impl> \
  0x<mantle_gold>  # optional
```

### 3.3 Build SDK for Dashboard

```bash
# From project root
npm run build:sdk
```

This ensures the dashboard can use the local SDK package.

---

## Step 4: Deploy Dashboard

### Option A: Vercel (Recommended)

#### 4.1 Install Vercel CLI

```bash
npm i -g vercel
```

#### 4.2 Deploy

```bash
cd apps/dashboard
vercel
```

Follow the prompts:
- Link to existing project or create new
- Set root directory: `apps/dashboard`
- Override build command: `npm run build` (or leave default)
- Override output directory: `.next` (or leave default)

#### 4.3 Set Environment Variables in Vercel

1. Go to your project on Vercel dashboard
2. Settings → Environment Variables
3. Add all variables from `.env.local`:
   - `NEXT_PUBLIC_RPC_URL`
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_CHAIN_ID`
   - `NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS`
   - `NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS`
   - `NEXT_PUBLIC_ASSET_FACTORY_ADDRESS`
   - `NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS`
   - `NEXT_PUBLIC_MANTLE_GOLD_ADDRESS` (if applicable)

4. Redeploy after adding variables

#### 4.4 Update WalletConnect Domain

1. Go to https://cloud.walletconnect.com
2. Edit your project
3. Add your Vercel domain to allowed domains
4. Save

### Option B: Docker

#### 4.1 Create Dockerfile

Create `apps/dashboard/Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
COPY ../../packages/sdk ./packages/sdk
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### 4.2 Update next.config.ts

```typescript
const nextConfig = {
  transpilePackages: ['@mantle-rwa/sdk'],
  output: 'standalone', // For Docker
};
```

#### 4.3 Build and Run

```bash
cd apps/dashboard
docker build -t mantle-rwa-dashboard .
docker run -p 3000:3000 --env-file .env.local mantle-rwa-dashboard
```

### Option C: Other Platforms

#### Netlify
1. Connect repository
2. Build command: `cd apps/dashboard && npm run build`
3. Publish directory: `apps/dashboard/.next`
4. Add environment variables

#### Railway
1. Connect repository
2. Root directory: `apps/dashboard`
3. Add environment variables
4. Deploy

---

## Step 5: Post-Deployment Verification

### 5.1 Test Dashboard

1. Visit your deployed dashboard URL
2. Connect wallet
3. Verify you're on the correct network (Mantle Sepolia)
4. Check that contract addresses are correct

### 5.2 Test Features

**Identity Management:**
- [ ] View your identity status
- [ ] Register identity (if registrar)
- [ ] Verify identity appears correctly

**Compliance:**
- [ ] View compliance rules
- [ ] Create a new rule (if admin)
- [ ] Verify rule is saved

**Assets:**
- [ ] View assets list
- [ ] Deploy a new asset
- [ ] View asset details
- [ ] Mint tokens (if minter)
- [ ] Test pause/unpause (if pauser)

**Documentation:**
- [ ] Access `/docs` page
- [ ] Verify all sections load
- [ ] Test code copy functionality

### 5.3 Verify on Explorer

1. Visit https://explorer.sepolia.mantle.xyz
2. Search for your contract addresses
3. Verify contracts are verified (if you used `--verify`)
4. Check recent transactions

### 5.4 Test Mobile

1. Open dashboard on mobile device
2. Test WalletConnect connection
3. Verify responsive design works
4. Test all key features

---

## Complete Checklist

### Pre-Deployment
- [ ] Foundry installed and working
- [ ] Node.js 18+ installed
- [ ] Wallet with testnet/mainnet ETH
- [ ] WalletConnect Project ID obtained
- [ ] RPC endpoint accessible
- [ ] Deployment platform account set up

### Contracts
- [ ] Contracts environment configured (`.env`)
- [ ] Contracts built successfully
- [ ] Contracts deployed to target network
- [ ] Contract addresses saved
- [ ] Initial compliance rule created (optional)
- [ ] Mantle Gold deployed (optional)
- [ ] Contracts verified on explorer (optional)

### SDK
- [ ] SDK dependencies installed
- [ ] SDK built successfully
- [ ] Build output verified
- [ ] SDK published (if applicable)

### Dashboard
- [ ] Environment variables configured
- [ ] Contract addresses updated
- [ ] WalletConnect Project ID set
- [ ] SDK built and linked
- [ ] Dashboard builds successfully
- [ ] Local testing passed

### Deployment
- [ ] Dashboard deployed to hosting platform
- [ ] Environment variables set in hosting platform
- [ ] WalletConnect domain whitelisted
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

### Post-Deployment
- [ ] Dashboard accessible
- [ ] Wallet connection works
- [ ] All features functional
- [ ] Mobile testing passed
- [ ] Documentation accessible
- [ ] Explorer verification complete

---

## Quick Deployment Commands

### One-Command Setup (After Prerequisites)

```bash
# 1. Deploy contracts
cd packages/contracts && \
source .env && \
forge script script/DeployMantleSepolia.s.sol:DeployMantleSepolia \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast -vvvv

# 2. Build SDK
cd ../../ && npm run build:sdk

# 3. Update dashboard env
./scripts/update-env-after-deployment.sh \
  0x<identity> 0x<compliance> 0x<factory> 0x<impl>

# 4. Deploy dashboard
cd apps/dashboard && vercel
```

---

## Troubleshooting

### Contracts Won't Deploy
- **Check**: Sufficient ETH balance
- **Check**: Correct RPC URL
- **Check**: Private key format (no 0x prefix)
- **Check**: Network matches (Sepolia vs Mainnet)

### Dashboard Build Fails
- **Check**: SDK is built first (`npm run build:sdk`)
- **Check**: All environment variables are set
- **Check**: Node.js version (18+)
- **Check**: Dependencies installed (`npm install`)

### WalletConnect Not Working
- **Check**: Project ID is correct
- **Check**: Domain is whitelisted in WalletConnect dashboard
- **Check**: Environment variable is prefixed with `NEXT_PUBLIC_`
- **Check**: Redeploy after adding environment variables

### Contract Calls Failing
- **Check**: Contract addresses are correct
- **Check**: Chain ID matches deployed network
- **Check**: RPC endpoint is accessible
- **Check**: Wallet is connected to correct network

### Features Not Working
- **Check**: Browser console for errors
- **Check**: Contract addresses match deployed contracts
- **Check**: You have required roles (REGISTRAR, COMPLIANCE_ADMIN, etc.)
- **Check**: Network connection is stable

---

## Cost Estimates

### Mantle Sepolia (Testnet)
- Contract deployment: Free (testnet)
- Dashboard hosting: Free tier available (Vercel, Netlify)
- RPC: Free public endpoints

### Mantle Mainnet (Production)
- Contract deployment: ~$50-200 (depending on gas prices)
- Dashboard hosting: $0-20/month (Vercel free tier or paid)
- RPC: Free public or $50-200/month (Alchemy/Infura)

---

## Security Reminders

1. **Never commit private keys** - Use environment variables
2. **Verify contract addresses** - Double-check before deploying dashboard
3. **Use HTTPS** - Always in production
4. **Review access control** - Ensure roles are set correctly
5. **Test thoroughly** - Test all features before mainnet deployment
6. **Monitor transactions** - Set up alerts for important contracts

---

## Next Steps After Deployment

1. **Set up monitoring** - Track contract events and transactions
2. **Create initial identities** - Register test users
3. **Configure compliance rules** - Set up your compliance policies
4. **Deploy initial assets** - Create your first RWA tokens
5. **Onboard users** - Start using the system
6. **Gather feedback** - Iterate based on usage

---

## Support Resources

- **Documentation**: `/docs` in dashboard
- **Deployment Guide**: `DEPLOYMENT.md`
- **Mantle Sepolia Guide**: `DEPLOY_TO_MANTLE_SEPOLIA.md`
- **Presentation Guide**: `PRESENTATION_GUIDE.md`
- **Pitch Document**: `PITCH.md`

---

*Last Updated: January 2024*
