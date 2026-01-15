import {
    createPublicClient,
    http,
    getContract,
    type PublicClient,
    type WalletClient,
    type Address,
    type Chain
} from 'viem';
import { mantleSepoliaTestnet } from 'viem/chains';

import IdentityRegistryABI from '../abis/IdentityRegistry.json';
import ComplianceRegistryABI from '../abis/ComplianceRegistry.json';
import AssetFactoryABI from '../abis/AssetFactory.json';
import RWATokenABI from '../abis/RWAToken.json';

export interface MantleRWASDKConfig {
    chain?: Chain;
    rpcUrl?: string;
    walletClient?: WalletClient;
    contractAddresses: {
        identityRegistry: Address;
        complianceRegistry: Address;
        assetFactory: Address;
    };
}

export class MantleRWASDK {
    public publicClient: PublicClient;
    public walletClient?: WalletClient;
    public config: MantleRWASDKConfig;

    constructor(config: MantleRWASDKConfig) {
        this.config = config;
        const chain = config.chain || mantleSepoliaTestnet;

        this.publicClient = createPublicClient({
            chain,
            transport: http(config.rpcUrl)
        });

        if (config.walletClient) {
            this.walletClient = config.walletClient;
        }
    }

    // Helper to get contract instances
    private getContract<TAbi extends readonly unknown[]>(address: Address, abi: TAbi) {
        return getContract({
            address,
            abi,
            client: {
                public: this.publicClient,
                wallet: this.walletClient
            }
        });
    }

    public get identityRegistry() {
        return this.getContract(this.config.contractAddresses.identityRegistry, IdentityRegistryABI);
    }

    public get complianceRegistry() {
        return this.getContract(this.config.contractAddresses.complianceRegistry, ComplianceRegistryABI);
    }

    public get assetFactory() {
        return this.getContract(this.config.contractAddresses.assetFactory, AssetFactoryABI);
    }

    public getRWAToken(address: Address) {
        return this.getContract(address, RWATokenABI);
    }

    // High-level actions

    /**
     * Deploys a new RWA Asset
     * @param name Asset name
     * @param symbol Asset symbol
     * @param complianceRuleId Compliance rule ID
     * @param initialSupply Initial supply
     * @returns Transaction hash
     */
    public async deployAsset(
        name: string,
        symbol: string,
        complianceRuleId: `0x${string}`,
        initialSupply: bigint
    ) {
        if (!this.walletClient) throw new Error("Wallet client required for write operations");
        const [account] = await this.walletClient.getAddresses();

        const { request } = await this.publicClient.simulateContract({
            address: this.config.contractAddresses.assetFactory,
            abi: AssetFactoryABI,
            functionName: 'deployAsset',
            args: [name, symbol, complianceRuleId, initialSupply],
            account
        });

        return this.walletClient.writeContract(request);
    }

    /**
     * Registers or updates an identity
     * @param user User address
     * @param country Country code (ISO 3166-1 numeric)
     * @param claims Claims bitmap
     * @returns Transaction hash
     */
    public async registerIdentity(
        user: Address,
        country: number,
        claims: bigint
    ) {
        if (!this.walletClient) throw new Error("Wallet client required for write operations");
        const [account] = await this.walletClient.getAddresses();

        const { request } = await this.publicClient.simulateContract({
            address: this.config.contractAddresses.identityRegistry,
            abi: IdentityRegistryABI,
            functionName: 'setIdentity',
            args: [user, country, claims],
            account
        });

        return this.walletClient.writeContract(request);
    }
}
