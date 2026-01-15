# Mantle RWA SDK

<div align="center">

![Mantle RWA SDK](https://img.shields.io/badge/Mantle-RWA%20SDK-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-orange)

**Enterprise-grade infrastructure for tokenizing real-world assets on Mantle**

[Documentation](#documentation) • [Quick Start](#quick-start) • [Examples](#examples) • [Deployment](#deployment)

</div>

---

## Overview

The Mantle RWA SDK is a comprehensive toolkit for building compliant, tokenized real-world asset (RWA) applications on the Mantle blockchain. It provides smart contracts, a TypeScript SDK, and a production-ready dashboard for managing identity, compliance, and asset deployment.

### Key Features

- **Identity Management**: Built-in KYC/AML verification system with country-based restrictions
- **Compliance Engine**: Flexible compliance rules for accredited investors, KYC requirements, and geographic restrictions
- **Asset Factory**: Gas-efficient deployment of RWA tokens using minimal proxy pattern
- **Security First**: Built on OpenZeppelin contracts with role-based access control
- **Dashboard UI**: Production-ready Next.js dashboard for managing assets and identities
- **TypeScript SDK**: Fully typed SDK for seamless integration
- **Multi-Chain Ready**: Deploy on Mantle Sepolia, Mantle Mainnet, or any EVM chain

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Mantle RWA SDK                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Identity   │  │  Compliance  │  │    Asset    │     │
│  │  Registry    │  │   Registry   │  │   Factory   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘             │
│                            │                                 │
│                   ┌─────────▼─────────┐                      │
│                   │    RWA Token      │                      │
│                   │  (ERC-20 +       │                      │
│                   │   Compliance)    │                      │
│                   └──────────────────┘                      │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           TypeScript SDK (@mantle-rwa/sdk)        │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Next.js Dashboard (apps/dashboard)         │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Foundry (for contract development)
- A wallet with testnet ETH (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/mantle-rwa-sdk.git
cd mantle-rwa-sdk

# Install dependencies
npm install

# Build the SDK
npm run build:sdk
```

### Deploy Contracts

```bash
cd packages/contracts

# Set up environment
cp .env.example .env
# Edit .env with your PRIVATE_KEY and RPC_URL

# Deploy to Mantle Sepolia
forge script script/DeployMantleSepolia.s.sol:DeployMantleSepolia \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  -vvvv
```

### Configure Dashboard

```bash
cd apps/dashboard

# Copy environment template
cp .env.example .env.local

# Update with your deployed contract addresses
# See DEPLOYMENT.md for details
```

### Run Dashboard

```bash
cd apps/dashboard
npm install
npm run dev
```

Visit `http://localhost:3000` to access the dashboard.

## Project Structure

```
mantle-rwa-sdk/
├── apps/
│   ├── dashboard/          # Next.js dashboard application
│   │   ├── src/
│   │   │   ├── app/         # Next.js app router pages
│   │   │   ├── components/  # React components
│   │   │   └── lib/         # Utilities and config
│   │   └── package.json
│   └── mcp-server/          # MCP server (future)
│
├── packages/
│   ├── contracts/           # Solidity smart contracts
│   │   ├── src/
│   │   │   ├── IdentityRegistry.sol
│   │   │   ├── ComplianceRegistry.sol
│   │   │   ├── AssetFactory.sol
│   │   │   └── RWAToken.sol
│   │   ├── script/          # Deployment scripts
│   │   └── test/            # Foundry tests
│   │
│   └── sdk/                  # TypeScript SDK
│       ├── src/
│       │   ├── core/         # SDK core logic
│       │   ├── abis/         # Contract ABIs
│       │   └── types/        # TypeScript types
│       └── package.json
│
├── scripts/                  # Utility scripts
├── README.md                 # This file
├── DEPLOYMENT.md             # Deployment guide
└── package.json              # Root workspace config
```

## Core Components

### 1. Identity Registry

Manages KYC/AML status and country codes for addresses.

**Key Features:**
- Country code mapping (ISO 3166-1 numeric)
- Claims bitmap for verification levels (KYC, Accredited, etc.)
- Role-based access control (REGISTRAR_ROLE)

**Usage:**
```typescript
// Register an identity
await sdk.registerIdentity(
  '0xUserAddress',
  840,  // Country code (US)
  5n    // Claims: KYC (1) + Accredited (4)
);
```

### 2. Compliance Registry

Defines and enforces compliance rules for asset transfers.

**Key Features:**
- Rule-based compliance checking
- Accredited investor requirements
- KYC level requirements
- Country-based restrictions

**Usage:**
```typescript
// Check compliance
const isCompliant = await sdk.complianceRegistry.read.checkCompliance([
  '0xUserAddress',
  '0xRuleId'
]);
```

### 3. Asset Factory

Gas-efficient factory for deploying new RWA tokens.

**Key Features:**
- Minimal proxy pattern (Clones)
- Automatic role assignment
- Compliance rule binding

**Usage:**
```typescript
// Deploy a new asset
const txHash = await sdk.deployAsset(
  "Real Estate Fund 1",
  "REF1",
  "0xRuleId",
  1000000n
);
```

### 4. RWA Token

ERC-20 compatible token with built-in compliance checks.

**Key Features:**
- ERC-20 standard compliance
- Transfer restrictions based on compliance rules
- Pausable functionality
- Document management (ERC-1643 style)
- Legal recovery (force transfer)

## SDK Usage

### Installation

```bash
npm install @mantle-rwa/sdk viem
```

### Basic Example

```typescript
import { MantleRWASDK } from '@mantle-rwa/sdk';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mantleSepoliaTestnet } from 'viem/chains';

// Initialize SDK
const account = privateKeyToAccount('0x...');
const walletClient = createWalletClient({
  account,
  chain: mantleSepoliaTestnet,
  transport: http()
});

const sdk = new MantleRWASDK({
  chain: mantleSepoliaTestnet,
  rpcUrl: 'https://rpc.sepolia.mantle.xyz',
  walletClient,
  contractAddresses: {
    identityRegistry: '0x...',
    complianceRegistry: '0x...',
    assetFactory: '0x...'
  }
});

// Deploy an asset
const txHash = await sdk.deployAsset(
  "Mantle Gold",
  "mGLD",
  keccak256(toBytes("US_ACCREDITED")),
  0n
);

// Interact with deployed token
const token = sdk.getRWAToken('0xTokenAddress');
const balance = await token.read.balanceOf(['0xUserAddress']);
```

See [packages/sdk/README.md](./packages/sdk/README.md) for complete SDK documentation.

## Smart Contracts

### Contract Addresses (Mantle Sepolia)

After deployment, update your `.env.local` with:

```env
NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_ASSET_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS=0x...
```

### Security

- **Audited Libraries**: Built on OpenZeppelin contracts
- **Access Control**: Role-based permissions throughout
- **Upgradeable**: RWAToken uses upgradeable pattern
- **Gas Optimized**: Minimal proxy pattern for asset deployment

See [packages/contracts/README.md](./packages/contracts/README.md) for contract documentation.

## Dashboard

The dashboard provides a complete UI for:

- **Identity Management**: View and update KYC/AML status
- **Asset Deployment**: Deploy new RWA tokens
- **Compliance Rules**: Create and manage compliance policies
- **Asset Management**: Mint, pause, and manage tokens
- **Portfolio View**: Track your RWA holdings

### Features

- Modern, responsive UI with 3D animations
- WalletConnect integration
- Real-time contract data
- Role-based access control
- Mobile-friendly design

## Development

### Setup

```bash
# Install dependencies
npm install

# Build all packages
npm run build:sdk
npm run build:dashboard

# Run tests
npm run test:contracts
```

### Scripts

```bash
# SDK
npm run build:sdk          # Build SDK package
npm run dev:sdk            # Watch mode for SDK

# Dashboard
npm run dev:dashboard      # Start dashboard dev server
npm run build:dashboard    # Build dashboard for production

# Contracts
npm run test:contracts     # Run Foundry tests
npm run build:contracts    # Compile contracts
```

## Testing

### Contract Tests

```bash
cd packages/contracts
forge test
```

### Integration Tests

```bash
cd packages/contracts
forge test --match-path test/integration/*
```

## Deployment

### Deploy to Mantle Sepolia

See [DEPLOY_TO_MANTLE_SEPOLIA.md](./DEPLOY_TO_MANTLE_SEPOLIA.md) for step-by-step instructions.

### Deploy Dashboard

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment options (Vercel, Docker, etc.).

## Documentation

- **[SDK Documentation](./packages/sdk/README.md)**: Complete SDK API reference
- **[Contract Documentation](./packages/contracts/README.md)**: Smart contract details
- **[Deployment Guide](./DEPLOYMENT.md)**: Production deployment instructions
- **[Mantle Sepolia Deployment](./DEPLOY_TO_MANTLE_SEPOLIA.md)**: Testnet deployment guide

## Contributing

Contributions are welcome! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow Solidity style guide
- Ensure all tests pass

## Security

If you discover a security vulnerability, please email security@example.com. Do not open a public issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- [Documentation](./packages/sdk/README.md)
- [Discord](https://discord.gg/mantle)
- [Issue Tracker](https://github.com/your-org/mantle-rwa-sdk/issues)
- Email: support@example.com

## Roadmap

- [ ] Mainnet deployment
- [ ] Additional compliance rule types
- [ ] Multi-signature support
- [ ] Gas optimization improvements
- [ ] Enhanced dashboard features
- [ ] Mobile SDK
- [ ] MCP server implementation

## Acknowledgments

- Built on [Mantle Network](https://www.mantle.xyz/)
- Uses [OpenZeppelin Contracts](https://www.openzeppelin.com/contracts)
- Powered by [Viem](https://viem.sh/) and [Wagmi](https://wagmi.sh/)

---

<div align="center">

**Built for the decentralized future**

[Website](https://example.com) • [Documentation](./packages/sdk/README.md) • [GitHub](https://github.com/your-org/mantle-rwa-sdk)

</div>
