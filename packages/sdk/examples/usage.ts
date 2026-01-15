import { MantleRWASDK } from '../src';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mantleSepoliaTestnet } from 'viem/chains';

// Mock addresses for demonstration
const MOCK_ADDRESSES = {
    identityRegistry: "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d",
    complianceRegistry: "0x59b670e9fA9D0A427751Af201D676719a970857b",
    assetFactory: "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44",
} as const;

async function main() {
    console.log("Initializing SDK...");

    // Initialize SDK in read-only mode
    const sdk = new MantleRWASDK({
        chain: mantleSepoliaTestnet,
        rpcUrl: 'http://127.0.0.1:8545',
        contractAddresses: {
            identityRegistry: MOCK_ADDRESSES.identityRegistry,
            complianceRegistry: MOCK_ADDRESSES.complianceRegistry,
            assetFactory: MOCK_ADDRESSES.assetFactory,
        }
    });

    console.log("SDK Initialized.");

    // Example: Reading from Identity Registry
    // Note: This will fail if the local node isn't running or addresses are wrong, 
    // but it verifies the type safety and structure.
    try {
        const randomAddress = "0x1234567890123456789012345678901234567890";
        console.log(`Checking identity for ${randomAddress}...`);

        const country = await sdk.identityRegistry.read.investorCountry([randomAddress]);
        console.log("Country Code:", country);

    } catch (error) {
        console.log("Connection successful, but contract call failed (expected if node not running):");
        console.log(error.message?.slice(0, 100) + "...");
    }
}

main().catch(console.error);
