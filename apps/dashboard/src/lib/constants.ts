// Contract addresses from environment variables with fallbacks for local development
export const CONTRACT_ADDRESSES = {
    IdentityRegistry: (process.env.NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS || "0x4826533B4897376654Bb4d4AD88B7faFD0C98528") as `0x${string}`,
    ComplianceRegistry: (process.env.NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS || "0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf") as `0x${string}`,
    AssetFactory: (process.env.NEXT_PUBLIC_ASSET_FACTORY_ADDRESS || "0x8f86403A4DE0BB5791fa46B8e795C547942fE4Cf") as `0x${string}`,
    RWATokenImplementation: (process.env.NEXT_PUBLIC_RWA_TOKEN_IMPLEMENTATION_ADDRESS || "0x0E801D84Fa97b50751Dbf25036d067dCf18858bF") as `0x${string}`,
    MantleGold: (process.env.NEXT_PUBLIC_MANTLE_GOLD_ADDRESS || "0xf7b407BD806B9943C1b2281271B27DC3F3baE694") as `0x${string}`
} as const;

export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "31337", 10);
