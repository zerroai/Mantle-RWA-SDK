# @mantle-rwa/sdk

The official TypeScript SDK for interacting with the Mantle RWA (Real World Assets) Protocol.

## Installation

```bash
npm install @mantle-rwa/sdk viem
# or
yarn add @mantle-rwa/sdk viem
# or
pnpm add @mantle-rwa/sdk viem
```

## Usage

### Initialization

Initialize the SDK with your RPC URL and contract addresses.

```typescript
import { MantleRWASDK } from '@mantle-rwa/sdk';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mantleSepoliaTestnet } from 'viem/chains';

// Optional: Setup wallet for write operations
const account = privateKeyToAccount('0x...'); 
const walletClient = createWalletClient({
  account,
  chain: mantleSepoliaTestnet,
  transport: http()
});

const sdk = new MantleRWASDK({
  chain: mantleSepoliaTestnet,
  rpcUrl: 'https://rpc.sepolia.mantle.xyz',
  walletClient, // Optional, required for transactions
  contractAddresses: {
    identityRegistry: '0x...',
    complianceRegistry: '0x...',
    assetFactory: '0x...'
  }
});
```

### Identity Management

Check user status or register new identities.

```typescript
// Read identity status
const country = await sdk.identityRegistry.read.investorCountry(['0xUserAddress']);
const claims = await sdk.identityRegistry.read.identityClaims(['0xUserAddress']);

// Register a new identity (requires REGISTRAR_ROLE)
const txHash = await sdk.registerIdentity(
  '0xUserAddress',
  840, // Country code (e.g., US)
  1n   // Claims bitmap (e.g., KYC verified)
);
```

### Asset Management

Deploy and interact with RWA Tokens.

```typescript
// Deploy a new RWA Token
const txHash = await sdk.deployAsset(
  "Real Estate Fund 1",
  "REF1",
  "0x...", // Compliance Rule ID
  1000000n // Initial Supply
);

// Interact with an existing token
const token = sdk.getRWAToken('0xTokenAddress');

// Read balance
const balance = await token.read.balanceOf(['0xUserAddress']);

// Transfer (if compliant)
await token.write.transfer(['0xRecipient', 100n]);
```

## Architecture

The SDK is built on top of [viem](https://viem.sh/), providing typed contract interfaces for:

- **IdentityRegistry**: Manages KYC/AML status of investors.
- **ComplianceRegistry**: Manages compliance rules for asset transfers.
- **AssetFactory**: Factory for deploying new RWA tokens.
- **RWAToken**: The ERC-20 compatible token standard for RWAs.

## License

MIT
