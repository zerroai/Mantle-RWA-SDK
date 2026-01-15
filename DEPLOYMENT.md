# Deployment Guide

This guide covers deploying the Mantle RWA SDK Dashboard to production.

## Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- WalletConnect Project ID ([Get one here](https://cloud.walletconnect.com))
- Deployed smart contracts with their addresses
- RPC endpoint URL for your target network

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cd apps/dashboard
cp .env.example .env.local
```

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint URL | `https://rpc.sepolia.mantle.xyz` |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Project ID | `abc123...` |
| `NEXT_PUBLIC_CHAIN_ID` | Chain ID (31337=local, 5003=Mantle Sepolia, 5000=Mantle Mainnet) | `5003` |
| `NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS` | IdentityRegistry contract address | `0x...` |
| `NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS` | ComplianceRegistry contract address | `0x...` |
| `NEXT_PUBLIC_ASSET_FACTORY_ADDRESS` | AssetFactory contract address | `0x...` |
| `NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS` | RWAToken implementation address | `0x...` |
| `NEXT_PUBLIC_MANTLE_GOLD_ADDRESS` | MantleGold token address (optional) | `0x...` |

## Building the SDK

Before building the dashboard, build the SDK package:

```bash
# From project root
cd packages/sdk
npm run build
```

## Building the Dashboard

```bash
cd apps/dashboard
npm install
npm run build
```

The production build will be in `.next/` directory.

## Deployment Options

### Vercel (Recommended)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd apps/dashboard
   vercel
   ```

3. **Set Environment Variables**:
   - Go to your project settings on Vercel
   - Add all environment variables from `.env.example`
   - Redeploy

### Docker

Create a `Dockerfile` in `apps/dashboard/`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
RUN npm install --production

EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t mantle-rwa-dashboard .
docker run -p 3000:3000 --env-file .env.local mantle-rwa-dashboard
```

### Other Platforms

#### Netlify

1. Set build command: `cd apps/dashboard && npm run build`
2. Set publish directory: `apps/dashboard/.next`
3. Add environment variables in Netlify dashboard

#### Railway

1. Connect your repository
2. Set root directory to `apps/dashboard`
3. Add environment variables
4. Deploy

## Network-Specific Configuration

### Local Development (Foundry)
```env
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
```

### Mantle Sepolia Testnet
```env
NEXT_PUBLIC_CHAIN_ID=5003
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.mantle.xyz
```

### Mantle Mainnet
```env
NEXT_PUBLIC_CHAIN_ID=5000
NEXT_PUBLIC_RPC_URL=https://rpc.mantle.xyz
```

## Post-Deployment Checklist

- [ ] Verify environment variables are set correctly
- [ ] Test wallet connection
- [ ] Verify contract addresses are correct for the network
- [ ] Test identity registration (if registrar)
- [ ] Test asset deployment
- [ ] Test compliance rule creation
- [ ] Verify RPC endpoint is accessible
- [ ] Check console for any errors
- [ ] Test on mobile devices (WalletConnect)

## Troubleshooting

### WalletConnect Not Working
- Ensure `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set correctly
- Check that the project ID is valid at https://cloud.walletconnect.com
- Verify the domain is added to your WalletConnect project settings

### Contract Calls Failing
- Verify contract addresses match the deployed network
- Check that `NEXT_PUBLIC_CHAIN_ID` matches the network
- Ensure RPC endpoint is accessible and correct

### Build Errors
- Ensure SDK is built before building dashboard: `cd packages/sdk && npm run build`
- Clear `.next` directory and rebuild
- Check Node.js version (18+ required)

### Runtime Errors
- Check browser console for detailed error messages
- Verify all environment variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Ensure contract ABIs are up to date

## Security Notes

- Never commit `.env.local` or `.env` files
- Use environment variables for all sensitive configuration
- Verify contract addresses before deploying
- Use HTTPS in production
- Consider adding rate limiting for production deployments
